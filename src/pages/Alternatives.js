import React from 'react'
import './Alternatives.css'
import { Link } from 'react-router-dom'
import Search from '../components/Search'
import logo from '../assets/images/digital-crowbar-logo-lg.png'
import footerlogo from '../assets/images/crimson-phoenix-logo-footer.png'
import Choices from '../components/Choices'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'

function Alternatives() {
  return (
    <div className='alts'>
        
        <div className="searchPage__header">
          <Link to="/">
            <img
              className="searchPage__logo"
              src={logo}
              alt=""
            />
          </Link>
  
          <div className="searchPage__headerBody">
            <Search hideButtons />
            <div className="searchPage__options">
              <div className="searchPage__optionsLeft">
                <div className="searchPage__option">
                  <DescriptionOutlinedIcon />
                  <Link to="/search">Obfuscate Search</Link>
                </div>
                <div className="searchPage__option">
                  <ImageOutlinedIcon />
                  <Link to="/image-search">Image Search</Link>
                </div>
                <div className="searchPage__option">
                  <HistoryOutlinedIcon />
                  <Link to="/recent-searches">Recent Searches</Link>
                </div>
              </div>
  
              <div className="searchPage__optionsRight">
                <div className="searchPage__option">
                  <Link to="/settings">Settings</Link>
                </div>
                <div className="searchPage__option">
                  <Link to="/tools">Tools</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      <div className="alts__body">
        <h1>Alternatives</h1>
        <div className="alts__inputContainer">
            <Choices />
        </div>
      </div>

      <div className="alts__footer">
        <Link to="https://crimsonphoenix.com"><img className='footer-logo' src={footerlogo} /></Link>
        <div className="alts__footerBody">
            <div className="alts__footerLeft">
                <Link to="https://crimsonphoenix.com/about">About Crimsom Phoenix</Link>
                <Link to="/">How Digital Crowbar Works</Link>
            </div>
            <div className="alts__footerRight">
                © 2023 Crimson Phoenix, All rights reserved.
            </div>
        </div>
      </div>
    </div>
    
  )
}

export default Alternatives