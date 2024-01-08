import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import fileUpload from "../Photos/fileUpload.svg"
import AdminFileAttach from '../Photos/AdminIcons/AdminFileAttach.svg'

function createData(name, calories, fat, carbs, subject, date, fileAttach) {
    return { name, calories, fat, carbs, subject, date, fileAttach };
}

const rows = [
    createData("#1123", "Flag Comment", 5321, "20/02/2023", "There has been", "Active"),
    createData('#1124', "Payment Issue", 3401, "20/02/2023", "There has been", "Closed"),
    createData('#1124', "Payment Issue", 3401, "20/02/2023", "There has been", "In Process"),
];

export default function BasicTable() {
    return (
        <TableContainer component={Paper} sx={{ boxShadow: 'none', }}>
            <Table sx={{ minWidth: 650, boxShadow: 'none' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Ticket no.</TableCell>
                        <TableCell align="center">Ticket Type</TableCell>
                        <TableCell align="center">CAN Id</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Subject</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Files attached</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row,index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell style={{fontWeight: '600'}} component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.calories}</TableCell>
                            <TableCell align="center">{row.fat}</TableCell>
                            <TableCell align="center">{row.carbs}</TableCell>
                            <TableCell align="center">{row.subject}</TableCell>
                            <TableCell align="center">{row.date}</TableCell>
                            <TableCell align="center" className='flex justify-center' style={{ display: 'flex', justifyContent: 'center' }} >

                                <div className=' m-2 fileSection cursor-point '>
                                    <img src={fileUpload} alt="" />
                                </div>

                            </TableCell>
                            {/* <TableCell align="center">{row.protein}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
