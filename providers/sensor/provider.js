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
        } catch (error) {
            dispatch(A.postErrorSensor(error.response.data))
        }
        setTimeout(() => {
            dispatch(A.postSensorReset());
        }, 1000);
    }


    return (
        <Provider
            value={{
                ...state,
                onGetSensors,
                onPostSensor
            }}
        >
            {children}
        </Provider>
    )

}