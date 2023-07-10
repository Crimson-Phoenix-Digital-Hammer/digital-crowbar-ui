import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Search.css'
import SearchIcon from '@mui/icons-material/Search'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import { Button } from '@mui/material'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

function Search({ hideButtons = false }) {
    const [{}, dispatch] = useStateValue()
    const [term, setTerm] = useState("")
    const navigate = useNavigate()

    const search = (e) => {
        e.preventDefault()
        console.log("You hit the search button")

        dispatch({
            type: actionTypes.SET_SEARCH_TERM,
            term: term,
          });

        navigate('/search?q=' + term)
    }
    
    return (
      <form className="search">
        <div className="search__input">
            <SearchIcon className="search__inputIcon" />
            <input value={term} onChange={(e) => setTerm(e.target.value)} />
            <CameraAltOutlinedIcon className="search__inputIcon" />
        </div>
        {!hideButtons ? (
        <div className="search__buttons">
          <Button className='primary-btn' component={Link} to="/alternatives" type="submit" variant="outlined">
            Obfuscate
          </Button>
          <Button variant="outlined">Obfuscate & Search</Button>
        </div>
      ) : (
        <div className="search__buttons">
          <Button
            className="search__buttonsHidden"
            onClick={search}
            type="submit"
            variant="outlined"
          >
            Google Search
          </Button>
          <Button className="search__buttonsHidden" variant="outlined">
            I'm Feeling Lucky
          </Button>
        </div>
      )}
      </form>
    );
  }
  

export default Search