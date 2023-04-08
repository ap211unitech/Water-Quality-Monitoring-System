import { useSensor } from "@/providers/sensor";
import ShowSensorInformation from "../components/DashboardData";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

const Dashboard = () => {

    const { sensors, onGetSensors, get: { isLoading, isError } } = useSensor();

    useEffect(() => {
        onGetSensors();
    }, [])

    if (isLoading) {
        return (
            <>
                <h1>Dashboard</h1>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginTop: '1.8em'
                }}>
                    <div>
                        <CircularProgress disableShrink />
                    </div>
                    <div>
                        Fetching all sensors and thier realtime data...
                    </div>
                </div>
            </>
        )
    }

    if (isError) return <></>;

    return (
        <div>
            <h1>Dashboard</h1>
            {sensors.map(location => <ShowSensorInformation key={location._id} location={location} />)}
        </div>
    )
}

export default Dashboard
