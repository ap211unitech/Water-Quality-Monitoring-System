import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import { useLocation } from '@/providers/location';
import { Button, Grid } from '@mui/material';
import { sensorTypes } from '@/utils/helper';

const addSensor = () => {
    const { onGetLocations, locations } = useLocation();
    const [locationId, setLocationId] = useState('');
    const [sensorName, setSensorName] = useState('');
    const [sensorType, setSensorType] = useState('');

    useEffect(() => {
        onGetLocations();
    }, [])

    const handleLocationChange = (loc) => {
        const matchedLocation = locations.find(l => l.name === loc);
        setLocationId(matchedLocation._id);
    }

    const handleSensorTypeChange = (selectedType) => {
        const type = Object.keys(sensorTypes).find(k => {
            if (sensorTypes[k] === selectedType) return k
        });
        setSensorType(type);
    }

    const handleSensorAdd = () => {
        console.log(locationId, sensorName, sensorType)
    }

    return (
        <div>
            <h1>Add your sensors here...</h1>
            {locations &&
                <Autocomplete
                    disablePortal
                    id="Location-select-filter"
                    options={locations.map(l => l.name)}
                    fullWidth
                    style={{ marginTop: '1.6rem' }}
                    onChange={(e, val) => handleLocationChange(val)}
                    renderInput={(params) => <TextField {...params} label="Choose Location" />}
                />
            }
            <Grid container spacing={2} my={1}>
                <Grid item xs={8}>
                    <TextField
                        label="Sensor name"
                        fullWidth
                        value={sensorName}
                        onChange={e => setSensorName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Autocomplete
                        disablePortal
                        id="sensor-type-select-filter"
                        options={Object.values(sensorTypes).map(t => `${t} sensor`)}
                        fullWidth
                        onChange={(e, val) => handleSensorTypeChange(val.split(' ')[0])}
                        renderInput={(params) => <TextField {...params} label="Choose Sensor Type" />}
                    />
                </Grid>
            </Grid>
            <Button
                style={{ marginTop: 15 }}
                variant="contained"
                size='large'
                onClick={handleSensorAdd}
            >
                Add sensor
            </Button>
        </div>
    )
}

export default addSensor
