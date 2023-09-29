import './counterStyles.css';

interface CounterProps {
    counterTitle: string;
    counter: number;
}

export default function Counter({counterTitle,counter}:CounterProps) {
    return (
        <div className='counter-container'>
            <span>{counterTitle}: {counter}</span>
        </div>
    )
}