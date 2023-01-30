import React from 'react'
import { Divider, Paper, Typography, Avatar } from '@mui/material'

export const CityTile = ({id, name, photo, updateCity}) => {
    return (
        <Paper>
            <Typography align="center" variant="h4">{name}</Typography>
            <Divider />

            <div  style={{ justifyContent: "center", display: "flex" }}>
                <Avatar align="center" alt={name} src={photo} 
                    sx={{height:120, width:120, marginLeft:"10px"}} />
            </div>
        </Paper>
    )
}
