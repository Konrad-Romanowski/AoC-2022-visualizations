import React from 'react';
import CRT from './CRT';
import Instructions from './Instructions';
import './day10styles.css';

export default function Day10() {

    const [inputData, setInputData] = React.useState<string[]>([])

    React.useEffect(()=>{
        async function getInputData() {
            const response = await fetch('./day10_input.txt');
            const data = await response.text();
            setInputData(data.split("\n"));
        }

        getInputData();
    },[])

    return (
        <article>
            <h2>Day 10 part 2 visualization</h2>
            <CRT />
            <Instructions instructions={inputData} />
        </article>
    )
}