import { nanoid } from 'nanoid';
import React, { useState } from 'react'
import { TextField, Box, Grid, IconButton } from '@mui/material'
import {Edit, Delete } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import MainNav from '../components/MainNav';
import Dexie from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';


const initialPersonas = [
    {
        id: nanoid(),
        name: 'Persona 1',
        system_message: 'System Message 1',
    },
    {
        id: nanoid(),
        name: 'Persona 2',
        system_message: 'System Message 2',
    },
    {
        id: nanoid(),
        name: 'Persona 3',
        system_message: 'System Message 3',
    },
    {
        id: nanoid(),
        name: 'Persona 4',
        system_message: 'System Message 4',
    },
    {
        id: nanoid(),
        name: 'Persona 5',
        system_message: 'System Message 5',
    },
]

const db = new Dexie('personas');
db.version(1).stores({
    personas: 'id, name, system_message'
})

const { personas } = db;

personas.bulkAdd(initialPersonas);

function Personas() {
    const allPersonas = useLiveQuery(() => personas.toArray(), [])

    const [persona, setPersona] = useState(initialPersonas)
    const [userInput, setUserInput] = useState('')

    const columns = [
        { field: 'name', headerName: 'Name', maxWdth: 200 },
        { field: 'system_message', headerName: 'System Message', minWidth: 795 },
        {
            field: 'actions',
            headerName: 'Actions',
            minWdth: 150,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handlePersonaEdit(params.row.id)}><Edit /></IconButton>
                    <IconButton onClick={() => handlePersonaDelete(params.row.id)}><Delete /></IconButton>
                </>
            )
        }
    ]
    
    const addPersona = async (e) => {
        // e.preventDefault()
        await personas.add(persona)
    }
    // personas.bulkAdd(persona)
    // personas.add({
    //     id: nanoid(),
    //     name: userInput.name,
    //     system_message: userInput.system_message,
    // })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInput(prev => ({ ...prev, [name]: value }))
    }

    const handlePersonaSave = (e) => {
        // setPersona(prev => [
        //     ...prev,
        //     {
        //         id: nanoid(),
        //         name: userInput.name,
        //         system_message: userInput.system_message,
        //     },
        // ])

        addPersona();
        if (e.key === 'Enter') handlePersonaSave();
        setUserInput({ name: '', system_message: '' })
    }

    const handlePersonaDelete = (id) => {
        setPersona(prev => prev.filter(persona => persona.id !== id))
    }

    const handlePersonaEdit = (id) => {
        // Implement edit functionality here
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item md={3} xs={12}>
                    <MainNav />
                </Grid>
                <Grid item md={9} xs={12}>
                    <div className='main-content'>
                        <div className='persona-header'>
                            <h2>Personas</h2>
                        </div>
                        <div className='persona-body'>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <TextField style={{ marginBottom: '20px' }}
                                    fullWidth
                                    label="Persona Name"
                                    variant="outlined"
                                    name="name"
                                    onChange={handleChange}
                                />
                                <TextField style={{ marginBottom: '20px' }}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="System Message"
                                    variant="outlined"
                                    name="system_message"
                                    onChange={handleChange}
                                />
                                <Button variant='contained' onClick={handlePersonaSave} disableElevation style={{ alignSelf: 'flex-start' }}>Save</Button>
                            </Box>
                            <Box sx={{ height: 400, width: '100%', marginTop: '40px' }}>
                                <h2 style={{ marginBottom: '20px' }}>Persona List</h2>
                                <DataGrid
                                    rows={persona}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection={false}
                                />
                            </Box>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Personas