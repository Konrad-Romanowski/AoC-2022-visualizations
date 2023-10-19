import React from 'react';
import {REDUCER_ACTION_TYPE, ReducerAction, InstructionType} from './day9Types';
import InstructionsInterface from './InstructionsInterface';
import AnimationInterface from '../AnimationController/AnimationInterface';

interface useDay9SolutionInterface {
    animation: AnimationInterface,
    setAnimation: React.Dispatch<React.SetStateAction<AnimationInterface>>,
    instructions: InstructionsInterface,
    setInstructions: React.Dispatch<React.SetStateAction<InstructionsInterface>>,
    ropeDispatch: React.Dispatch<ReducerAction>;
}

export default function useDay9Solution(
    {animation, setAnimation, instructions, setInstructions, ropeDispatch}: useDay9SolutionInterface)
{

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
                    ropeDispatch({type: REDUCER_ACTION_TYPE.UPDATE_TAIL});
                    ropeDispatch({type: REDUCER_ACTION_TYPE.UPDATE_VISITED_CELLS});
                    resolve();
                },50);
            });
        }

        async function readInstruction(instruction:InstructionType) {
            const {direction, numberOfSteps} = instruction;
            for(let i = 0; i < numberOfSteps; i++) {
                await performMove(direction);
            }
            setInstructions(prevIndex => {
                return {...prevIndex, currentInstructionIndex: prevIndex.currentInstructionIndex+1}
            });
        }

        if(animation.isRunning && instructions.currentInstructionIndex < instructions.list.length) {
            readInstruction(instructions.list[instructions.currentInstructionIndex]);
        }

        if(instructions.list.length > 0 && instructions.currentInstructionIndex >= instructions.list.length) {
            setAnimation(prevState => {
                return {...prevState, isRunning: false, isCompleted: true}
            });
        }
    },[instructions.currentInstructionIndex, animation.isRunning, animation.isCompleted]);

}
