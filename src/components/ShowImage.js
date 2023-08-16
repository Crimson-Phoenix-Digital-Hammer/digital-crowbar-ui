import React from 'react'
import Image from './Image'

function ShowImage({ images }) {
    const show = (image) => {
        return <Image image={image} />
    }
    return <div className="image-list">{images.map(show)}</div>
}

export default ShowImage