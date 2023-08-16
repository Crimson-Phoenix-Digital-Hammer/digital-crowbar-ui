import React, { useCallback, useState } from 'react'
import DropBox from '../components/DropBox'
import ShowImage from '../components/ShowImage'
import { Link } from 'react-router-dom'
import logo from '../assets/images/digital-crowbar-logo-lg.png'
import footerlogo from '../assets/images/crimson-phoenix-logo-footer.png'
import UploadFiles from '../components/FileUpload'

function ImageSearch() {
  const [images, setImages] = useState([])
  // const onDrop = useCallback((acceptedFiles) => {
  //     acceptedFiles.map((file, i) => {
  //         const reader = new FileReader()
  //         reader.onload = (e) => {
  //             setImages((prevState) => [
  //                 ...prevState,
  //                 { id: i, src: e.target.result }
  //             ])
  //         }
  //         reader.readAsDataURL(file)
  //         return file
  //     })
  // }, [])

  // const uploadFiles = (e) => {
  //     console.log(e.target.files)
  // }

  return (
    <div className="home">
      <div className="home__header">
        <div className="home__headerLeft">
          <Link to="/alternatives">Obfuscated Search</Link>
          <Link to="/image-search">Image Search</Link>
          <Link to="/recent-searches">Recent Searches</Link>
        </div>
      </div>

      <div className="home__body">
        <img src={logo} alt="" />
        <div className="home__inputContainer">
          {/* <DropBox onDrop={onDrop} /> */}
          <UploadFiles />
          <ShowImage images={images} />
          
        </div>
      </div>

      <div className="home__footer">
        <Link to="https://crimsonphoenix.com"><img className='footer-logo' src={footerlogo} /></Link>
        <div className="home__footerBody">
            <div className="home__footerLeft">
                <Link to="https://crimsonphoenix.com/about">About Crimsom Phoenix</Link>
                <Link to="/">How Digital Crowbar Works</Link>
            </div>
            <div className="home__footerRight">
                © 2023 Crimson Phoenix, All rights reserved.
            </div>
        </div>
      </div>
    </div>
  )
}

export default ImageSearch