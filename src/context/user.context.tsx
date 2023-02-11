import { createContext, useState } from "react";

export const UserContext = createContext([]);

export function UserProvider ({ children } : any) {
    const [ user, setUser ] = useState([]);

    const value = [ user, setUser ] as any;

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    )
}