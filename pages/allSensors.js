import { useEffect } from "react";
import { useSensor } from "@/providers/sensor"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import { sensorTypes } from "@/utils/helper";
import { CircularProgress } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { toast } from "react-toastify";

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


const allSensors = () => {
    const { onGetSensors, onDeleteSensor, sensors, get: { isLoading }, delete: deleteSensor } = useSensor();

    useEffect(() => {
        onGetSensors();
    }, [])


    useEffect(() => {
        if (deleteSensor.isError) {
            toast.error(deleteSensor.errorMsg);
        }
        if (deleteSensor.isSuccess) {
            toast.success('Sensor deleted');
        }
    }, [deleteSensor.isError, deleteSensor.isSuccess])

    const handleSensorDelete = (sensorId) => {
        onDeleteSensor(sensorId);
    }

    if (isLoading) {
        return (
            <>
                <h1>Here is the list of all sensors...</h1>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginTop: '1.8em'
                }}>
                    <div>
                        <CircularProgress disableShrink />
                    </div>
                    <div>
                        Fetching all sensors...
                    </div>
                </div>
            </>
        )
    }

    return (
        <div>
            <h1>Here is the list of all sensors...</h1>
            <div style={{ marginTop: '1em' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'></StyledTableCell>
                                <StyledTableCell align="center">Location</StyledTableCell>
                                <StyledTableCell align="center">
                                    Sensor Id
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Sensor name
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Sensor type
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Sensor created at
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sensors?.map(row => {
                                return (
                                    row.sensors?.map(s => (
                                        <StyledTableRow key={s._id}>
                                            <TableCell align='center'>
                                                <DeleteForever style={{ color: red[600], fontSize: '2em', cursor: 'pointer' }} onClick={() => handleSensorDelete(s._id)} />
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">
                                                <strong>
                                                    {s.sensorId}
                                                </strong>
                                            </TableCell>
                                            <TableCell align="center">
                                                {sensorTypes[s.type]} sensor
                                            </TableCell>
                                            <TableCell align="center">
                                                {s.name}
                                            </TableCell>
                                            <TableCell align="center">
                                                {moment(s.createdAt).format("DD/MM/YYYY")}
                                            </TableCell>
                                        </StyledTableRow>
                                    ))
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}

export default allSensors
