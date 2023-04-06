import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import { useLocation } from '@/providers/location';
import { useSensor } from '@/providers/sensor';
import { Button, Grid } from '@mui/material';
import { sensorTypes } from '@/utils/helper';
import { toast } from 'react-toastify';
import SensorDataTable from '@/components/SensorDataTable';

const addSensor = () => {
    const { onGetLocations, locations } = useLocation();
    const { onPostSensor, onGetSensors, sensors: sensorsList, post } = useSensor();

    const [locationId, setLocationId] = useState('');
    const [sensorName, setSensorName] = useState('');
    const [sensorType, setSensorType] = useState('');

    useEffect(() => {
        onGetLocations();
        onGetSensors();
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

    const [newlyCreatedSensorData, setNewlyCreatedSensorData] = useState(null);
    const handleSensorAdd = async () => {
        if (!locationId || !(sensorName.trim()) || !sensorType) {
            toast.error('All field must be filled');
            return;
        }
        const createdSensorData = await onPostSensor({ location: locationId, sensorName: sensorName.trim(), type: sensorType });
        if (createdSensorData?.success) {
            setNewlyCreatedSensorData(createdSensorData?.payload);
            setSensorName('');
        }
    }

    useEffect(() => {
        if (post.isError) {
            toast.error(post.errorMsg);
        }
        if (post.isSuccess) {
            toast.success('Sensor added successfully');
        }
    }, [post.isError, post.isSuccess])

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
                        autoComplete='off'
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
                onClick={() => handleSensorAdd()}
            >
                Add sensor
            </Button>
            <SensorDataTable sensorData={newlyCreatedSensorData} />
        </div>
    )
}

export default addSensor
