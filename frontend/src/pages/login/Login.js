import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';  

export default function LogIn(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const setAuthenticated = props.setAuthenticated;
    document.body.style = 'background: linear-gradient(to right, #f64f29, #FEA880, #a0e5bc, #59F3E5, #01e2e9);';

    const LoggingInSuccessfully = () => {
        setAuthenticated({
            username: username,
            password: document.getElementById('password').value,
        });
    };
    
    return (
        <div>
            <Container component="main" maxWidth="sm" >
                <div style={{marginTop:"100px"}}>
                    <Typography component="div" variant="h2" align="center">
                        City Library
                    </Typography>
                    <form noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth   
                            id="Username"
                            label="Username"
                            name="Username"
                            autoComplete="Username"
                            autoFocus
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <Button
                            style={{marginBottom: "5px"}}
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={LoggingInSuccessfully}
                        >
                            Log in
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    );
}
