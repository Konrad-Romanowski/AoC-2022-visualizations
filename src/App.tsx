import React from 'react';
import {Routes, Route, NavLink} from 'react-router-dom';
import Day10 from './components/Day10/Day10';
import Day14 from './components/Day14/Day14';

export default function App () {
    return (
        <main>
            <header className='main-header'>AoC 2022 visualizations</header>
            <nav>
                <NavLink to="/Day10" className="nav-item">Day10</NavLink>
                <NavLink to="/Day14" className="nav-item">Day14</NavLink>
            </nav>
            <Routes>
                <Route path="/" element={<p>This is main route</p>} />
                <Route path="/Day10" element={<Day10 />} />
                <Route path="/Day14" element={<Day14 />} />
            </Routes>
        </main>
    )
}