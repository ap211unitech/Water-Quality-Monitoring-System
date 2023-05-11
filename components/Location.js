import { useEffect, useState } from 'react'
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
import { DeleteForever } from '@mui/icons-material'
import { red } from '@mui/material/colors';
import ConfirmDialog from './ConfirmDialog'

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

    const { onGetLocations, get: { isLoading, isError, errorMsg }, locations, onDeleteLocation, delete: deleteLocation } = useLocation();

    useEffect(() => {
        onGetLocations();
    }, [])

    useEffect(() => {
        if (isError) {
            toast.error(errorMsg);
        }
    }, [isError])

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
    const handleDelete = (id) => {
        onDeleteLocation(id);
        setConfirmDialog(prev => ({
            ...prev,
            isOpen: false
        }))
    }

    useEffect(() => {
        if (deleteLocation.isError) {
            toast.error(deleteLocation.errorMsg);
        }
        if (deleteLocation.isSuccess) {
            toast.success('Location deleted');
        }
    }, [deleteLocation.isError, deleteLocation.isSuccess])

    const [screenSize, setScreenSize] = useState();

    const getCurrentDimension = () => {
        return {
            width: window?.innerWidth,
            height: window?.innerHeight
        }
    }

    useEffect(() => {
        setScreenSize(getCurrentDimension());
    }, [])

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
        <>
            {
                locations?.length > 0 &&
                <div style={{ marginTop: '1.8em' }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align='center'></StyledTableCell>
                                    <StyledTableCell align='center'>Id</StyledTableCell>
                                    <StyledTableCell align="center">Location</StyledTableCell>
                                    {screenSize?.width >= 600 && <StyledTableCell align="center">Created at</StyledTableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {locations.map((row, i) => (
                                    <StyledTableRow key={i}>
                                        <TableCell align='center'>
                                            <DeleteForever
                                                style={{
                                                    color: red[600],
                                                    fontSize: '2em',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this location ?',
                                                        subTitle: "All sensors on this location would also get deleted. You can't undo this operation.",
                                                        onConfirm: () => { handleDelete(row._id) }
                                                    })
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align='center' component="th" scope="row">{row._id}</TableCell>
                                        <TableCell align="center">
                                            {row.name}
                                        </TableCell>
                                        {screenSize?.width >= 600 && <TableCell align="center">Created at {moment(row.createdAt).format("DD/MM/YYYY")}</TableCell>}
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div >
            }
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
        </>
    )
}

export default Location
