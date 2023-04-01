import { TextField, Button, Grid } from '@mui/material'
import { useState } from 'react'

const addLocation = () => {
    const [locationText, setLocationText] = useState('');

    const handleClick = () => {
        // Add Location in database
        setLocationText('');
    }

    return (
        <Grid container spacing={2} alignItems={'center'}>
            <Grid item md={8}>
                <TextField
                    id="outlined-basic"
                    label="Location"
                    variant="outlined"
                    fullWidth
                    value={locationText}
                    onChange={e => setLocationText(e.target.value)}
                />
            </Grid>
            <Grid item md={2}>
                <Button variant="contained" size='large' fullWidth onClick={handleClick} >Add Location</Button>
            </Grid>
        </Grid>
    )
}

export default addLocation
