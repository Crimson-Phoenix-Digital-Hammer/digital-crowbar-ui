import React, { useState } from 'react'
import { TextField, Box, Grid, IconButton } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import MainNav from '../../components/MainNav';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../models/db'

function Personas() {
    const [userInput, setUserInput] = useState('')
    const [editMode, setEditMode] = useState(false);
    const [currentPersonaId, setCurrentPersonaId] = useState(null);
    const allPersonas = useLiveQuery(() => db.personas.toArray(), [])

    const addPersona = async () => {
        const personaFields = {
            name: userInput.name,
            system_message: userInput.system_message,
        };

        if (editMode) {
            await db.personas.update(currentPersonaId, personaFields);
        } else {
            await db.personas.add(personaFields);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInput(prev => ({ ...prev, [name]: value }))
    }

    const handlePersonaSave = (e) => {
        addPersona();
        setEditMode(false);
        setCurrentPersonaId(null);
        setUserInput('');
        if (e.key === 'Enter') handlePersonaSave(e);
    }

    const handlePersonaDelete = (id) => db.personas.delete(id)

    const handlePersonaEdit = async (id) => {
        const persona = await db.personas.get(id);
        setUserInput({
            name: persona.name,
            system_message: persona.system_message,
        });
        setEditMode(true);
        setCurrentPersonaId(id);
    }

    const columns = [
        { field: 'name', headerName: 'Name', flex: .5 },
        { field: 'system_message', headerName: 'System Message', flex: 2 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: .5,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handlePersonaEdit(params.row.id)}><Edit /></IconButton>
                    <IconButton onClick={() => handlePersonaDelete(params.row.id)}><Delete /></IconButton>
                </>
            )
        }
    ]

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
                                <TextField
                                    style={{ marginBottom: '20px' }}
                                    fullWidth
                                    className='persona-name'
                                    label="Persona Name"
                                    variant="outlined"
                                    name="name"
                                    onChange={(e) => handleChange(e)}
                                    value={userInput.name || ''}
                                />

                                <TextField
                                    style={{ marginBottom: '20px' }}
                                    fullWidth
                                    className='persona-system-message'
                                    multiline
                                    rows={4}
                                    label="System Message"
                                    variant="outlined"
                                    name="system_message"
                                    onChange={(e) => handleChange(e)}
                                    value={userInput.system_message || ''}
                                />

                                <Button variant='contained' onClick={(e) => handlePersonaSave(e)} disableElevation style={{ alignSelf: 'flex-start' }}>Save</Button>
                            </Box>
                            <Box sx={{ height: 400, width: '100%', marginTop: '40px' }}>
                                <h2 style={{ marginBottom: '20px' }}>Persona List</h2>
                                <DataGrid
                                    rows={allPersonas || []}
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