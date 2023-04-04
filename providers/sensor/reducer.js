import {
    GET_SENSORS,
    GET_LOADING_SENSOR,
    GET_ERROR_SENSOR,
    POST_SENSORS,
    POST_ERROR_SENSOR,
    POST_SENSOR_RESET
} from "./constant";

const initialTemplate = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    successMsg: null,
    errorMsg: null
};

export const initialState = {
    sensors: [],
    get: { ...initialTemplate },
    post: { ...initialTemplate },
    delete: { ...initialTemplate },
}

export const sensorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOADING_SENSOR: {
            return {
                ...state,
                get: {
                    ...state.get,
                    isLoading: true
                }
            }
        }
        case GET_ERROR_SENSOR: {
            return {
                ...state,
                get: {
                    ...state.get,
                    isLoading: false,
                    isError: true,
                    errorMsg: action.payload
                }
            }
        }
        case GET_SENSORS: {
            return {
                ...state,
                sensors: action.payload.payload,
                get: {
                    ...state.get,
                    isLoading: false,
                    isSuccess: true
                }
            }
        }
        case POST_SENSORS: {
            const payload = action.payload.payload;
            let res = [];
            let flag = false;

            for (let index = 0; index < state.sensors.length; index++) {
                let location = state.sensors[index];
                if (location._id === payload.location._id) {
                    location.sensors.push({
                        sensorId: payload.sensorId,
                        name: payload.name,
                        type: payload.type,
                        _id: payload._id,
                        createdAt: payload.createdAt,
                        updatedAt: payload.updatedAt,
                    })
                    res.push(location);
                    flag = true;
                }
                else {
                    res.push(location);
                }
            }

            if (!flag) {
                res = [
                    {
                        ...payload.location,
                        sensors: [{
                            sensorId: payload.sensorId,
                            name: payload.name,
                            type: payload.type,
                            _id: payload._id,
                            createdAt: payload.createdAt,
                            updatedAt: payload.updatedAt,
                        }]
                    },
                    ...res
                ]
            }

            return {
                ...state,
                sensors: res,
                post: { ...state.post, isLoading: false, isSuccess: true }
            }
        }
        case POST_SENSOR_RESET: {
            return {
                ...state,
                post: { ...initialTemplate }
            }
        }
        case POST_ERROR_SENSOR: {
            return {
                ...state,
                post: {
                    ...state.post,
                    isError: true,
                    errorMsg: action.payload
                }
            }
        }
        default: {
            return state;
        }
    }
}