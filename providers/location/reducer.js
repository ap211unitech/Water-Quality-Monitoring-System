import { GET_LOCATIONS, GET_LOADING_LOCATION, GET_ERROR_LOCATION, POST_LOCATION, POST_ERROR_LOCATION } from './constants'

const initialTemplate = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    successMsg: null,
    errorMsg: null
};

export const initialState = {
    locations: [],
    get: { ...initialTemplate },
    post: { ...initialTemplate }
}

export const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOADING_LOCATION: {
            return {
                ...state,
                get: {
                    ...state.get,
                    isLoading: true
                }
            }
        }
        case GET_ERROR_LOCATION: {
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
        case GET_LOCATIONS: {
            return {
                ...state,
                locations: action.payload.payload,
                get: {
                    ...state.get,
                    isLoading: false,
                    isSuccess: true
                }
            }
        }
        case POST_LOCATION: {
            return {
                ...state,
                post: {
                    ...state.post,
                    isLoading: false,
                    isSuccess: true,
                },
                locations: [action.payload.payload, ...state.locations]
            }
        }
        case POST_ERROR_LOCATION: {
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