import {
    GET_ERROR_LOCATION,
    GET_LOCATIONS,
    GET_LOADING_LOCATION,
    POST_LOCATION,
    POST_ERROR_LOCATION,
    DELETE_LOCATION,
    DELETE_ERROR_LOCATION,
    POST_LOCATION_RESET,
    DELETE_LOCATION_RESET
} from "./constants";

export const getLocations = (payload) => ({
    type: GET_LOCATIONS,
    payload
});

export const getErrorLocation = ({ payload }) => ({
    type: GET_ERROR_LOCATION,
    payload
})

export const getLoadingLocation = () => ({
    type: GET_LOADING_LOCATION,
})


export const postLocation = (payload) => ({
    type: POST_LOCATION,
    payload
});

export const postLocationReset = () => ({
    type: POST_LOCATION_RESET,
});

export const postErrorLocation = ({ payload }) => ({
    type: POST_ERROR_LOCATION,
    payload
})

export const deleteLocation = (payload) => ({
    type: DELETE_LOCATION,
    payload
})

export const deleteErrorLocation = ({ payload }) => ({
    type: DELETE_ERROR_LOCATION,
    payload
})

export const deleteLocationReset = () => ({
    type: DELETE_LOCATION_RESET,
});