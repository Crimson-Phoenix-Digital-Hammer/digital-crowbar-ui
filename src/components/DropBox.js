import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import '../components/DroppBox.css' 
import { Button } from '@mui/material'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import Search from './Search'
//import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'

const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676'
    }
    if (props.isDragReject) {
        return '#ff1744'
    }
    if (props.isDragActive) {
        return '#2196f3'
    }
    return '#eeeeee'
}

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${(props) => getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border .24s ease-in-out;
    margin-bottom:40px;
    min-height:362px
`


function DropBox({ onDrop }) {
    const [selectedFiles, setSelectedFiles] = useState(undefined)
    const {
        getRootProps,
        getInputProps,
        acceptedFiles,
        open,
        isDragAccept,
        isFocused,
        isDragReject,
      } = useDropzone({
        accept: {'image/*': []},
        onDrop,
        noClick: true,
        noKeyboard: true,
      })

    const lists = acceptedFiles.map((list) => (
        <li key={list.path}>
            {list.path} - {list.size} bytes
        </li>
    ))

    const [imageSent, setImageSent] = useState([])

    const handleFile = (e) => {
        setImageSent(e.target.files[0])
        console.log(e.target.files[0])
    }

    const uploadFiles = (e) => {
        const formData = new FormData()
        console.log(imageSent)
        formData.append('file', imageSent)
        //formData.append('key','')
        fetch('http://digital-crowbar-dev.eba-7szv7fvp.us-east-1.elasticbeanstalk.com/obfuscate_image_query/clip_interrogation', {
            method: 'POST',
            body: formData
        })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        })


        //console.log(e.target.files)
    }

    const [showImageSearch, setShowImageSearch] = useState(false)
    const onClick = () => setShowImageSearch(true)
   

    return (
        <div>
            {showImageSearch ? <Search />
            : <section className='dropbox'>
                <div className='dropbox__header'><button className='action' onClick={onClick}><ClearOutlinedIcon /></button></div>
                <Container 
                    className='dropbox'
                    {...getRootProps({ isDragAccept, isFocused, isDragReject })}>
                <PhotoLibraryOutlinedIcon fontSize='large'/>
                    <input {...getInputProps({onChange: handleFile})} type='file' formEncType='multipart/form-data'/>
                    <p>Drag an image here or <a href='#' name='open-files' onClick={open}>upload a file</a></p>
                    {/* <button type="button" className='btn' onClick={open}>
                        Select File
                    </button> */}
                </Container>
                <aside>
                    <h4>Files</h4>
                    <ul>{lists}</ul>
                </aside>
                <Button className='search' onClick={() => uploadFiles()} type="submit" variant="outlined">Upload Images</Button>
                {/* <button className='btn' onClick={uploadFiles}>Upload Images</button> */}
            </section>}
        </div>
    )
}

export default DropBox