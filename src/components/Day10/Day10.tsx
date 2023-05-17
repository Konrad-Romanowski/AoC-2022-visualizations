import React from 'react';
import AnimationController from '../AnimationController/AnimationController';
import CRTdisplay from './CRTdisplay';
import ParametersDisplay from './ParametersDisplay';
import Instructions from './Instructions';
import './day10styles.css';

export default function Day10() {

    interface CRTparameters {
        X: number;
        cycle: number;
        display: boolean[];
    }

    const [CRT,setCRT] = React.useState<CRTparameters>(
        {
            X: 1,
            cycle: 0,
            display: Array.from({length:240},pixel => false)
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
                CRT={CRT}
            />
            <ParametersDisplay
                CRT={CRT}
            />
            <Instructions
                instructions={inputData}
                isAnimationRunning={isAnimationRunning}
                setIsAnimationRunning={setIsAnimationRunning}
                // cycle={cycle}
                // setCycle={setCycle}
                // Xregister={Xregister}
                // setXregister={setXregister}
                // setPixels={setPixels}
                CRT={CRT}
                setCRT={setCRT}
            />
        </article>
    )
}