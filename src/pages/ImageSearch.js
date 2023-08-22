import React, { useCallback, useState } from 'react'
import DropBox from '../components/DropBox'
import ShowImage from '../components/ShowImage'
import { Link } from 'react-router-dom'
import logo from '../assets/images/digital-crowbar-logo-lg.png'
import footerlogo from '../assets/images/crimson-phoenix-logo-footer.png'
import UploadFiles from '../components/FileUpload'
import Header from '../components/Header'

function ImageSearch() {
  // const [images, setImages] = useState([])

  return (
    <div className="searchPage">
      <Header view="secondary" />

      <div className="home__body">
        <img src={logo} alt="" />
        <div className="home__inputContainer">
          <UploadFiles />
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