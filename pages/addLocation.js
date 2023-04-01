import { TextField, Button, Grid } from '@mui/material'
import { useState } from 'react'
import Location from '@/components/Location';
import { toast } from 'react-toastify';

const addLocation = () => {
    const [locationText, setLocationText] = useState('');

    const handleClick = () => {
        if (locationText.trim().length === 0) {
            toast.error('Location can not be empty');
            return;
        }
        // Add Location in database
        setLocationText('');
    }

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
