import React, { useState, useRef} from 'react'
import { useStateValue } from './StateProvider'
import { Button } from '@mui/material'
import Dropzone, { useDropzone } from 'react-dropzone'
import { obfuscateImg } from './services/useUploadService'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import Header from './Header'

function GenerateImg() {
    const [{term}, dispatch] = useStateValue()
    // const [fileInfo, setFileInfo] = useState([
    //     {id: new Date().getTime(), prompts: term.fileInfo, src: term.src }
    // ])
    const [selectedFiles, setSelectedFiles] = useState(undefined)
    const [prompts, setPrompts] = useState(undefined)
    const [negative, setNegative] = useState(undefined)
    const [strength, setStrength] = useState(undefined)
    const [file, setFile] = useState(undefined)
    const [altImg, setAltImg] = useState(undefined)
    const [image, setImage] = useState()
    // const fileInputRef = useRef(null)

    // console.log(fileInfo)
    // let includedItems = term.fileInfo
    // let src = term.src
    // const reader = new FileReader()
    // reader.readAsDataURL(src)
    // let fileName = 'image.png'
    // let file = new File([image], 'image.png', {type: 'image/png'})
    
    
    // const handleChange = (files) => {
        // const fileInput = document.querySelector('input[type="file"]');

        // // Create a new File object
        // const myFile = new File([src], 'image.png', {
        //     type: 'image/png',
        //     lastModified: new Date(),
        // });
        // // console.log(myFile);
        // // Now let's create a DataTransfer to get a FileList
        // const dataTransfer = new DataTransfer();
        // dataTransfer.items.add(myFile);
        // fileInput.files = dataTransfer.files;
        // setFile(dataTransfer.files)
    // }
    
    

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
        let tags = prompts,
            excluded = negative,
            obfuscated = strength
        
        setImage(URL.createObjectURL(currentFile))
        
        obfuscateImg(tags, excluded, obfuscated, currentFile, (event) => {
            
            console.log(Math.round((100 * event.loaded) / event.total));
        })
        .then((response) => response.blob())
        .then((files) => {
            if(files.size > 0) {
                setAltImg(URL.createObjectURL(files))
            }
            console.log(files)
            // let blob = files[0]

            // // Create a new File object from the blob
            // const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

            // // Create a new input event
            // const event = new InputEvent('input', {
            //     bubbles: true,
            //     cancelable: true,
            // });

            // // Set the 'files' property of the input element
            // Object.defineProperty(event, 'target', { value: fileInputRef.current });
            // fileInputRef.current.files = [file];

            // // Dispatch the event
            // fileInputRef.current.dispatchEvent(event);
            // //console.log(files.prompts)
        })
        .catch(() => {
            //setProgress(0)
            //setMessage("Could not upload the file!")
            //setCurrentFile(undefined)
        })


        console.log(currentFile)
        
        // let tags = prompts,
        //     excluded = negative,
        //     obfuscated = strength,
        //     currentFile = file
        // obfuscateImg(tags, excluded, obfuscated, currentFile)

        setSelectedFiles(undefined)
    }
    
  return (
    <div className='searchPage'>
        <Header />
        <div className='generate-img'>
        <Dropzone onDrop={onDrop} multiple={false} >
            {({getRootProps, getInputProps}) => (
            <section className='container'>
                <div className='src-img'>
                    <h1>Source Image</h1>
                    {/* <img src={term.src} alt="image" /> */}
                    <div {...getRootProps({className: "dropzone"})}>
                    <input type='file' {...getInputProps()} />
                    {selectedFiles && selectedFiles[0].name ? (
                                <div className='selected-file'>
                                    <div className='img-container'>
                                        <div className='selected-file__remove' onClick={() => setSelectedFiles(undefined)}>
                                            <ClearOutlinedIcon fontSize='large'/>
                                        </div>
                                        <img src={image} />
                                    </div>
                                    {/* { selectedFiles && selectedFiles[0].name} */}
                                </div>): (
                                    <div className='img-upload'>
                                        <PhotoLibraryOutlinedIcon fontSize='large'/>
                                        <p>Drag an image here or <a href='#' name='open-files'>upload a file</a></p>
                                    </div>
                                )}
                    </div>
                        <label htmlFor='prompt'>Prompt</label>
                        <input name='prompt' type='text' onChange={(e) => setPrompts(e.target.value)} />
                        
                        <label htmlFor='negative'>Negative</label>
                        <input name='negative' type='text' onChange={(e) => setNegative(e.target.value)} />
                        
                        <label htmlFor='strength'>Strength</label>
                        <input name='strength' type='text' onChange={(e) => setStrength(e.target.value)} />
                        <Button className='search'  onClick={upload}>Generate Image</Button>
                    </div>
                    {/* <div className='prompts'>{term.fileInfo}</div> */}
                
                <div className='v-rule'></div>
                <div className='gen-img'>
                    <img src={altImg} alt="image" />
                </div>
            </section>
            )}
        </Dropzone>
        </div>
    </div>
  )
}

export default GenerateImg