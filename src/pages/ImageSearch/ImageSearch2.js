import React, { useState } from 'react';
import { uploadFile, obfuscateImg } from '../../hooks/useUploadService';
import './css/ImageSearch.css';
import UploadImage from './components/UploadImage';
import GenerateImage from './components/GenerateImage';

function ImageSearch() {
    const [view, setView] = useState('initialView');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [image, setImage] = useState(null);
    const [altImg, setAltImg] = useState(null);
    const [prompts, setPrompts] = useState([]);
    const [negative, setNegative] = useState([]);
    const [strength, setStrength] = useState(1);
    const [hidden, setHidden] = useState({ display: 'none' });
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const imageRef = React.useRef(); // Assuming you wanted a ref

    const handleDownloadClick = () => {
        if (imageRef.current) {
            const link = document.createElement('a');
            link.href = altImg;
            link.download = 'alternative.jpg';
            link.click();
        }
    };

    const onDrop = (files) => {
        let currentFile = files[0];
        setImage(URL.createObjectURL(currentFile));

        if (files.length > 0) {
            setSelectedFiles(files);
        }
    }

    const upload = async () => {
        let currentFile = selectedFiles[0];
        setProgress(0);
        setCurrentFile(currentFile);
        setImage(URL.createObjectURL(currentFile));
        setLoading(true);

        try {
            const response = await uploadFile(currentFile, (event) => {
                setProgress(Math.round((100 * event.loaded) / event.total));
            });

            if (response.status === 200) {
                const files = await response.json();
                setPrompts(files.prompts);
            }
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
        setView('generateView');

        console.log(image);
    };

    const generateImg = async () => {
        setLoading(true);

        try {
            const response = await obfuscateImg(prompts, negative, strength, currentFile);
            if (response.status === 200) {
                const blob = await response.blob();
                if (blob.size > 0) {
                    setAltImg(URL.createObjectURL(blob));
                    setHidden({ display: 'block' });
                }
            }
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    }

    return (
        <div>
            {view === 'initialView' ? (
                <UploadImage onDrop={onDrop} upload={upload} selectedFiles={selectedFiles} />
            ) : (
                <GenerateImage
                    onDrop={onDrop}
                    image={image}
                    altImg={altImg}
                    prompts={prompts}
                    negative={negative}
                    strength={strength}
                    hidden={hidden}
                    generateImg={generateImg}
                    handleDownloadClick={handleDownloadClick}
                />
            )}
        </div>
    );
}

export default ImageSearch;
