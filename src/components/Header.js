import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'

function Header(props) {
  const [view, setView] = useState('primary')
  //setView(props.view);
  //console.log(view);
  return (
    <div>
      {view === 'primary' ? (
        <div className="home__header">
          <div className="home__headerLeft">
            <Link to="/">Obfuscated Search</Link>
            <Link to="/image-search">Image Search</Link>
            <Link to="/recent-searches">Recent Searches</Link>
          </div>
        </div>
    ) : (
      <div className="searchPage__header">
          
  
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
    )}
    </div>
    
  )
}

export default Header