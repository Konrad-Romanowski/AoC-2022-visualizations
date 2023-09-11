import React from 'react';
import CRTInterface from './CRTInterface';
import InstructionInterface from './InstructionInterface';
import AnimationInterface from '../AnimationController/AnimationInterface';

interface InstructionsProps {
    instructions: InstructionInterface[];
    animation: AnimationInterface;
    setAnimation: React.Dispatch<React.SetStateAction<AnimationInterface>>;
    CRT: CRTInterface;
    setCRT: React.Dispatch<React.SetStateAction<CRTInterface>>
}

export default function Instructions(
    {instructions, animation, setAnimation, CRT, setCRT}: InstructionsProps)
{

    const [currentInstructionIndex, setCurrentInstructionIndex] = React.useState(0);
    const {cycle,X} = CRT;

    React.useEffect(()=>{

        const addCycle = (): Promise<void> => {
            return new Promise<void>((resolve,reject)=>{
                setTimeout(()=>{
                    setCRT(prevState => {
                        return {...prevState, cycle: prevState.cycle+1}
                    })
                    resolve();
                },300)
            })
        }

        const getNextInstruction = (): Promise<void> => {
            return new Promise<void> ((resolve,reject)=>{
                setCurrentInstructionIndex(prevIndex => prevIndex+1);
                resolve();
            })
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
        
        if(currentInstructionIndex >= instructions.length) {
            setAnimation(prevState => {
                return {...prevState, isRunning: false, isCompleted: true}
            });
        }

    },[currentInstructionIndex,animation.isRunning, animation.isCompleted])

    React.useEffect(()=>{
        if(Math.abs(cycle%40-X)<=1) {
            setCRT(prevState => {
                const newDisplay = [...prevState.display];
                newDisplay[cycle].isOn = true;
                return {...prevState, display: newDisplay}
            })
        }
    },[CRT.cycle])

    const highlightedStyle = {
        backgroundColor: "var(--main-theme-color)",
        color: "#ffffff",
        borderRadius: "1rem"
    }

    const instructionsElements = instructions.map((instruction,index) => 
        <li key={instruction.id} style={index === currentInstructionIndex ? highlightedStyle : {}}>{instruction.instruction}</li>)

    return (
        <ul className="instructions">
            {instructionsElements}
        </ul>
    )
}