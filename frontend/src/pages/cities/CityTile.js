import React, { useState } from 'react'
import { Divider, Paper, Typography, Avatar, Button, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

export const CityTile = ({name, photo, allowEdit, setEdit}) => {

    return (
        <Paper>
            <Typography align="center" variant="h4">
                {name}
                {allowEdit &&
                <IconButton color="primary" onClick={setEdit}>
                     <EditIcon  />
                </IconButton>}
            </Typography>
            <Divider />

            <div  style={{ justifyContent: "center", display: "flex" }}>
                <Avatar align="center" alt={name} src={photo} 
                    sx={{height:120, width:120}} />
            </div>
        </Paper>
    );
}
