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
            {locations?.length > 0 &&
                <Autocomplete
                    disablePortal
                    id="Location-select-filter"
                    options={locations.map(l => l.name)}
                    fullWidth
                    style={{ marginTop: '1.6rem' }}
                    renderInput={(params) => <TextField {...params} label="Choose Location" />}
                />
            }
        </div>
    )
}

export default addSensor
