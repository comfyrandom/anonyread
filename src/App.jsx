import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import ReadPost from './components/ReadPost';
import Navbar from './components/Navbar'; // Import the Navbar

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<CreatePost />} />
                <Route path="/read/:id" element={<ReadPost />} />
            </Routes>
        </HashRouter>
    );
}

export default App;