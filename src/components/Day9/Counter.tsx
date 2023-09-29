import React from 'react'

interface CounterProps {
    counterTitle: string;
    counter: number;
}

export default function Counter({counterTitle,counter}:CounterProps) {
    return (
        <div className='sand-counter-container'>
            <span>{counterTitle}: {counter}</span>
        </div>
    )
}