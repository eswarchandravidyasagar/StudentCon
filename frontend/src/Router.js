
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/register';

function AppRouter() {
    return (
        <Router>
            <Header />
               <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/about" element={<h1>About</h1>} />
                <Route path="/contact" element={<h1>Contact</h1>} />
                <Route path="*" element={<h1>Not Found</h1>} />
                <Route path="/signup" element={<Register />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default AppRouter;
