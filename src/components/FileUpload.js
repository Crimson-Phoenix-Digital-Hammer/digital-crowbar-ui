import React, {useState, useEffect, useRef} from 'react'
import Dropzone, { useDropzone } from 'react-dropzone'
import Search from './Search'
import { Button,  CircularProgress  } from '@mui/material'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import { uploadFile } from './useUploadService'
import './FileUpload.css'
import { useNavigate } from 'react-router-dom'
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'
import { obfuscateImg } from './useUploadService'
// import 'bootstrap/dist/css/bootstrap.min.css'

const UploadFiles = () => {
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state
    const [data, setData] = useState([]);
    const [image, setImage] = useState();
    const [{}, dispatch] = useStateValue();
    const [view, setView] = useState('initialView')
    const [altImg, setAltImg] = useState(undefined)
    const [prompts, setPrompts] = useState(undefined)
    const [negative, setNegative] = useState(undefined)
    const [strength, setStrength] = useState(undefined)
    const ref = useRef(null)
//   const navigate = useNavigate();
    
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

    const upload = async () => {
        let currentFile = selectedFiles[0];
        setProgress(0);
        setCurrentFile(currentFile);
        setImage(URL.createObjectURL(currentFile));
    
        setLoading(true); // Set loading to true before starting upload
    
        try {
          const response = await uploadFile(currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
          });
    
          const files = await response.json();
          setMessage(files.prompts);
        //   let compliments = files.prompts.split(',')
        //   console.log(compliments);
        //   setTimeout(() => {
        //     navigate('/image-search/generate-image');
        //     dispatch({
        //       type: actionTypes.SET_SEARCH_TERM,
        //       term: { fileInfo: files.prompts, src: image },
        //     });
        //   }, 2000);
        } catch (error) {
          // Handle upload error here
        }
    
        setLoading(false); // Set loading to false after upload completes
        // setSelectedFiles(undefined);
        setView('generateView');
      };

    const [showImageSearch, setShowImageSearch] = useState(false)
    const onClick = () => setShowImageSearch(true)
    // const handleChangePrompts = event => {
    //     setPrompts(event.target.value)
    // }
    // const handleChangeNegative = event => {
    //     setNegative(event.target.value)
    // }
    // const handleChangeStrength = event => {
    //     setStrength(event.target.value)  
    // }

    const [hidden, setHidden] = useState({display: 'none'})
    const generateImg = async () => {
        try {
            // console.log(ref.current.value);
          setLoading(true)
          const currentFile = selectedFiles[0];
          const tags = prompts;
          const excluded = negative;
          const obfuscated = strength;
      
          console.log(currentFile);
          setImage(URL.createObjectURL(currentFile));
      
          const response = await obfuscateImg(tags, excluded, obfuscated, currentFile, (event) => {
            console.log(Math.round((100 * event.loaded) / event.total));
          });
      
          const blob = await response.blob();
          if (blob.size > 0) {
            setAltImg(URL.createObjectURL(blob));
            setHidden({display: 'block'})
          }
      
          setLoading(false);
          console.log(currentFile);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
    }


  return (
    <div>
        {view === 'initialView' ?  
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
                                        <div className='img-upload'>
                                            {loading ? (
                                                <div className='loading-spinner'>
                                                    <CircularProgress size={50} />
                                                    <p>Uploading...</p>
                                                </div>
                                            ) : (
                                                <>
                                                    <PhotoLibraryOutlinedIcon fontSize='large'/>
                                                    <p>Drag an image here or <a href='#opening-file' name='open-files'>upload a file</a></p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                        </div>
                        <aside className='selected-file-wrapper'>
                            <Button className='search' disabled={!selectedFiles || loading} onClick={upload} variant='outlined'>
                                {loading ? <CircularProgress size={24} /> : 'Upload Images'}
                            </Button>
                        </aside>
                        
                    </section>
                    
                )}
            </Dropzone>
        : 
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
                            <input name='prompt' type='text' onChange={(e) => setPrompts(e.target.value)} defaultValue={message} />
                            
                            <label htmlFor='negative'>Negative</label>
                            <input name='negative' type='text' onChange={(e) => setNegative(e.target.value)} />
                            
                            <label htmlFor='strength'>Strength</label>
                            <input name='strength' type='text' onChange={(e) => setStrength(e.target.value)} defaultValue={'0.8'} />
                        
                        <Button className='search' disabled={!selectedFiles || loading} type='submit' onClick={generateImg}>
                            {loading ? 'Generate Image' : 'Generate Image'}
                        </Button>
                    </div>
                        {/* <div className='prompts'>{term.fileInfo}</div> */}
                    
                    <div className='v-rule'></div>
                    <div className='gen-img'>
                        {loading ? (
                            <div className='loading-spinner'>
                                <CircularProgress size={50} />
                                <p>Generating alternative image...</p>
                            </div>
                        ) : (
                            <div style={hidden}>
                                <h1>Alternative Image</h1>
                                <img src={altImg} alt="alternative"/>
                            </div>
                        )}
                    </div>
                </section>
                )}
            </Dropzone>
        </div> 
        }
        
    </div>
  )
}

export default UploadFiles