import { useContext } from "react";
import { Context } from "./context";

export const useLocation = () => {
    const state = useContext(Context);

    if (!Context) {
        const error = new Error("Location context is undefined");
        error.name = "ContextError";
        Error?.captureStackTrace?.(error, useContext);
        throw error;
    }

    return { ...state };
}


