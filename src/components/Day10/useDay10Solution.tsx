import React from 'react';
import CRTInterface from './CRTInterface';
import InstructionsInterface from './InstructionsInterface';
import AnimationInterface from '../AnimationController/AnimationInterface';

interface useDay10SolutionInterface {
    CRT: CRTInterface,
    setCRT: React.Dispatch<React.SetStateAction<CRTInterface>>,
    instructions: InstructionsInterface,
    setInstructions: React.Dispatch<React.SetStateAction<InstructionsInterface>>,
    animation: AnimationInterface,
    setAnimation: React.Dispatch<React.SetStateAction<AnimationInterface>>,
}

export default function useDay10Solution(
    {CRT, setCRT, instructions, setInstructions, animation, setAnimation}: useDay10SolutionInterface)
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
                setInstructions(prevState => {
                    return {...prevState, currentInstructionIndex: prevState.currentInstructionIndex+1}
                })
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

        if(animation.isRunning && instructions.currentInstructionIndex < instructions.list.length) {
            const currentInstruction = instructions.list[instructions.currentInstructionIndex];
            readInstruction(currentInstruction.instruction);
        }
        
        if(instructions.list.length > 0 && instructions.currentInstructionIndex >= instructions.list.length) {
            setAnimation(prevState => {
                return {...prevState, isRunning: false, isCompleted: true}
            });
        }

    },[instructions.currentInstructionIndex,animation.isRunning, animation.isCompleted]);

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
