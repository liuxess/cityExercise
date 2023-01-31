import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getPaginatedCities, updateCity }    from '../../API/Datasources/Cities';
import { USER_ROLES } from '../../config/enums/UserRoles';
import SearchBar from '../global/SearchBar';
import { CitiesPage }  from './CitiesPage';

export const CitiesPageLoader = () => {
    const userRoles = useSelector(state => state.UserRole);
    const userHasRoleToEdit = userRoles.includes(USER_ROLES.ROLE_ALLOW_EDIT);
    const [cities, setCities] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(15);
    const [totalPages, setTotalPages] = useState(0);
    const [totalSize, setTotalSize] = useState(0);
    const [search, setSearch] = useState("");
    const [loaded, setLoaded] = useState(false);


    const handleDataCallback = (responseData) =>{
        console.log(responseData.totalPages, page)
        if(responseData.totalPages <= page && page !=0){
            setPage(0);
            getPaginatedCities(0, size, search, handleDataCallback);
        }
        setCities(responseData.content);
        setTotalPages(responseData.totalPages);
        setTotalSize(responseData.totalElements);
        setLoaded(true);
    }

    useEffect(() => {
        refreshData()
    }, [page, size, search])

    const refreshData = () =>{
        getPaginatedCities(page, size, search, handleDataCallback);
    }
    

    if(!loaded) {return <div>Loading...</div>}

    return (
        <Paper style={{backgroundColor:"lightgrey", padding:"10px", height:"100%", marginTop:"50px" }}>
            <SearchBar style={{marginBottom:"5px"}} onRequestSearch={setSearch}/>
            <CitiesPage page={page} size={size} search={search} cities={cities}
                totalPages={totalPages} totalSize={totalSize} 
                setPage={setPage} setSize={setSize} setSearch={setSearch}
                allowEdit={userHasRoleToEdit} updateCity={updateCity} triggerRefresh={refreshData} />
        </Paper>
    )
}
