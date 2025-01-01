// AppContext.js
import React, { createContext, useState } from 'react';

// Tạo AppContext
export const AppContext = createContext();

// AppProvider
export const AppProvider = ({ children }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Hàm cập nhật email và password
    const updateEmail = (newEmail) => setEmail(newEmail);
    const updatePassword = (newPassword) => setPassword(newPassword);

    return (
        <AppContext.Provider value={{ email, password, updateEmail, updatePassword }}>
            {children}
        </AppContext.Provider>
    );
};
