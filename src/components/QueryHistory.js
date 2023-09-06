import { nanoid } from 'nanoid'
import React, { useEffect, useState }from 'react'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'

function QueryHistory() {
    // const { data } = JSON.parse(localStorage.getItem("Searched Query")) || []
    // console.log(data?.searchTerms)
    const [queryHistory, setQueryHistory] = useState([])
    useEffect(() => {
        const searchTerms = JSON.parse(localStorage.getItem("Searched Query")) || []
        console.log("searchTerms: ", searchTerms)
        setQueryHistory([...searchTerms])
    }, [])


    console.log("queryHistory: ", queryHistory)
    
    const removeQuery = (id) => {
        const updatedQueries = [...queryHistory].filter((term) => term.id !== id)
        setQueryHistory(updatedQueries)
    }
    
  return (
    <div className='history-sidebar'>
        <h3>Search History</h3>
            {queryHistory.map((term, i, id ) => (
                <p key={i}>{term.query} <button className='action' onClick={() => removeQuery(id)}><ClearOutlinedIcon /></button></p>
            ))}
    </div>
  )
}

export default QueryHistory