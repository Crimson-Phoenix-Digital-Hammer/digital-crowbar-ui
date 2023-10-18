import React, { useState } from 'react'
import { CheckOutlined, ContentPasteOutlined } from '@mui/icons-material'
import clipboardCopy from 'clipboard-copy'



function detectLanguage(content) {
    const match = content.match(/```(\w+)/)
    return match ? match[1] : null
}

function CopyCode({ content, index }) {
    const [copied, setCopied] = useState(false);
    const language = detectLanguage(content)
    const handleCopy = (e) => {
        e.stopPropagation()
        clipboardCopy(content)
        setCopied(true);

        // Reset after some time (e.g., 3 seconds) - Optional
        setTimeout(() => setCopied(false), 3000);
    }

    return (
        <div className='copy-code'>
            <small>{language}</small>
            <button className='copy' id={`copy-${index}`} onClick={handleCopy}>
                {copied ? (
                    <>
                        <CheckOutlined fontSize='small' />  <span>Copied!</span>
                    </>
                ) : (
                    <>
                        <ContentPasteOutlined fontSize='small' /> <span>Copy Code</span>
                    </>
                )}
            </button>
        </div>
    )
}

export default CopyCode