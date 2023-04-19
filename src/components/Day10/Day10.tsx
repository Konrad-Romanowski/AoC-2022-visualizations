import React from 'react';
import CRT from './CRT';
import AnimationController from '../AnimationController/AnimationController';
import Instructions from './Instructions';
import './day10styles.css';

export default function Day10() {

    const [inputData, setInputData] = React.useState<string[]>([]);
    const [isAnimationRunning,setIsAnimationRunning] = React.useState(false);
    const [Xregister,setXregister] = React.useState(0);
    const [cycle,setCycle] = React.useState(0);
    const [pixels, setPixels] = React.useState(()=>{
        return Array.from({length:240},pixel => false)
    });

    React.useEffect(()=>{
        async function getInputData() {
            const response = await fetch('./day10_input.txt');
            const data = await response.text();
            setInputData(data.split("\n"));
        }

        getInputData();
    },[]);

    return (
        <article>
            <header className='sub-header'>Day 10 part 2 visualization</header>
            <AnimationController
                isAnimationRunning={isAnimationRunning}
                setIsAnimationRunning={setIsAnimationRunning}
            />
            <CRT
                cycle={cycle}
                Xregister={Xregister}
                isAnimationRunning={isAnimationRunning}
                pixels={pixels}
            />
            <Instructions
                instructions={inputData}
                isAnimationRunning={isAnimationRunning}
                setIsAnimationRunning={setIsAnimationRunning}
                cycle={cycle}
                setCycle={setCycle}
                Xregister={Xregister}
                setXregister={setXregister}
                pixels={pixels}
                setPixels={setPixels}
            />
        </article>
    )
}