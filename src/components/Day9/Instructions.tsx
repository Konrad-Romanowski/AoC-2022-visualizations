import React from 'react';
import {InstructionType, InstructionsInterface, REDUCER_ACTION_TYPE, ReducerAction} from './day9Types';
import AnimationInterface from '../AnimationController/AnimationInterface';
import './day9styles.css';

interface InstructionsProps {
    instructions: InstructionsInterface,
    setInstructions:  React.Dispatch<React.SetStateAction<InstructionsInterface>>,
    currentInstructionIndex: number,
    setCurrentInstructionIndex: React.Dispatch<React.SetStateAction<number>>;
    animation: AnimationInterface;
    setAnimation: React.Dispatch<React.SetStateAction<AnimationInterface>>;
    ropeDispatch:  React.Dispatch<ReducerAction>;
}

export default function Instructions(
    {instructions, setInstructions, currentInstructionIndex, setCurrentInstructionIndex, animation, setAnimation, ropeDispatch}:InstructionsProps)
{

    // adjust timeout duration
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
                },10);
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

        if(currentInstructionIndex >= instructions.length) {
            setAnimation(prevState => {
                return {...prevState, isRunning: false, isCompleted: true}
            });
        }


    },[currentInstructionIndex,animation.isRunning, animation.isCompleted]);

    const highlightedStyle = {
        backgroundColor: "var(--main-theme-color)",
        color: "#ffffff",
        borderRadius: "1rem"
    }

    const instructionsElements = instructions.map((instruction,index) => 
        <li key={instruction.id} style={index === currentInstructionIndex ? highlightedStyle : {}}>{instruction.direction}{instruction.numberOfSteps.toString()}</li>)

    return (
        <ul className='day9-instructions'>
            {instructionsElements}
        </ul>
    )
}