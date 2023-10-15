import React from 'react';
import { REDUCER_ACTION_TYPE, ReducerAction, InstructionType, InstructionsInterface} from './day9Types';
import AnimationInterface from '../AnimationController/AnimationInterface';

interface useDay9SolutionInterface {
    animation: AnimationInterface,
    setAnimation: React.Dispatch<React.SetStateAction<AnimationInterface>>,
    instructions: InstructionsInterface,
    currentInstructionIndex: number,
    setCurrentInstructionIndex: React.Dispatch<React.SetStateAction<number>>,
    ropeDispatch: React.Dispatch<ReducerAction>;
}

export default function useDay9Solution(
    {animation, setAnimation, instructions, currentInstructionIndex, setCurrentInstructionIndex, ropeDispatch}: useDay9SolutionInterface)
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

}
