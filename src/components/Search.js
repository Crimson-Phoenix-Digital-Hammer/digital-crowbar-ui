import React, { createElement, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Search.css'
import SearchIcon from '@mui/icons-material/Search'
import {AddCircleOutlineOutlined, ClearOutlined, DeleteOutlineOutlined} from '@mui/icons-material'
import { Button, FormControl, FormControlLabel } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
import useObfuscate from './services/useObfuscate'
import { nanoid } from 'nanoid'

function Search({ hideButtons = false }) {
  const [{}, dispatch] = useStateValue()
  const [term, setTerm] = useState("")
  const [checkboxes, setCheckboxes] = useState([])
  const [data, setData] = useState(null)


  // const navigate = useNavigate()

  const fetchData = async (searchTerm) => {
    try {
      const response = await fetch(
        'https://api.digital-crowbar.com/obfuscate_text_query',
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query_text: searchTerm,
            number_of_suggestions: 5,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(error);
    }
  };

  const search = async (e) => {
      e.preventDefault()

      setCheckboxes([...checkboxes, { id: nanoid(), choice: term, checked: false }])
      fetchData(term)
      console.log(term)
      setTerm("")
  }

  const handleChange = (checked, i) => {
    let tmp = checkboxes[i];
    tmp.checked = !checked;
    let checkboxesClone = [...checkboxes];
    checkboxesClone[i] = tmp;
    setCheckboxes([...checkboxesClone]);
    console.log("checkboxes: ", checkboxes);
  }

  const removeCheckbox = (id) => {
    const updatedCheckboxes = [...checkboxes].filter((choice) => choice.id !== id);
    setCheckboxes(updatedCheckboxes);
  }

  const obfuscate = (e) => {
    e.preventDefault()
    // console.log("You hit the search button")
    // let searchTerms = []

    // searchTerms = JSON.parse(localStorage.getItem("Searched Query")) || []
    // searchTerms.push({id: nanoid(), query: term})
    

    dispatch({
        type: actionTypes.SET_SEARCH_TERM,
        term: term,
      });
    console.log("term: ", term);
    // navigate('/alternatives')

    // localStorage.setItem("Searched Query", JSON.stringify(searchTerms))
  }
    
  return (
    <div className='text-search'>
      <div className="search-header">
        <form onSubmit={search} className="search">
          <div className="search__input">
              <input type='text' value={term} onChange={(e) => setTerm(e.target.value)} placeholder='Type a term to obfuscate' />
              <button onClick={search} type="submit"><SearchIcon /></button>
              {/* <Button onClick={obfuscate} component={Link} to="/alternatives" type="submit"><SearchIcon /></Button> */}
          </div>
        </form>
      </div>
      <div className="search-terms-container">
        
      {checkboxes.map((checkbox, i) => (
          <div className='checkbox-group' key={checkbox.id}>
            <Checkbox
              checked={checkbox.checked}
              value={checkbox.choice}
              onChange={() => handleChange(checkbox.checked, i)}
            />
            <span>{checkbox.choice}</span>
            <Button
              className='remove-button'
              variant="outlined"
              color="error"
              onClick={() => removeCheckbox(checkbox.id)}
            >
              Remove <DeleteOutlineOutlined />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
  

export default Search