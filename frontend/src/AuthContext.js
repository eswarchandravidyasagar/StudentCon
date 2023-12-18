// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        // Here you would typically handle API call for login


        // For now, we'll just set user data
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };


    

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
