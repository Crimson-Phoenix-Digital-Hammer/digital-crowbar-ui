import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import './Choices.css'
import {AddCircleOutlineOutlined, ClearOutlined} from '@mui/icons-material'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import useObfuscate from './services/useObfuscate'
import useGoogleSearch from './services/useGoogleSearch'
import { nanoid } from 'nanoid'

function Choices() {
    const [{ term }, dispatch] = useStateValue();
    
    const [choices, setChoices] = useState([
        { id: nanoid(), choice: term, done: false },
    ])
    const [choice, setChoice] = useState("")
    const navigate = useNavigate()

    const [searchTerms, setSearchTerms] = useState([])

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    
    const { data } = useObfuscate(term) 
    console.log(data)
    // const opts = data?.obfuscated_queries
    useEffect(() => {
        if (data) {
            const newChoices = [...choices, ...data.obfuscated_queries.map((choice) => ({ id: nanoid(), choice, done: false }))]
            const randomizeChoices = newChoices.sort(() => 0.5 - Math.random())
            setChoices(randomizeChoices)
            // choices?.sort(() => 0.5 - Math.random());
        }
        // return choices
    }, [data])

    console.log("Choices: ", choices)
    // const shuffled = choices?.sort(() => 0.5 - Math.random());
    // console.log(choices);

    // const addNewChoices = choice => {
    //     const newChoices = [...todos, { choice }]
    //     setChoices(newChoices)
    // }

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

        const checkedChoices = [[...choices].filter((choice) => choice.done !== false)]
        console.log(checkedChoices);

        // setSearchTerms([])
        

        let terms = [...choices.filter((choice) => choice.done).map((choice) => choice.choice)]
        terms.forEach((example) => {

            dispatch({
                type: actionTypes.SET_SEARCH_TERM,
                term: example
            })

        })

        navigate('/search')
    }
    //console.log("Search Terms: ", searchTerms);

    function handleSubmit(e) {
        e.preventDefault();
    
        const newChoice = {
            id: nanoid(),
            choice: choice,
            done: false
        };
        setChoices([...choices].concat(newChoice));
        setChoice("");
    }
    
    const removeCheckbox = (id) => {
        const updatedCheckboxes = [...choices].filter((choice) => choice.id !== id);
        setChoices(updatedCheckboxes);
    }

  return (
    <div className='checks'>
        {choices.map(({id, choice, done}, i) => (
            <div className='check' key={i}>
                <label className='form-control' htmlFor={i}>
                
                    <input 
                        type='checkbox'
                        onChange={(e) => handleChange(done, i, e.target.value)}
                        id={id} 
                        value={choice}
                        checked={done}
                    />
                    <span>{choice}</span>
                    <button className='action' onClick={() => removeCheckbox(id)}><ClearOutlined /></button>
                </label>
            </div>
        ))}
        <div className='check'>
            <form onSubmit={handleSubmit}>
                <input type='text' value={choice} onChange={(e) => setChoice(e.target.value)} /> 
                <button className='action-add' type="submit"><AddCircleOutlineOutlined /></button>
            </form>

            
        </div>

        <Button className='search' onClick={obfuscate} type="submit" variant="outlined">Search</Button>
    </div>
  )
}

export default Choices

// onChange={() => handleChange(done, i)}