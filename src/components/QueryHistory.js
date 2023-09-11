import { nanoid } from 'nanoid'
import React, { useEffect, useState }from 'react'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import { Badge } from '@mui/material'

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
        <div className='history-header'>
            <h2>History</h2>
            <Badge badgeContent={queryHistory.length} color="primary" />
        </div>
        <div className='history-container'>
            {queryHistory.map((term, i, id ) => (
                <div key={i} id={term.id}>{term.query}</div>
            ))}
        </div>
        <div className='history-footer'>
            <button className='action' onClick={(id) => removeQuery(id)}><ClearOutlinedIcon /></button>
        </div>
    </div>
  )
}

export default QueryHistory

{/* <button className='action' onClick={() => removeQuery(id)}><ClearOutlinedIcon /></button> */}