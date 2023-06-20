import React from 'react'

interface SandCounterProps {
    sandCounter: number;
}

export default function SandCounter({sandCounter}:SandCounterProps) {
    return (
        <div className='sand-counter-container'>
            <span>Sand grains: {sandCounter}</span>
        </div>
    )
}
