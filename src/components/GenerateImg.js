import React, { useState} from 'react'
import { useStateValue } from './StateProvider'
import { Button } from '@mui/material'
import Dropzone, { useDropzone } from 'react-dropzone'
import { obfuscateImg } from './useUploadService'

function GenerateImg({ image, data}) {
    const [{term}, dispatch] = useStateValue()
    // const [fileInfo, setFileInfo] = useState([
    //     {id: new Date().getTime(), prompts: term.fileInfo, src: term.src }
    // ])
    const [selectedFiles, setSelectedFiles] = useState(undefined)
    const [prompts, setPrompts] = useState(undefined)
    const [negative, setNegative] = useState(undefined)
    const [strength, setStrength] = useState(undefined)
    const [file, setFile] = useState(undefined)

    // console.log(fileInfo)
    // let prompt = term.fileInfo.split(',')
    // let src = term.src
    // const reader = new FileReader()
    // reader.readAsDataURL(src)
    // let fileName = 'image.png'
    // let file = new File([image], 'image.png', {type: 'image/png'})
    // const addPrompt = (e) => {
    //     e.preventDefault()
    //     setPrompts(e.target.value);
    //     // console.log(e.target.value)
    //     // console.log(fileInfo)
    //     // setFileInfo([...fileInfo, {id: new Date().getTime(), prompts: e.target.value, src: image}])
    //     // console.log(fileInfo)
    // }
    // const addNegative = (e) => {
    //     e.preventDefault()
    //     setNegative(e.target.value);
    // }
    // const addStrength = (e) => {
    //     e.preventDefault()
    //     setStrength(e.target.value);
    // }
    // const addFile = (e) => {
    //     e.preventDefault()
    //     setFile(e.target.value);
    // }
    const onDrop = (files) => {
        let currentFile = files[0]
        console.log(currentFile)
        // setImage(URL.createObjectURL(currentFile))
        
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
            
            obfuscateImg(tags, excluded, obfuscated, currentFile, (event) => {
                
                console.log(Math.round((100 * event.loaded) / event.total));
            })
            .then((response) => response.json())
            .then((files) => {
                console.log(files)
                //console.log(files.prompts)
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
    <div className='generate-img'>
    <Dropzone onDrop={onDrop} multiple={false} >
        {({getRootProps, getInputProps}) => (
        <section className='container'>
            <div className='src-img'>
                <h1>Generate Image</h1>
                {/* <img src={term.src} alt="image" /> */}
                <div {...getRootProps()}></div>
                    <input name='prompt' type='text' onChange={(e) => setPrompts(e.target.value)} />
                    <input name='negative' type='text' onChange={(e) => setNegative(e.target.value)} />
                    <input name='strength' type='text' onChange={(e) => setStrength(e.target.value)} />
                    <input {...getInputProps()} />
                </div>
                {/* <div className='prompts'>{term.fileInfo}</div> */}
            
            <div className='v-rule'></div>
            <div className='gen-img'>
                <div className='prompts'></div>
                <div className='prompts'></div>
                <Button className='search' disabled={!selectedFiles} onClick={upload}>Generate Image</Button>
            </div>
            {/* <h3>File Info</h3> */}
            {/* {fileInfo.prompts.split(',').map((prompt, i) => (
                <ul key={i}>
                    <li>{prompt}</li>
                </ul>
            ))} */}
            {/* {choices.map(({id, choice, done}, i) */}
            {/* {fileInfo.map(({id, prompts},i) => {
                return (
                    <div>
                        <h3>File Info</h3>
                        <ul key={id}>
                            <li>{prompts[i]}</li>
                        </ul>
                    </div>
                )
            })} */}
        </section>
        )}
    </Dropzone>
    </div>
  )
}

export default GenerateImg