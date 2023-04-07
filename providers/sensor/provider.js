import { useReducer } from "react";
import { initialState, sensorReducer } from "./reducer";
import { Provider } from "./context";
import axios from "axios";

import * as A from './actions';

export const SensorProvider = ({ children }) => {
    const [state, dispatch] = useReducer(sensorReducer, initialState);

    // Actions
    const onGetSensors = async () => {
        dispatch(A.getLoadingSensor());
        try {
            const res = await axios.get('/api/sensor');
            dispatch(A.getSensors(res.data));
        } catch (error) {
            dispatch(A.getErrorSensor(error.response.data))
        }
    }

    const onPostSensor = async ({ location, sensorName, type }) => {
        try {
            const res = await axios.post('/api/sensor', { location, sensorName, type });
            dispatch(A.postSensor(res.data));
            return res.data;
        } catch (error) {
            dispatch(A.postErrorSensor(error.response.data))
            return null;
        }
        finally {
            setTimeout(() => {
                dispatch(A.postSensorReset());
            }, 1000);
        }
    }

    const onDeleteSensor = async (sensorId) => {
        try {
            await axios.delete(`/api/sensor/`, { data: { sensorId } });
            dispatch(A.deleteSensor({ id: sensorId }))
        } catch (error) {
            dispatch(A.deleteErrorSensor(error.response.data))
        }
        setTimeout(() => {
            dispatch(A.deleteSensorReset());
        }, 1000);
    }


    return (
        <Provider
            value={{
                ...state,
                onGetSensors,
                onPostSensor,
                onDeleteSensor
            }}
        >
            {children}
        </Provider>
    )

}