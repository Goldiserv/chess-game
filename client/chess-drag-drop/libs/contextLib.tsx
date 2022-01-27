import { useContext, createContext } from "react";

export const AppContext = createContext(null as any);

export function useAppContext() {
    return useContext(AppContext);
}