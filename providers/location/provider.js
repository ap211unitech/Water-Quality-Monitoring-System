import { useReducer } from "react";
import { Provider } from "./context";
import { initialState, locationReducer } from "./reducer";
import axios from 'axios';
import * as A from './actions';

export const LocationProvider = ({ children }) => {

    const [state, dispatch] = useReducer(locationReducer, initialState);

    // Actions
    const onGetLocations = async () => {
        dispatch(A.loadingLocation());
        try {
            const allLocations = await axios.get('/api/location');
            dispatch(A.getLocations(allLocations.data))
        } catch (error) {
            dispatch(A.errorLocation(error.response.data))
        }
    }

    return (
        <Provider
            value={{
                ...state,
                onGetLocations
            }}
        >
            {children}
        </Provider>
    )
}