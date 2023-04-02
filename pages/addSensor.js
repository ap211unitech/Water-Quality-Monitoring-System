import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';
import { useLocation } from '@/providers/location';

const addSensor = () => {
    const { onGetLocations, locations } = useLocation();

    useEffect(() => {
        onGetLocations();
    }, [])

    return (
        <div>
            <h1>Add your sensors here...</h1>
            {locations?.length > 0 && LocationSelect(locations)}
        </div>
    )
}

export default addSensor


function LocationSelect(allLocations) {
    return (
        <Autocomplete
            disablePortal
            id="Location-select-filter"
            options={allLocations.map(location => location.name)}
            fullWidth
            style={{ marginTop: '1.6rem' }}
            renderInput={(params) => <TextField {...params} label="Choose Location" />}
        />
    );
}