import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../../logo.svg';
import { Button } from '@mui/material';

Navbar.propTypes = {
    PageName: PropTypes.string,
    currentListElement: PropTypes.string,
    children: PropTypes.any,
};

export default function Navbar({logOut}) {

    const NavbarHeight = '45px';
    return (
        <div>
            <AppBar position="fixed" color={"secondary"}>
                <Toolbar >
                    <img style={{ height: NavbarHeight }} src={logo} className="App-logo" alt="logo" />
                    <Typography
                        component="h1"
                        variant="h6"
                        color="black"
                        noWrap
                        color={"FFFFFF"}
                    >
                        City Library
                    </Typography>
                    <Button color="primary" onClick={logOut} >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
