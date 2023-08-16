import React, {useState, useEffect} from 'react'
import Dropzone, { useDropzone } from 'react-dropzone'
import Search from './Search'
import { Button } from '@mui/material'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import { uploadFile } from './useUploadService'
import './FileUpload.css'
import { useNavigate } from 'react-router-dom'
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'
// import 'bootstrap/dist/css/bootstrap.min.css'

const UploadFiles = () => {
    const [selectedFiles, setSelectedFiles] = useState(undefined)
    const [currentFile, setCurrentFile] = useState(undefined)
    const [progress, setProgress] = useState(0)
    const [message, setMessage] = useState("")
    const [fileInfos, setFileInfos] = useState([])
    const [data, setData] = useState([])
    const [image, setImage] = useState()
    const [{}, dispatch] = useStateValue()
    const navigate = useNavigate()
    
    // useEffect(() => {
    //     getFiles().then((response) => {
    //         setFileInfos(response.data)
    //     })
    // }, [])

    const onDrop = (files) => {
        let currentFile = files[0]
        console.log(currentFile)
        setImage(URL.createObjectURL(currentFile))
        
        if(files.length > 0) {
            setSelectedFiles(files)
        }
        //console.log(files)
    }

    const upload = () => {
        let currentFile = selectedFiles[0]
        //console.log(currentFile)

        setProgress(0)
        setCurrentFile(currentFile)

        setImage(URL.createObjectURL(currentFile))

        uploadFile(currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total))
        })
        .then((response) => response.json())
            // console.log(response.json())
            // setMessage(response.json())
            //return getFiles()
        // })
        .then((files) => {
            console.log(files.filename)
            console.log(files.prompts)
            //setData(files)
            setMessage(files.prompts)
            setTimeout(() => {
                navigate('/image-search/generate-image')
                dispatch({
                    type: actionTypes.SET_SEARCH_TERM,
                    term: {fileInfo: files.prompts, src: image}
                })
            }, 2000)
        })
        .catch(() => {
            //setProgress(0)
            //setMessage("Could not upload the file!")
            //setCurrentFile(undefined)
        })

        setSelectedFiles(undefined)
    }

    const [showImageSearch, setShowImageSearch] = useState(false)
    const onClick = () => setShowImageSearch(true)


  return (
    <div>
        {/* {currentFile && (
            <div className="progress">
                <div
                    className="progress-bar progress-bar-info progress-bar-striped"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: progress + "%" }}
                >
                    {progress}%
                </div>
            </div>
        )} */}
        {showImageSearch ? <Search />
            :
        <Dropzone onDrop={onDrop} multiple={false}>
            {({getRootProps, getInputProps}) => (
                             
                <section className='dropbox'>
                    <div className='dropbox__header'><button className='action' onClick={onClick}><ClearOutlinedIcon /></button></div>
                    <div {...getRootProps({className: "dropzone"})}>
                        <input {...getInputProps()} />
                        {selectedFiles && selectedFiles[0].name ? (
                            <div className='selected-file'>
                                <div className='img-container'>
                                    <div className='selected-file__remove' onClick={() => setSelectedFiles(undefined)}>
                                        <ClearOutlinedIcon fontSize='large'/>
                                    </div>
                                    <img src={image} />
                                </div>
                                { selectedFiles && selectedFiles[0].name}
                            </div>): (
                                <div className='img-upload'>
                                    <PhotoLibraryOutlinedIcon fontSize='large'/>
                                    <p>Drag an image here or <a href='#' name='open-files'>upload a file</a></p>
                                </div>
                            )}
                    </div>
                    <aside className='selected-file-wrapper'>
                        <Button className='search' disabled={!selectedFiles} onClick={upload}>Upload Images</Button>
                    </aside>
                    
                </section>
                
            )}
        </Dropzone>
        
        // {/* <div className='alert alert-light' role='alert'>
        //     <img src={data.filename} />
        // </div> */}
    }

        {/* {fileInfos.length > 0 && (
            <div className='card'>
                <div className='card-header'>List of Files</div>
                <ul className='list-group list-group-flush'>
                    {fileInfos.map((file, index) => (
                        <li className='list-group-item' key={index}>
                            {file.prompts}
                        </li>
                    ))}
                </ul>
            </div>
        )} */}
        {message.length > 0 && (
            <div className='prompt'>
                <h2>Prompt</h2>
                <p>{message}</p>
            </div>
        )}
        
    </div>
  )
}

export default UploadFiles