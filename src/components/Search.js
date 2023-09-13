import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import { DeleteOutlineOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
import { nanoid } from 'nanoid'
import './Search.css'

function Search() {
  const [{}, dispatch] = useStateValue()
  const [term, setTerm] = useState("")
  const [checkboxes, setCheckboxes] = useState([])
  const [data, setData] = useState(null)
  const [areCheckboxesLoaded, setAreCheckboxesLoaded] = useState(false);
  const [reqCount, setReqCount] = useState(0);
  const navigate = useNavigate()

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
      if(response.status === 200) {
        setReqCount(1);
        localStorage.setItem('reqCount', [reqCount]);
      }
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const result = await response.json();
      setData(result);

    } catch (error) {
      console.error(error);
    }
  };

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

    setCheckboxes([...checkboxes, { id: nanoid(), choice: term, checked: false }])
    fetchData(term)
    console.log(term)
    setTerm("")
  }

  useEffect(() => {
    if (data) {
      const opts = data?.obfuscated_queries
      const newChoices = [...checkboxes, ...data.obfuscated_queries.map((choice) => ({ id: nanoid(), choice, checked: false }))]
      const randomizeChoices = newChoices.sort(() => 0.5 - Math.random())
      setCheckboxes(randomizeChoices)

      setAreCheckboxesLoaded(true);
    }
  }, [data])

  const search = (e) => {
    e.preventDefault()
    let terms = [...checkboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.choice)]
    console.log(terms);
      terms.forEach((example) => {

          dispatch({
              type: actionTypes.SET_SEARCH_TERM,
              term: example
          })

      })
      navigate('/search')
}
    
  return (
    <div className='text-search'>
      <div className="search-header">
        <form onSubmit={obfuscate} className="search">
          <div className="search__input">
              <input type='text' value={term} onChange={(e) => setTerm(e.target.value)} placeholder='Type a term to obfuscate' />
              <button onClick={obfuscate} type="submit"><SearchIcon /></button>
              
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
            <button
              className='remove-button'
              onClick={() => removeCheckbox(checkbox.id)}
            >
              <DeleteOutlineOutlined />
            </button>
          </div>
        ))}
      </div>
      <div className='search-button'>
        {areCheckboxesLoaded && (
          <Button className='search' onClick={search} type='submit' variant='outlined'>
            Search <SearchIcon />
          </Button>
        )}
      </div>
    </div>
  )
}
  

export default Search