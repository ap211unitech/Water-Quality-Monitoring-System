import {
    GET_SENSORS,
    GET_LOADING_SENSOR,
    GET_ERROR_SENSOR,
    POST_SENSORS,
    POST_ERROR_SENSOR,
    POST_SENSOR_RESET,
    DELETE_SENSOR,
    DELETE_ERROR_SENSOR,
    DELETE_SENSOR_RESET
} from "./constant";

export const getSensors = (payload) => ({
    type: GET_SENSORS,
    payload
});

export const getErrorSensor = ({ payload }) => ({
    type: GET_ERROR_SENSOR,
    payload
})

export const getLoadingSensor = () => ({
    type: GET_LOADING_SENSOR,
})

export const postSensor = (payload) => ({
    type: POST_SENSORS,
    payload
});

export const postSensorReset = () => ({
    type: POST_SENSOR_RESET,
});

export const postErrorSensor = ({ payload }) => ({
    type: POST_ERROR_SENSOR,
    payload
})

export const deleteSensor = (payload) => ({
    type: DELETE_SENSOR,
    payload
})

export const deleteErrorSensor = ({ payload }) => ({
    type: DELETE_ERROR_SENSOR,
    payload
})

export const deleteSensorReset = () => ({
    type: DELETE_SENSOR_RESET,
});