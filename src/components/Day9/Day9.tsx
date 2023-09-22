import React from 'react';
import useFetch from '../../hooks/useFetch';
import AnimationController from '../AnimationController/AnimationController';
import AnimationInterface from '../AnimationController/AnimationInterface';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import PendingDisplay from '../PendingDisplay/PendingDisplay';
import Instructions from './Instructions';
import {InstructionType, InstructionsInterface, REDUCER_ACTION_TYPE} from './day9Types';
import {nanoid} from 'nanoid';
import Canvas from './Canvas';
import {ropeInitialState, ropeReducer} from './ropeReducer';

export default function Day9() {

    const [rope,ropeDispatch] = React.useReducer(ropeReducer,ropeInitialState);
    const [animation, setAnimation] = React.useState<AnimationInterface>(
        {isRunning: false, isCompleted: false}
    );

    const {inputData, isError, isPending} = useFetch('./day9_input.txt');
    const [instructions, setInstructions] = React.useState<InstructionsInterface>([]);
    const [currentInstructionIndex, setCurrentInstructionIndex] = React.useState<number>(0);

    // trnasform input data into more usefull structure
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

    React.useEffect(()=>{
        function performMove(direction:string):Promise<void> {
            return new Promise<void>((resolve,reject) => {
                setTimeout(()=>{
                    if(direction === 'U') {
                        ropeDispatch({type: REDUCER_ACTION_TYPE.MOVE_UP});
                    }
                    if(direction === 'D') {
                        ropeDispatch({type: REDUCER_ACTION_TYPE.MOVE_DOWN});
                    }
                    if(direction === 'L') {
                        ropeDispatch({type: REDUCER_ACTION_TYPE.MOVE_LEFT});
                    }
                    if(direction === 'R') {
                        ropeDispatch({type: REDUCER_ACTION_TYPE.MOVE_RIGHT});
                    }
                    resolve();
                },1);
            });
        }

        async function readInstruction(instruction:InstructionType) {
            const {direction, numberOfSteps} = instruction;
            for(let i = 0; i < numberOfSteps; i++) {
                await performMove(direction);
            }
            setCurrentInstructionIndex(prevIndex => prevIndex+1);
        }

        if(animation.isRunning && currentInstructionIndex < instructions.length) {
            readInstruction(instructions[currentInstructionIndex]);
        }

        if(instructions.length > 0 && currentInstructionIndex >= instructions.length) {
            setAnimation(prevState => {
                return {...prevState, isRunning: false, isCompleted: true}
            });
        }
    },[currentInstructionIndex, animation.isRunning, animation.isCompleted]);

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
                    <Canvas
                        rope={rope}
                    />
                    <Instructions
                        instructions={instructions}
                        currentInstructionIndex={currentInstructionIndex}
                    />
                </>
            }
        </article>
    )
}