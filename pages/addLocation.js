import { TextField, Button, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import Location from '@/components/Location';
import { toast } from 'react-toastify';
import { useLocation } from '@/providers/location';

const addLocation = () => {
    const [locationText, setLocationText] = useState('');
    const { onPostLocation, post: { isSuccess, isError, errorMsg } } = useLocation();

    const handleClick = () => {
        if (locationText.trim().length === 0) {
            toast.error('Location can not be empty');
            return;
        }
        onPostLocation(locationText);
        setLocationText('');
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('Location added');
        }
        if (isError) {
            toast.error(errorMsg);
        }
    }, [isSuccess, isError])

    return (
        <>
            <TextField
                id="outlined-basic"
                label="Location"
                variant="outlined"
                fullWidth
                value={locationText}
                onChange={e => setLocationText(e.target.value)}
            />
            <Button
                variant="contained"
                size='large'
                onClick={handleClick}
                style={{ marginTop: 10 }}
            >
                Add Location
            </Button>
            {/* List of all locations */}
            <Location />
        </>
    )
}

export default addLocation
