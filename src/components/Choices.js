import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
import { Link, useNavigate } from 'react-router-dom'
// import useGoogleSearch from '../components/useGoogleSearch'
import './Choices.css'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import useObfuscate from './useObfuscate'

function Choices() {
    const [{ term }, dispatch] = useStateValue();
    
    const [choices, setChoices] = useState([
        { id: new Date().getTime(), choice: term, done: false },
    ])
    const [choice, setChoice] = useState("")

    // const [checkboxes, setCheckboxes] = useStateValue()

    // const [{}, dispatch] = useStateValue()
    // const [term, setTerm] = useState("")
    const navigate = useNavigate()
    const { data } = useObfuscate(term)
    console.log(data)

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

        // let t1 = []
        terms.forEach((example) => {
            //let url = navigate('/search?q=' + example)
            // <Link to='/search?q=' params={example} target='_blank' />
            // let href = '/search?q=' + example
            dispatch({
                type: actionTypes.SET_SEARCH_TERM,
                term: example
            })
            // t1.push(example);
            // window.open(navigate('/search?q='+ example), '_blank')
            navigate('/search?q=' + example)
        })
        // console.log("Choices: ", t1)
        // {t1.map((checkbox, i) => (
        //     window.open('/search?q=' + checkbox, '_blank')
        // ))}
        //navigate('/search?q=' + example)
    }

    function handleSubmit(e) {
        e.preventDefault();
    
        const newChoice = {
            id: new Date().getTime(),
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
                        onChange={() => handleChange(done, i)}
                        id={id} 
                        value={choice}
                        checked={done}
                    />
                    <span>{choice}</span>
                    <button className='action' onClick={() => removeCheckbox(id)}><ClearOutlinedIcon /></button>
                </label>
            </div>
        ))}
        <div className='check'>
            <form onSubmit={handleSubmit}>
                <input type='text' value={choice} onChange={(e) => setChoice(e.target.value)} /> 
                <button className='action-add' type="submit"><AddCircleOutlineOutlinedIcon /></button>
            </form>

            
        </div>

        <Button className='search' onClick={obfuscate} type="submit" variant="outlined">Search</Button>
    </div>
  )
}

export default Choices