import React from 'react'
import Dropzone from 'react-dropzone'
import { Button } from '@mui/material'
// import './GenerateImage.css'
import FileDisplay from './FileDisplay'
import ControlPanel from './ControlPanel'



function GenerateImage({ onDrop, image, altImg, prompts, negative, strength, hidden, generateImg, handleDownloadClick }) {
    return (
        <div>
            <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} />
                            <FileDisplay files={image} />
                        </div>
                    </section>
                )}
            </Dropzone>
            <ControlPanel
                image={image}
                altImg={altImg}
                prompts={prompts}
                negative={negative}
                strength={strength}
                hidden={hidden}
                generateImg={generateImg}
                handleDownloadClick={handleDownloadClick}
            />
        </div>
    );
}

export default GenerateImage