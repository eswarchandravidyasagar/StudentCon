// App.js
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import AppRouter from './Router';

const App = () => {
    return (
        
            <AuthProvider>
               
                  <AppRouter />
                
            </AuthProvider>
       
    );
};

export default App;
