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

    const { data: tempData } = useSWR(tempSensorID, () => fetcher(tempSensorID));
    const { data: phData } = useSWR(phSensorID, () => fetcher(phSensorID));
    const { data: tdsData } = useSWR(tdsSensorID, () => fetcher(tdsSensorID));

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

    return (
        <div
            style={{
                color: red[400],
                marginTop: 20
            }}
        >
            <h2>{location.name}</h2>
            <Grid container rowSpacing={1} columnSpacing={{ md: 3 }}>
                {location.sensors?.map(sensor => {
                    return (
                        <Grid item xs={4} key={sensor._id}>
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
                                            {sensor.type === 'temp' && tempData?.length && tempData[0]}
                                            {sensor.type === 'ph' && phData?.length && phData[0]}
                                            {sensor.type === 'tds' && tdsData?.length && tdsData[0]}

                                            {' '}{units[sensor.type]}
                                        </span>
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

        </div>
    );
}