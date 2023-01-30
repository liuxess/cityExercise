import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getPaginatedCities }    from '../API/Datasources/Cities';
import SearchBar from '../global/SearchBar';
import { CitiesPage }  from './CitiesPage';

export const CitiesPageLoader = () => {
    
    const [cities, setCities] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(15);
    const [totalPages, setTotalPages] = useState(0);
    const [totalSize, setTotalSize] = useState(0);
    const [search, setSearch] = useState("");
    const [loaded, setLoaded] = useState(false);


    const handleDataCallback = (responseData) =>{
        setCities(responseData.content);
        setTotalPages(responseData.totalPages);
        setTotalSize(responseData.totalElements);
        setLoaded(true);
    }

    useEffect(() => {
        getPaginatedCities(page, size, search, handleDataCallback);
    }, [page, size, search])
    
    if(!loaded) {return <div>Loading...</div>}

    return (
        <Paper style={{backgroundColor:"lightgrey", padding:"10px", height:"100%" }}>
            <SearchBar style={{marginBottom:"5px"}} onRequestSearch={setSearch}/>
            <CitiesPage page={page} size={size} search={search} cities={cities}
                totalPages={totalPages} totalSize={totalSize}
                setPage={setPage} setSize={setSize} setSearch={setSearch}
                updateCity={()=>{}} />
        </Paper>
    )
}
