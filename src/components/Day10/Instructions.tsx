import React from "react";
import CRTtypes from "./CRTtypes"

interface InstructionsProps {
    instructions: string[];
    isAnimationRunning: boolean;
    setIsAnimationRunning: React.Dispatch<React.SetStateAction<boolean>>;
    CRT: CRTtypes;
    setCRT: React.Dispatch<React.SetStateAction<CRTtypes>>
}

export default function Instructions(
    {instructions,isAnimationRunning, setIsAnimationRunning, CRT, setCRT}: InstructionsProps)
{

    const {cycle,X} = CRT;

    const [currentInstructionIndex, setCurrentInstructionIndex] = React.useState(0);

    React.useEffect(()=>{

        const addCycle = (): Promise<void> => {
            return new Promise<void>((resolve,reject)=>{
                setTimeout(()=>{
                    setCRT(prev => {
                        return {...prev, cycle: prev.cycle+1}
                    })
                    resolve();
                },300)
            })
        }

        const getNextInstruction = (): Promise<void> => {
            return new Promise<void> ((resolve,reject)=>{
                setCurrentInstructionIndex(prevIndex=>prevIndex+1);
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
                setCRT(prev=>{
                    return {...prev, X: prev.X+1}
                })
            }
            await getNextInstruction();
        }    

        if(isAnimationRunning && currentInstructionIndex < instructions.length) {
            const currentInstruction = instructions[currentInstructionIndex];
            readInstruction(currentInstruction);
        }

        if(currentInstructionIndex >= instructions.length) {
            setIsAnimationRunning(false);
            //set start-stop controller button inactive
        }

    },[currentInstructionIndex,isAnimationRunning])

    React.useEffect(()=>{
        if(Math.abs(cycle%40-X)<=1) {
            setCRT(prev => {
                const newDisplay = [...prev.display];
                newDisplay[cycle] = true;

                return {...prev, display: newDisplay}
            })
        }
    },[CRT.cycle])

    const highlightedStyle = {
        backgroundColor: "var(--main-theme-color)",
        color: "#ffffff",
        borderRadius: "1rem"
    }

    const instructionsElements = instructions.map((instruction,index) => 
        <li key={index} style={index === currentInstructionIndex ? highlightedStyle : {}}>{instruction}</li>)

    return (
        <ul className="instructions">
            {instructionsElements}
        </ul>
    )
}