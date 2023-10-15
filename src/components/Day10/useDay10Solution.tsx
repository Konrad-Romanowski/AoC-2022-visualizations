import React from 'react';
import CRTInterface from './CRTInterface';
import InstructionInterface from './InstructionInterface';
import AnimationInterface from '../AnimationController/AnimationInterface';

interface useDay10Solution {
    CRT: CRTInterface,
    setCRT: React.Dispatch<React.SetStateAction<CRTInterface>>,
    instructions: InstructionInterface[],
    currentInstructionIndex: number,
    setCurrentInstructionIndex: React.Dispatch<React.SetStateAction<number>>,
    animation: AnimationInterface,
    setAnimation: React.Dispatch<React.SetStateAction<AnimationInterface>>,
}

export default function useDay10Solution(
    {CRT, setCRT,instructions, currentInstructionIndex, setCurrentInstructionIndex, animation, setAnimation}: useDay10Solution)
{
    React.useEffect(()=>{

        const addCycle = (): Promise<void> => {
            return new Promise<void>((resolve,reject)=>{
                setTimeout(()=>{
                    setCRT(prevState => {
                        return {...prevState, cycle: prevState.cycle+1}
                    })
                    resolve();
                },300);
            });
        }

        const getNextInstruction = (): Promise<void> => {
            return new Promise<void> ((resolve,reject)=>{
                setCurrentInstructionIndex(prevIndex => prevIndex+1);
                resolve();
            });
        }

        async function readInstruction(instruction:string) {
            if(instruction === "noop") {
                await addCycle();
            } else {
                const XregisterUpdate:number = parseInt(instruction.split(" ")[1]);
                await addCycle();
                await addCycle();
                setCRT(prevState=>{
                    return {...prevState, X: prevState.X + XregisterUpdate}
                });
            }
            await getNextInstruction();
        }

        if(animation.isRunning && currentInstructionIndex < instructions.length) {
            const currentInstruction = instructions[currentInstructionIndex];
            readInstruction(currentInstruction.instruction);
        }
        
        if(instructions.length > 0 && currentInstructionIndex >= instructions.length) {
            setAnimation(prevState => {
                return {...prevState, isRunning: false, isCompleted: true}
            });
        }

    },[currentInstructionIndex,animation.isRunning, animation.isCompleted]);

    React.useEffect(()=>{
        if(Math.abs(CRT.cycle%40-CRT.X)<=1) {
            setCRT(prevState => {
                const newDisplay = [...prevState.display];
                newDisplay[CRT.cycle].isOn = true;
                return {...prevState, display: newDisplay}
            });
        }
    },[CRT.cycle]);
}
