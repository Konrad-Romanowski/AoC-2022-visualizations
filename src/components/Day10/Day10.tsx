import React from 'react';
import AnimationController from '../AnimationController/AnimationController';
import CRTdisplay from './CRTdisplay';
import ParametersDisplay from './ParametersDisplay';
import Instructions from './Instructions';
import './day10styles.css';
import CRTInterface from './CRTInterface';
import AnimationInterface from '../AnimationController/AnimationInterface';
import { nanoid } from 'nanoid';

export default function Day10() {

    const [CRT,setCRT] = React.useState<CRTInterface>(
        {
            X: 1,
            cycle: 0,
            display: Array.from({length:240},pixel => {
                return {id: nanoid(), isOn: false}
            })
        }
    );

    const [inputData, setInputData] = React.useState<string[]>([]);
    const [animation,setAnimation] = React.useState<AnimationInterface>(
        {
            isRunning: false,
            isCompleted: false,
        }
    )

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
                animation={animation}
                setAnimation={setAnimation}
            />
            <CRTdisplay
                CRT={CRT}
            />
            <ParametersDisplay
                CRT={CRT}
            />
            <Instructions
                instructions={inputData}
                animation={animation}
                setAnimation={setAnimation}
                CRT={CRT}
                setCRT={setCRT}
            />
        </article>
    )
}