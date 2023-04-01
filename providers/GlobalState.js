
import { LocationProvider } from './location'

export const GlobalState = ({ children }) => {
    return (
        <LocationProvider>
            {children}
        </LocationProvider>
    )
}