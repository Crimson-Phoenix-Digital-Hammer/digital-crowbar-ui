import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { db } from '../../models/db';

function Settings({ handleClose, style }) {
    const clearChat = () => {
        localStorage.removeItem('chatHistory')
        window.location.reload(false);
        handleClose();
    }
    const clearAllData = () => {
        db.delete();
        localStorage.clear();
        window.location.reload(false);
        handleClose();
    }
    return (

        <Box sx={style}>
            <Box style={{ paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255, 0.25)' }}>
                <Typography style={{ fontFamily: "Space Grotesk", color: '#fff' }} id="modal-modal-title" variant="h6" component="h2">
                    Settings
                </Typography>
            </Box>
            <Box className='clear-history' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '15px', width: '100%', marginBottom: '10px' }}>
                {/* <Typography style={{ fontFamily: "Space Grotesk", marginBottom: '10px', color: '#fff' }} id="modal-modal-title-2" component="h4">
                            Clear Chat
                        // </Typography>    */}
                <Button className='clear' onClick={clearChat}>Clear Chat</Button>
            </Box>
            <Box className='clear-history' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '15px', width: '100%' }}>
                {/* <Typography style={{ fontFamily: "Space Grotesk", marginBottom: '10px', color: '#fff' }} id="modal-modal-title-2" component="h4">
                            Clear Chat
                        // </Typography>    */}
                <Button className='clear' onClick={clearAllData}>Delete All Data</Button>
            </Box>
        </Box>

    )
}

export default Settings