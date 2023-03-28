import React from 'react';
import CRT from './CRT';
import AnimationController from '../AnimationController/AnimationController';
import Instructions from './Instructions';
import './day10styles.css';

export default function Day10() {

    const [inputData, setInputData] = React.useState<string[]>([]);
    const [isAnimationRunning,setIsAnimationRunning] = React.useState(false);
    const [cycle,setCycle] = React.useState(0);

    React.useEffect(()=>{
        async function getInputData() {
            const response = await fetch('./day10_input.txt');
            const data = await response.text();
            setInputData(data.split("\n"));
        }

        getInputData();
    },[]);

    function addCycle() {
        setTimeout(()=>{
            setCycle(prevCycle=>prevCycle+1)
        },500);
    }

    return (
        <article>
            <header className='sub-header'>Day 10 part 2 visualization</header>
            <AnimationController
                isAnimationRunning={isAnimationRunning}
                setIsAnimationRunning={setIsAnimationRunning}
            />
            <CRT isAnimationRunning={isAnimationRunning}/>
            <Instructions
                instructions={inputData}
                isAnimationRunning={isAnimationRunning}
                cycle={cycle}
                addCycle={addCycle}
            />
        </article>
    )
}