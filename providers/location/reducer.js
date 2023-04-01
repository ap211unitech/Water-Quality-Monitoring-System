import { GET_LOCATIONS, GET_LOADING_LOCATION, GET_ERROR_LOCATION, POST_LOCATION, POST_ERROR_LOCATION, DELETE_ERROR_LOCATION, DELETE_LOCATION, POST_LOCATION_RESET, DELETE_LOCATION_RESET } from './constants'

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
    post: { ...initialTemplate },
    delete: { ...initialTemplate },
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
        case POST_LOCATION_RESET: {
            return {
                ...state,
                post: { ...initialTemplate }
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
        case DELETE_LOCATION: {
            return {
                ...state,
                delete: {
                    ...state.delete,
                    isLoading: false,
                    isSuccess: true,
                },
                locations: state.locations.filter(location => location._id.toString() !== action.payload.id)
            }
        }
        case DELETE_ERROR_LOCATION: {
            return {
                ...state,
                delete: {
                    ...state.delete,
                    isError: true,
                    errorMsg: action.payload
                }
            }
        }
        case DELETE_LOCATION_RESET: {
            return {
                ...state,
                delete: { ...initialTemplate }
            }
        }
        default: {
            return state;
        }
    }
}