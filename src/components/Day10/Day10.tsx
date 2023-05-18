import React from 'react';
import AnimationController from '../AnimationController/AnimationController';
import CRTdisplay from './CRTdisplay';
import ParametersDisplay from './ParametersDisplay';
import Instructions from './Instructions';
import './day10styles.css';
import CRT from './CRTInterface';
import { nanoid } from 'nanoid';

export default function Day10() {

    const [CRTparameters,setCRTparameters] = React.useState<CRT>(
        {
            X: 1,
            cycle: 0,
            display: Array.from({length:240},pixel => {
                return {id: nanoid(), isOn: false}
            })
        }
    );

    const [inputData, setInputData] = React.useState<string[]>([]);
    const [isAnimationRunning,setIsAnimationRunning] = React.useState(false);

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
            <CRTdisplay
                CRTparameters={CRTparameters}
            />
            <ParametersDisplay
                CRTparameters={CRTparameters}
            />
            <Instructions
                instructions={inputData}
                isAnimationRunning={isAnimationRunning}
                setIsAnimationRunning={setIsAnimationRunning}
                CRTparameters={CRTparameters}
                setCRTparameters={setCRTparameters}
            />
        </article>
    )
}