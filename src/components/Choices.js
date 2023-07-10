import React, { useState } from 'react'
import { Button } from '@mui/material'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
import { Link, useNavigate } from 'react-router-dom'
// import useGoogleSearch from '../components/useGoogleSearch'
import './Choices.css'

function Choices() {
    const [choices, setChoices] = useState([
        { choice: 'BMW M340i Mods', done: false },
        { choice: 'Reactjs docs', done: false },
        { choice: 'AWS cli commands', done: false },
        { choice: 'Call of Duty Warzone best clips 2023',  done: false }
    ])

    const [{}, dispatch] = useStateValue()
    const [term, setTerm] = useState("")
    const navigate = useNavigate()
    // const { data } = useGoogleSearch(term)

    const handleChange = (done, i) => {
        let tmp = choices[i];
        tmp.done = !done;
        let choicesClone = [...choices];
        choicesClone[i] = tmp;
        setChoices([...choicesClone]);
    }

    const obfuscate = (e) => {
        e.preventDefault()
        console.log("You hit the obfuscate button")

        let terms = [...choices.filter((choice) => choice.done).map((choice) => choice.choice)]

        
        terms.forEach((example) => {
            //let url = navigate('/search?q=' + example)
            // <Link to='/search?q=' params={example} target='_blank' />
            // let href = '/search?q=' + example
            dispatch({
                type: actionTypes.SET_SEARCH_TERM,
                term: example
            })

            // window.open(navigate('/search?q='+ example), '_blank')
            navigate('/search?q=' + example)
        })

        //navigate('/search?q=' + example)
    }

  return (
    <div className='checks'>
        {choices.map(({choice, done}, i) => (
            <div className='check' key={i}>
                <label className='form-control' htmlFor={i}>
                    <input 
                        type='checkbox'
                        onChange={() => handleChange(done, i)}
                        id={i} 
                        value={choice}
                        checked={done}
                    />
                    <span>{choice}</span>
                </label>
            </div>
        ))}
        {/* <h3>Checked items: {choices.filter((choice) => choice.done).length}</h3> */}
        {/* <textarea
                className="form-control text"
                name="response"
                value={choices.filter((choice) => choice.done).map((choice) => choice.choice).join('\, ')}
                placeholder="The checkbox values will be displayed here "
                id="floatingTextarea2"
                style={{ height: "150px" }}
                onChange={handleChange}
              ></textarea> */}
        <Button onClick={obfuscate} type="submit" variant="outlined">Search</Button>
    </div>
  )
}

export default Choices