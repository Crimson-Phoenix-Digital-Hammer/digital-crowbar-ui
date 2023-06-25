import React from 'react'
import './Home.css'
// import { Avatar } from '@mui/material'
import { Link } from 'react-router-dom'
// import AppsIcon from '@mui/icons-material/Apps'
import Search from '../components/Search'
import logo from '../assets/images/digital-crowbar-logo-lg.png'
import footerlogo from '../assets/images/crimson-phoenix-logo-footer.png'

function Home() {
  return (
    <div className="home">
      <div className="home__header">
        <div className="home__headerLeft">
          <Link to="/about">Obfuscated Search</Link>
          <Link to="/store">Image Search</Link>
          <Link to="/gmail">Recent Searches</Link>
        </div>
      </div>

      <div className="home__body">
        <img src={logo} alt="" />
        {/* <h1>Digital Crowbar</h1> */}
        <div className="home__inputContainer">
          <Search />
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
  );
}

export default Home;