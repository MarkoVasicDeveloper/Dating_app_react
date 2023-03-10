import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserProvider ({ children } : any) {
    const [ user, setUser ] = useState({
        id: null,
        username: null,
        token: null,
        role: null,
        conversationRequest: [],
        unreadedMessage: null
    });

    const setUserEvent = (user: any) => setUser(() => user);

    const value = [ user, setUserEvent ] as any;

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    )
}