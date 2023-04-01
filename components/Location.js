import { useEffect } from 'react'
import { useLocation } from '@/providers/location'
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

const Location = () => {

    const { onGetLocations, isError, isLoading, errorMsg, locations } = useLocation();

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
        <div>
            List of all locations.........
        </div>
    )
}

export default Location
