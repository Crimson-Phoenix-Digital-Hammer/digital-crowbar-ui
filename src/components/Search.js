import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Search.css'
import SearchIcon from '@mui/icons-material/Search'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import { Button } from '@mui/material'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
// import useObfuscate from './useObfuscate'

function Search({ hideButtons = false }) {
    const [{}, dispatch] = useStateValue()
    const [term, setTerm] = useState("")

    // const { data } = useObfuscate(term)
    // console.log(data)

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

    const obfuscate = (e) => {
      e.preventDefault()
      console.log("You hit the search button")

      dispatch({
          type: actionTypes.SET_SEARCH_TERM,
          term: term,
        });
      console.log("term: ", term);
      navigate('/alternatives?q=' + term)
  }
    
    return (
      <form onSubmit={obfuscate} className="search">
        <div className="search__input">
            <SearchIcon className="search__inputIcon" />
            <input type='text' value={term} onChange={(e) => setTerm(e.target.value)} />
            <CameraAltOutlinedIcon className="search__inputIcon" />
        </div>
        {!hideButtons ? (
        <div className="search__buttons">
          <Button className='primary-btn' onClick={obfuscate} component={Link} to="/alternatives" type="submit" variant="outlined">
            Obfuscate
          </Button>
          <Button variant="outlined">Obfuscate & Search</Button>
        </div>
      ) : (
        <div className="search__buttons">
          <Button
            className="search__buttonsHidden"
            onClick={obfuscate}
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