import React from 'react';
import useFetch from '../../hooks/useFetch';
import AnimationController from '../AnimationController/AnimationController';
import AnimationInterface from '../AnimationController/AnimationInterface';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import PendingDisplay from '../PendingDisplay/PendingDisplay';
// import { REDUCER_ACTION_TYPE } from './day9Types';
import Instructions from './Instructions';
import {InstructionsInterface} from './day9Types';
import {nanoid} from 'nanoid';

export default function Day9() {

    // const [rope,ropeDispach] = React.useReducer(ropeReducer,initialState);
    const [animation, setAnimation] = React.useState<AnimationInterface>(
        {isRunning: false, isCompleted: false}
    );

    const {inputData, isError, isPending} = useFetch('./day9_input.txt');
    // const [instructions,instructionsDispatch] = React.useReducer(instructionsReducer,ropeInitialState);
    const [instructions, setInstructions] = React.useState<InstructionsInterface>([]);
    const [currentInstructionIndex, setCurrentInstructionIndex] = React.useState<Number>(0);

    // instructions = {instruction:[{direction:String, numberOfSteos: number}], currentInstructionIndex: Number}

    React.useEffect(()=>{
        const moves = inputData.split('\n');

        const instructions = moves.map(move => {
            const direction = move[0];
            const steps = move.match(/\d+/);
            if(steps === null) {
                return {id: nanoid(), direction: 'unknown', numberOfSteps: 0}
            };
            return {id: nanoid(), direction, numberOfSteps: parseInt(steps[0])};
        });

        setInstructions(instructions);
    },[inputData]);

    return (
        <article>
            <header className='sub-header'>Day 9 part 2 visualization</header>
            <AnimationController 
                animation={animation}
                setAnimation={setAnimation}
            />
            {
                isError ? <ErrorAlert /> :
                isPending ? <PendingDisplay/> :
                <>
                    <Instructions
                        instructions={instructions}
                        setInstructions={setInstructions}
                        currentInstructionIndex={currentInstructionIndex}
                        setCurrentInstructionIndex={setCurrentInstructionIndex}
                    />
                </>
            }
        </article>
    )
}