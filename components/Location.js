import { useEffect } from 'react'
import { useLocation } from '@/providers/location'
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import moment from 'moment';

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


const Location = () => {

    const { onGetLocations, get: { isLoading, isError, errorMsg }, locations } = useLocation();

    useEffect(() => {
        onGetLocations();
    }, [])

    useEffect(() => {
        if (isError) {
            toast.error(errorMsg);
        }
    }, [isError])

    if (isLoading) {
        return (
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
                    Fetching all locations...
                </div>
            </div>
        )
    }

    if (isError) return <></>;

    return (
        <div style={{ marginTop: '1.8em' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='center'>Id</StyledTableCell>
                            <StyledTableCell align="center">Location</StyledTableCell>
                            <StyledTableCell align="center">Created at</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {locations.map((row, i) => (
                            <StyledTableRow key={i}>
                                <TableCell align='center' component="th" scope="row">{row._id}</TableCell>
                                <TableCell align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">Created at {moment(row.createdAt).format("DD/MM/YYYY")}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Location
