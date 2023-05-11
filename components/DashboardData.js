import { red } from "@mui/material/colors";
import Grid from '@mui/material/Grid';
import { sensorTypes, units } from "@/utils/helper";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from "moment";
import useSWR from "swr";
import { useEffect, useState } from "react";
import axios from "axios";
import Chart from './Chart'
import { checkWaterQuality } from "@/utils/checkWaterQuality";

const fetcher = async (sensorId) => {
    const res = await axios.post('/api/livedata', { sensorId });
    return res.data.payload;
}

export default function DashboardData({ location }) {

    // Client Side Data fetching of sensors live data
    // Fetch last 10 values of each sensor
    // As number of sensors in an location must be less that equal to 3,
    // So doing this is quite feasible
    // Will use SWR so that we can get realtime data without any extra effort

    const [tempSensorID, setTempSensorID] = useState(null);
    const [phSensorID, setPhSensorID] = useState(null);
    const [tdsSensorID, setTDSSensorID] = useState(null);

    const { data: tempData } = useSWR(tempSensorID, () => fetcher(tempSensorID), { refreshInterval: 10000 });
    const { data: phData } = useSWR(phSensorID, () => fetcher(phSensorID), { refreshInterval: 10000 });
    const { data: tdsData } = useSWR(tdsSensorID, () => fetcher(tdsSensorID), { refreshInterval: 10000 });

    useEffect(() => {
        location?.sensors?.forEach(s => {
            if (s.type === 'temp') {
                setTempSensorID(s.sensorId);
            }
            else if (s.type === 'ph') {
                setPhSensorID(s.sensorId);
            }
            else if (s.type === 'tds') {
                setTDSSensorID(s.sensorId);
            }
        })
    }, [])

    // Put all selected sensor data in this state and pass it to Chart Component
    const [selectedSensor, setSelectedSensor] = useState(null);
    const handleValueClick = (selectedSensorType) => {
        if (selectedSensorType === 'temp') {
            setSelectedSensor({
                type: selectedSensorType,
                data: tempData,
                location: location.name
            });
        }
        else if (selectedSensorType === 'ph') {
            setSelectedSensor({
                type: selectedSensorType,
                data: phData,
                location: location.name
            });
        }
        else if (selectedSensorType === 'tds') {
            setSelectedSensor({
                type: selectedSensorType,
                data: tdsData,
                location: location.name
            });
        }
    }

    // If any of data array ChangeCircleSharp, update chart accordingly
    useEffect(() => {
        if (selectedSensor?.type === 'temp') {
            setSelectedSensor(prev => ({
                ...prev,
                data: tempData,
            }));
        }
        else if (selectedSensor?.type === 'ph') {
            setSelectedSensor(prev => ({
                ...prev,
                data: phData
            }));
        }
        else if (selectedSensor?.type === 'tds') {
            setSelectedSensor(prev => ({
                ...prev,
                data: tdsData
            }));
        }
    }, [tempData, phData, tdsData])

    return (
        <div
            style={{
                color: red[400],
                marginTop: 20
            }}
        >
            <h2>{location.name}</h2>
            <Typography variant="h6" fontSize={18} mt={1} color={"black"}>
                {
                    checkWaterQuality({
                        tds: tdsData?.liveData?.length && tdsData['liveData'][0],
                        temp: tempData?.liveData?.length && tempData['liveData'][0],
                        ph: phData?.liveData?.length && phData['liveData'][0]
                    })
                }
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={{ md: 3 }}>
                {location.sensors?.map(sensor => {
                    return (
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={4} key={sensor._id}>
                            <Card sx={{ maxWidth: 600, boxShadow: 2, my: 2 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        {sensor.name}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {sensor.sensorId}
                                    </Typography>
                                    <Typography variant="body1">
                                        Sensor is created on {moment(sensor.createdAt).format("DD/MM/YYYY")} and this is a {sensorTypes[sensor.type]} sensor.
                                        <br />
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="medium"
                                        style={{
                                            fontSize: 15,
                                            marginTop: -10
                                        }}
                                        onClick={() => handleValueClick(sensor.type)}
                                    >
                                        <strong>
                                            Latest Value :
                                        </strong>
                                        <span
                                            style={{
                                                color: 'black',
                                                marginLeft: 8
                                            }}
                                        >
                                            {sensor.type === 'temp' && tempData?.liveData?.length && tempData['liveData'][0]}
                                            {sensor.type === 'ph' && phData?.liveData?.length && phData['liveData'][0]}
                                            {sensor.type === 'tds' && tdsData?.liveData?.length && tdsData['liveData'][0]}

                                            {' '}{units[sensor.type]}
                                        </span>
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            {selectedSensor && <Chart chartData={selectedSensor} />}

        </div>
    );
}