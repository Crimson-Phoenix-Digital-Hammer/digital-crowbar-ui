import React from 'react'

function Image({ image }) {
    return (
        <div className="image">
            <img src={image.src} alt="" />
        </div>
    )
}

export default Image