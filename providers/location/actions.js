import {
    GET_ERROR_LOCATION,
    GET_LOCATIONS,
    GET_LOADING_LOCATION,
    POST_LOCATION,
    POST_ERROR_LOCATION
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

export const postErrorLocation = ({ payload }) => ({
    type: POST_ERROR_LOCATION,
    payload
})