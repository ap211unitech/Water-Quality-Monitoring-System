import { GET_LOCATIONS, LOADING_LOCATION, ERROR_LOCATION } from './constants'

export const initialState = {
    locations: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    successMsg: null,
    errorMsg: null
}

export const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_LOCATION: {
            return { ...state, isLoading: true }
        }
        case ERROR_LOCATION: {
            return { ...state, isLoading: false, isError: true, errorMsg: action.payload }
        }
        case GET_LOCATIONS: {
            return { ...state, locations: action.payload, isLoading: false, isSuccess: true }
        }
        default: {
            return state;
            break;
        }
    }
}