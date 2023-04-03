import { LocationProvider } from './location';
import { SensorProvider } from './sensor';

export const GlobalState = ({ children }) => {
    return (
        <LocationProvider>
            <SensorProvider>
                {children}
            </SensorProvider>
        </LocationProvider>
    )
}