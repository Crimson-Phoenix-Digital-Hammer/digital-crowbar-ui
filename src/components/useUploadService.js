import React from 'react'

export const uploadFile = (file, onUploadProgress) => {
    let formData = new FormData()
    formData.append("file", file)
    
    return fetch("http://digital-crowbar-dev.eba-7szv7fvp.us-east-1.elasticbeanstalk.com/obfuscate_image_query/clip_interrogation", {
        method: "POST",
        body: formData,
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
        onUploadProgress,
    })
}

export const obfuscateImg = (prompt, negative, strength, file) => {
    let formData = new FormData()
    formData.append("prompt", prompt)
    formData.append("negative_prompt", negative)
    formData.append("strength", strength)
    formData.append("file", file)

    // console.log(formData);
    return fetch("http://digital-crowbar-dev.eba-7szv7fvp.us-east-1.elasticbeanstalk.com/obfuscate_image_query/", { 
        method: "POST",
        body: formData,
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
    })
}