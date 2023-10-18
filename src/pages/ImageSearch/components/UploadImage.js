import React from 'react'
import { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Button } from '@mui/material'
import FileDisplay from './FileDisplay'

function UploadImage({ onDrop, upload, selectedFiles }) {
    return (
        <div>
            <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} />
                            <FileDisplay files={selectedFiles} />
                        </div>
                    </section>
                )}
            </Dropzone>
            <Button onClick={upload} variant="contained">
                Upload
            </Button>
        </div>
    );
}

export default UploadImage