import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
import { Link, useNavigate } from 'react-router-dom'
// import useGoogleSearch from '../components/useGoogleSearch'
import './Choices.css'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'

function Choices() {
    const [{ term }, dispatch] = useStateValue();
    const [choices, setChoices] = useState([
        { id: new Date().getTime(), choice: term, done: false },
    ])
    const [choice, setChoice] = useState("")


    // const [{}, dispatch] = useStateValue()
    // const [term, setTerm] = useState("")
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

    const addCheckbox = () => {
        console.log("You hit the add button")
    }

    // useEffect(() => {
    //     console.log("Choices: ", choices)
    // })

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
    
    function removeCheckbox(id) {
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
                    <button className='action' onClick={() => removeCheckbox(choice.id)}><ClearOutlinedIcon /></button>
                </label>
            </div>
        ))}
        <div className='check'>
            <form onSubmit={handleSubmit}>
                <input type='text' value={choice} onChange={(e) => setChoice(e.target.value)} /> 
                <button className='action-add' type="submit" onClick={addCheckbox}><AddCircleOutlineOutlinedIcon fontSize='large' /></button>
            </form>

            
        </div>
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
        <Button className='search' onClick={obfuscate} type="submit" variant="outlined">Search</Button>
    </div>
  )
}

export default Choices