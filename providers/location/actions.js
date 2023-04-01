import { ERROR_LOCATION, GET_LOCATIONS, LOADING_LOCATION } from "./constants";

export const getLocations = (payload) => ({
    type: GET_LOCATIONS,
    payload
});

export const errorLocation = ({payload}) => ({
    type: ERROR_LOCATION,
    payload
})

export const loadingLocation = () => ({
    type: LOADING_LOCATION,
})

