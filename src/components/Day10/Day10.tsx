import React from 'react';
import AnimationController from '../AnimationController/AnimationController';
import CRTdisplay from './CRTdisplay';
import ParametersDisplay from './ParametersDisplay';
import Instructions from './Instructions';
import './day10styles.css';
import AnimationInterface from '../AnimationController/AnimationInterface';
import CRTInterface from './CRTInterface';
import InstructionsInterface from './InstructionsInterface';
import { nanoid } from 'nanoid';
import useFetch from '../../hooks/useFetch';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import PendingDisplay from '../PendingDisplay/PendingDisplay';
import useDay10Solution from './useDay10Solution';

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
    const [instructions, setInstructions] = React.useState<InstructionsInterface>({
        list: [],
        currentInstructionIndex: 0
    });
    const [animation,setAnimation] = React.useState<AnimationInterface>(
        {
            isRunning: false,
            isCompleted: false,
        }
    );
    const {inputData,isPending,isError} = useFetch('./day10_input.txt');

    React.useEffect(()=>{
        const instructions = inputData.split("\n").map(dataItem => {
            return {id: nanoid(), instruction: dataItem}
        });
        setInstructions({list: instructions, currentInstructionIndex: 0});
    },[inputData]);

    useDay10Solution({
        CRT,
        setCRT,
        instructions,
        setInstructions,
        animation,
        setAnimation
    });

    return (
        <article>
            <header className='sub-header'>Day 10 part 2 visualization</header>
            {
                isError ? <ErrorAlert /> : 
                isPending ? <PendingDisplay /> :
                <>
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
                        instructions={instructions}
                    />
                </>
            }
        </article>
    )
}