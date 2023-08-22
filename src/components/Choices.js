import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
import { useLocation, useNavigate } from 'react-router-dom'
// import useGoogleSearch from '../components/useGoogleSearch'
import './Choices.css'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import useObfuscate from './useObfuscate'
import useGoogleSearch from './useGoogleSearch'
import { nanoid } from 'nanoid'

function Choices() {
    const [{ term }, dispatch] = useStateValue();
    
    const [choices, setChoices] = useState([
        { id: nanoid(), choice: term, done: false },
    ])
    const [choice, setChoice] = useState("")
    const navigate = useNavigate()

    const [searchTerms, setSearchTerms] = useState([])
    
    const { data } = useObfuscate(term) 
    console.log(data)
    const opts = data?.obfuscated_queries
    useEffect(() => {
        if (data) {
            const newChoices = [...choices, ...data.obfuscated_queries.map((choice) => ({ id: nanoid(), choice, done: false }))]
            setChoices(newChoices)
        }
    }, [data])
    console.log(choices);

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

        setSearchTerms([])
        

        // let terms = [...choices.filter((choice) => choice.done).map((choice) => choice.choice)]

        // // opts.forEach((example) => {
        // //     dispatch({
        // //         type: actionTypes.SET_SEARCH_TERM,
        // //         term: example
        // //     })
        // //     // navigate(`/search?q=${example}`) 
        // //     const newRoute = '/search?q=' + example;
        // //     // window.open(`${window.location.origin}${newRoute}`, '_blank')

        // //     // const string = { key: example };
        // //     // const queryParams = new URLSearchParams(data).toString();
        // //     // const newTabUrl = `${newRoute}${queryParams}`;

        // //     // console.log(queryParams)
            
        // //     //window.open(newRoute, '_blank');
        // // })

        // // let t1 = []
        // terms.forEach((example) => {
        //     //let url = navigate('/search?q=' + example)
        //     // <Link to='/search?q=' params={example} target='_blank' />
        //     // let href = '/search?q=' + example
        //     dispatch({
        //         type: actionTypes.SET_SEARCH_TERM,
        //         term: example
        //     })
        //     // t1.push(example);
        //     // window.open(navigate('/search?q='+ example), '_blank')
        //     navigate(`/search?q=${example}`) 
        // })
        // console.log("Choices: ", t1)
        // {t1.map((checkbox, i) => (
        //     window.open('/search?q=' + checkbox, '_blank')
        // ))}
        //navigate('/search?q=' + example)
    }
    console.log("Search Terms: ", searchTerms);

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

// onChange={() => handleChange(done, i)}