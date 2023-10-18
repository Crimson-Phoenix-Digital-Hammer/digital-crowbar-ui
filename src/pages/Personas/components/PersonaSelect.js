import React, { useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { db } from '../../../models/db'
import { useLiveQuery } from 'dexie-react-hooks'

function PersonaSelect() {
    const allPersonas = useLiveQuery(() => db.personas.toArray(), [])
    // console.log("allPersonas: ", allPersonas)

    const [value, setValue] = useState('')

    const handleChange = (event) => {
        setValue(event.target.value);
        updateSystemMessage(event.target.value);
    }
    const updateSystemMessage = (system_message) => {
        const systemMessage = system_message
        localStorage.setItem('System Message', JSON.stringify(systemMessage))
    }

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <InputLabel id="personaSelect">Persona</InputLabel>
                <Select
                    labelId="personaSelect"
                    id="persona-select"
                    value={value}
                    label="Persona"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>Select a persona</em>
                    </MenuItem>
                    {allPersonas?.map(({id, name, system_message}) => (
                        <MenuItem key={id} value={system_message}>{name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}

export default PersonaSelect