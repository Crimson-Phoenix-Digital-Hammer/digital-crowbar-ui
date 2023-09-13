import React, {useState, useEffect, useRef} from 'react'
import Dropzone, { useDropzone } from 'react-dropzone'
import Search from './Search'
import { Button, CircularProgress, Box, Slider, TextField } from '@mui/material'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';
import { uploadFile, obfuscateImg } from './services/useUploadService'
import './ImageSearch.css'
import { useNavigate } from 'react-router-dom'
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'
import { Download } from '@mui/icons-material'
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
    const [reqCount, setReqCount] = useState(0);
    const imageRef = useRef(null);
//   const navigate = useNavigate();
    
    // useEffect(() => {
    //     getFiles().then((response) => {
    //         setFileInfos(response.data)
    //     })
    // }, [])

    const marks = [
        {
          value: 0,
          label: '0',
        },
        {
          value: 0.5,
          label: '0.5',
        },
        {
          value: 1,
          label: '1',
        },
    ];
      
    const valuetext = (value) => {
        return `${value}`;
    }

    const handleDownloadClick = () => {
        if (imageRef.current) {
        const link = document.createElement('a');
        link.href = altImg;
        link.download = 'alternative.jpg'; // You can change the downloaded file name here
        link.click();
        }
    };

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
          if(response.status === 200) {
            setReqCount(1);
            localStorage.setItem('Image Uploads', [reqCount]);
        }
          const files = await response.json();
          setMessage(files.prompts);
          setPrompts(files.prompts);
          console.log(files);
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
          if(response.status === 200) {
            setReqCount(1);
            localStorage.setItem('Stable Diffusion', [reqCount]);
        }
      
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
                        {/* <div className='dropbox__header'><button className='action' onClick={onClick}><ClearOutlinedIcon /></button></div> */}
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
                                                    <p>Drag an image here or <span name='open-files'>upload a file</span></p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                        </div>
                        <aside className='selected-file-wrapper'>
                            <Button className='search' disabled={!selectedFiles || loading} onClick={upload} variant='outlined'>
                                {loading ? <CircularProgress size={24} /> : <><span>Upload Image</span><FileUploadOutlinedIcon /></>}
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
                                                <p>Drag an image here or <span name='open-files'>upload a file</span></p>
                                            </div>
                                        )}
                            </div>
                            
                                <TextField
                                    className='field'
                                    label="Prompt"
                                    multiline
                                    rows={8}
                                    onChange={(e) => setPrompts(e.target.value)}
                                    value={prompts}
                                />

                            
                                <TextField
                                    className='field'
                                    label="Negative"
                                    multiline
                                    onChange={(e) => setNegative(e.target.value)}
                                    value={negative}
                                />
                         
                            <div className='field'>
                            <label htmlFor='strength'>Strength</label>
                                <Box sx={{ width: 350 }}>
                                <Slider
                                    aria-label="Strength"
                                    defaultValue={0.5}
                                    getAriaValueText={valuetext}
                                    step={0.1}
                                    min={0}
                                    max={1}
                                    valueLabelDisplay="auto"
                                    marks={marks}
                                    onChange={(e) => setStrength(e.target.value)}
                                />
                                </Box>
                            </div>
                            
                           
                        
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
                                <figure>
                                    <img ref={imageRef} src={altImg} alt="alternative"/>
                                    <Button className='search' onClick={handleDownloadClick}><Download /></Button>
                                </figure>
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