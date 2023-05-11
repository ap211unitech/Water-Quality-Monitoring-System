import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import { sensorTypes } from '@/utils/helper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontSize: 17,
        fontWeight: 'bold'
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function SensorDataTable({ sensorData }) {

    if (sensorData === null) return <></>;

    return (
        <div style={{ marginTop: '1em' }}>
            <h1>Here are the details for newly added sensor...</h1>
            <div
                style={{
                    marginTop: 15
                }}
            >
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Property</StyledTableCell>
                                <StyledTableCell align="center">Detail</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <StyledTableRow>
                                <TableCell align="center">
                                    Sensor Id
                                </TableCell>
                                <TableCell align="center">
                                    <strong>
                                        {sensorData?.sensorId}
                                    </strong>
                                </TableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                                <TableCell align="center">
                                    Sensor Name
                                </TableCell>
                                <TableCell align="center">{sensorData?.name}</TableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                                <TableCell align="center">
                                    Sensor Type
                                </TableCell>
                                <TableCell align="center">
                                    {sensorTypes[sensorData?.type]} Sensor
                                </TableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                                <TableCell align="center">
                                    Sensor Created at
                                </TableCell>
                                <TableCell align="center">
                                    {moment(sensorData?.createdAt).format("DD/MM/YYYY")}
                                </TableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                                <TableCell align="center">
                                    Location
                                </TableCell>
                                <TableCell align="center">
                                    {sensorData?.location?.name}
                                </TableCell>
                            </StyledTableRow>

                            <StyledTableRow>
                                <TableCell align="center">
                                    Location Id
                                </TableCell>
                                <TableCell align="center">
                                    {sensorData?.location?._id}
                                </TableCell>
                            </StyledTableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}