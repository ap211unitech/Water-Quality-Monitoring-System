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
        onPostLocation(locationText.trim());
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
            <h1>Add a location here...</h1>
            <TextField
                id="outlined-basic"
                label="Location"
                variant="outlined"
                fullWidth
                value={locationText}
                autoComplete='off'
                style={{ marginTop: '1rem' }}
                onChange={e => setLocationText(e.target.value)}
            />
            <Button
                variant="contained"
                size='large'
                onClick={handleClick}
                style={{ marginTop: 15 }}
            >
                Add Location
            </Button>
            {/* List of all locations */}
            <Location />
        </>
    )
}

export default addLocation
