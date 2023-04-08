import { red } from "@mui/material/colors";
import Grid from '@mui/material/Grid';
import { sensorTypes } from "@/utils/helper";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from "moment";

export default function DashboardData({ location }) {
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
                                            {10}℃
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