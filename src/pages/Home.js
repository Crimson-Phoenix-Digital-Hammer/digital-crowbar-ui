import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import Search from '../components/Search'
import logo from '../assets/images/digital-crowbar-logo-lg.png'
import footerlogo from '../assets/images/crimson-phoenix-logo-footer.png'

function Home() {
  return (
    <div className="home">
      <div className="home__header">
        <div className="home__headerLeft">
          <Link to="/">Obfuscated Search</Link>
          <Link to="/image-search">Image Search</Link>
          <Link to="/recent-searches">Recent Searches</Link>
        </div>
      </div>

      <div className="home__body">
        <img src={logo} alt="" />
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