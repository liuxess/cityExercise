import { Grid, Paper, Table, TableFooter, TablePagination } from '@mui/material'
import React from 'react'
import { CityTile } from './CityTile'

export const CitiesPage = ({cities, page, setPage, size, setSize, totalSize, updateCity}) => {
    
    
    const handlePaging = (event, number) => {
        setPage(number);
    };

    const handlePageSizing = (event) => {
        setSize(event.target.value);
    };

    return (
        <Paper style={{backgroundColor:"#EFEFEF", margin:"10px", marginTop:"20px", padding: "10px" }}>
            <Grid container spacing={2} > 
                {cities.map(
                    city => 
                        <Grid item xs={6} md={4} lg={2}>
                            <CityTile id={city.id} name={city.name} photo={city.photo}/>
                        </Grid> 
                    )
                }
            </Grid>
            {/** Going with table pagination since I like the control of size and labels more. */}
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
