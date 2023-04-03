import { createContext } from "react";
import { initialState } from './reducer';

export const Context = createContext({ ...initialState });

export const Provider = ({ value, children }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
};