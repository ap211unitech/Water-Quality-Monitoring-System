import { useReducer } from "react";
import { Provider } from "./context";
import { initialState, locationReducer } from "./reducer";
import axios from 'axios';
import * as A from './actions';

export const LocationProvider = ({ children }) => {

    const [state, dispatch] = useReducer(locationReducer, initialState);

    // Actions
    const onGetLocations = async () => {
        dispatch(A.getLoadingLocation());
        try {
            const allLocations = await axios.get('/api/location');
            dispatch(A.getLocations(allLocations.data))
        } catch (error) {
            dispatch(A.getErrorLocation(error.response.data))
        }
    }

    const onPostLocation = async (locationText) => {
        try {
            const newLocation = await axios.post('/api/location', { locationText });
            dispatch(A.postLocation(newLocation.data))
        } catch (error) {
            dispatch(A.postErrorLocation(error.response.data))
        }
        setTimeout(() => {
            dispatch(A.postLocationReset());
        }, 1000);
    }

    const onDeleteLocation = async (locationId) => {
        try {
            await axios.delete(`/api/location/`, { locationId });
            dispatch(A.deleteLocation({ id: locationId }))
        } catch (error) {
            dispatch(A.deleteErrorLocation(error.response.data))
        }
        setTimeout(() => {
            dispatch(A.deleteLocationReset());
        }, 1000);
    }

    return (
        <Provider
            value={{
                ...state,
                onGetLocations,
                onPostLocation,
                onDeleteLocation
            }}
        >
            {children}
        </Provider>
    )
}