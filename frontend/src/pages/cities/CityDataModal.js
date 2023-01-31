import React, { useState } from 'react';
import { Button, Divider, Paper, TextField, Typography } from '@mui/material/';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import { CityTile } from './CityTile';


export const CityDataModal = ({city, updateCity, closeModal})=> {
    if(!city) city={name:"",photo:""};
    const [newName, setNewName] = useState(city.name);
    const [newPhoto, setNewPhoto] = useState(city.photo)
    const [savingProgress, setSavingProgress] = useState(false);

    const handleLoad = () => {
        setSavingProgress(true);
        updateCity(city.id, newName, newPhoto, ()=>{setSavingProgress(false);
            closeModal();});
        
    };

    const setNewNameHandler = (e) => {
        setNewName(e.target.value);
    };

    const setNewPhotoHandler = (e) => {
        setNewPhoto(e.target.value);
    };

    return (
        <form >
            <Paper style={{ margin: '1rem', padding: '1rem' }}>
                <Typography variant="h4" style={{ textAlign: 'center' }}>
                    Edit City Data
                </Typography>
                <TextField
                    label="City Name"
                    autoFocus
                    value={newName}
                    style={{ margin: 8 }}
                    fullWidth
                    disabled={savingProgress}
                    margin="normal"
                    required
                    variant="outlined"
                    onChange={setNewNameHandler}
                />
                <TextField
                    label="Photograph URL"
                    disabled={savingProgress}
                    value={newPhoto}
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    multiline
                    required
                    variant="outlined"
                    onChange={setNewPhotoHandler}
                />
                <Divider />
                <Typography variant="h5">Preview</Typography>
                
                <CityTile name={newName} photo={newPhoto} allowEdit={false} />
                <div style={{ textAlign: 'right', marginTop:"5px" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={savingProgress ? <CircularProgress size="20px" color="secondary" /> : <SaveIcon />}
                        onClick={handleLoad}
                    >
                        {savingProgress ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </Paper>
        </form>
    );
}
