import React from 'react'
import { Button, Slider, TextField } from '@mui/material'
import { Download } from '@mui/icons-material';

function ControlPanel({ image, altImg, prompts, negative, strength, hidden, generateImg, handleDownloadClick }) {
    const [state, setState] = React.useState({
        prompts: '',
        negative: '',
        strength: 0.5,
    });
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
    
    return (
        <div style={hidden}>
            <img src={altImg} alt="Alternative" />
            <TextField
                label="Prompts"
                variant="outlined"
                fullWidth
                margin="normal"
                value={prompts}
                onChange={(e) => setState({ ...state, prompts: e.target.value })}
            />
            <TextField
                label="Negative Prompts"
                variant="outlined"
                fullWidth
                margin="normal"
                value={negative}
                onChange={(e) => setState({ ...state, negative: e.target.value })}
            />
            <Slider
                defaultValue={0.5}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={0.01}
                marks={marks}
                min={0}
                max={1}
                value={strength}
                onChange={(e, newValue) => setState({ ...state, strength: newValue })}
            />
            <Button variant="contained" onClick={generateImg}>
                Generate
            </Button>
            <Button onClick={handleDownloadClick}>
                <Download />
            </Button>
        </div>
    );
}

export default ControlPanel