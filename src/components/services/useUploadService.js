export const uploadFile = async (file, onUploadProgress) => {
    let formData = new FormData()
    formData.append("file", file)
    
    return await fetch("https://api.digital-crowbar.com/obfuscate_image_query/clip_interrogation", {
        method: "POST",
        body: formData,
        onUploadProgress,
    })
}

export const obfuscateImg = async (prompt, negative, strength, file) => {
    let formData = new FormData()
    formData.append("prompt", prompt)
    formData.append("negative_prompt", negative)
    formData.append("strength", strength)
    formData.append("file", file)

    return await fetch("https://api.digital-crowbar.com/obfuscate_image_query/", { 
        method: "POST",
        body: formData,
    })
}