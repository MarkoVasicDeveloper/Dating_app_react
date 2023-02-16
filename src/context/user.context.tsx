import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserProvider ({ children } : any) {
    const [ user, setUser ] = useState({
        id: null,
        username: null,
        token: null,
        role: null
    });

    const value = [ user, setUser ] as any;

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    )
}