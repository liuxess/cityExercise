import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkIn, logIn, logOut } from '../API/Datasources/Authentication';
import { ExtractRolesFromAuthorities } from '../redux/reducers/actions/UserRoleActions';
import { CitiesPageLoader } from './cities/CitiesPageLoader';
import LogIn from './login/Login';
import Navbar from './navbar/Navbar';

const PageWrapper = () => {
    const [IsAuthenticated, setAuthenticated] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const checkInCallback = (responseData) =>{
        setLoaded(true);
        if(!responseData){
            return;
        }
        setAuthenticated(!!responseData);
        extractAndAttachRoles(responseData);
    }

    useEffect(() => {
        checkIn(checkInCallback);
    }, []);

    const dispatch = useDispatch();

    const extractAndAttachRoles = (roleData) =>{
        dispatch(ExtractRolesFromAuthorities(roleData));
    }

    const AuthenticateUser = (credentials) => {
        logIn(credentials.username, credentials.password, checkInCallback);
    };
    
    /*************/
    if(loaded)
    return (
        <React.Fragment>
                {IsAuthenticated && (
                    <>
                        <Navbar logOut={()=>{logOut(()=>{setAuthenticated(false)})}}/>
                        <CitiesPageLoader />
                    </>
                )}
                { IsAuthenticated === false && <LogIn setAuthenticated={AuthenticateUser}></LogIn>}
        </React.Fragment>
    );

    else return (<></>)
};


export default PageWrapper;
