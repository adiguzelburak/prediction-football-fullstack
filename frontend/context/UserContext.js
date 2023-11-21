import React, { createContext, useContext, useState } from 'react'

export const users = {
    username: '',
    email: '',
    age: 0,
    favouriteTeam: '',
    _id: '',
    totalPoint: 0,
}

export const UserContext = createContext({
    user: undefined,
    setUser: async (user) => null,
    isAuth: undefined,
    setIsAuth: async (user) => null,
    isPredictioned: undefined,
    setIsPredictioned: async (user) => null,
})

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(users)
    const [isAuth, setIsAuth] = useState(false)
    const [isPredictioned, setIsPredictioned] = useState(false);
    const [isMatchDataChanged, setIsMatchDataChanged] = useState(false);

    return (
        <UserContext.Provider value={{ user, setUser, isAuth, setIsAuth, isPredictioned, setIsPredictioned, isMatchDataChanged, setIsMatchDataChanged }}>
            {children}
        </UserContext.Provider>
    )
}

