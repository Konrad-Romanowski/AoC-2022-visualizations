import React from 'react';
import {Routes, Route, NavLink} from 'react-router-dom';

export default function App () {
    return (
        <main>
            <header className='main-header'>AoC 2022 visualizations</header>
            <nav>
                <NavLink to="/Day10" className="nav-item">Day10</NavLink>
                <NavLink to="/Day17" className="nav-item">Day17</NavLink>
            </nav>
            <Routes>
                <Route path="/" element={<p>This is main route</p>} />
                <Route path="/Day10" element={<p>This is Day10</p>} />
                <Route path="/Day17" element={<p>This is Day17</p>} />
            </Routes>
        </main>
    )
}