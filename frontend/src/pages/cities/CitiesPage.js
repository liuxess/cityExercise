import { Grid, Modal, Paper, Table, TableFooter, TablePagination } from '@mui/material'
import React, { useState } from 'react'
import { CityTile } from './CityTile'
import { CityDataModal } from './CityDataModal'

export const CitiesPage = ({cities, page, setPage, size, setSize, totalSize, allowEdit, updateCity, triggerRefresh}) => {
    const [editableCity, setEditableCity] = useState();

    
    const handlePaging = (event, number) => {
        setPage(number);
    };

    const handlePageSizing = (event) => {
        setSize(event.target.value);
    };

    const closeAndRefresh = () =>{
        setEditableCity(undefined);
        triggerRefresh();
    }

    return (
        <Paper style={{backgroundColor:"#EFEFEF", margin:"10px", marginTop:"20px", padding: "10px" }}>
            <Modal open={!!editableCity} onClose={closeAndRefresh} style={{display:'flex',alignItems:'center',justifyContent:'center', marginBottom:"15%"}}>
                <CityDataModal city={editableCity} updateCity={updateCity} closeModal={closeAndRefresh}/>
            </Modal>
            <Grid container spacing={2} > 
                {cities.map(
                    city => 
                        <Grid key={city.id} item xs={6} md={4} lg={2}>
                            <CityTile name={city.name} photo={city.photo} allowEdit={allowEdit}
                                setEdit={()=>{setEditableCity(city)}}
                            />
                        </Grid> 
                    )
                }
            </Grid>
            {/** Going with table pagination since I prefer the control of size and labels more */}
            <Table> 
                <TableFooter>
                    <TablePagination 
                        labelRowsPerPage="Items per Page: "
                        rowsPerPageOptions={[5, 10, 15, 20, 25]}
                        count={totalSize}
                        rowsPerPage={size}
                        page={page}
                        onPageChange={handlePaging}
                        onRowsPerPageChange={handlePageSizing}
                    />
                </TableFooter>
            </Table>
        </Paper>
    )
}
