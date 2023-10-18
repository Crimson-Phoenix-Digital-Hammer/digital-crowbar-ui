function FileDisplay({ files }) {
    return (
        <>
            {files && files.length > 0 ? (
                files.map((file, index) => (
                    <img key={index} src={URL.createObjectURL(file)} alt="uploaded preview" />
                ))
            ) : (
                <p>Drag & drop your file here, or click to select one</p>
            )}
        </>
    );
}

export default FileDisplay