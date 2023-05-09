import React from "react";

interface InstructionsProps {
    instructions: string[];
    isAnimationRunning: boolean;
    setIsAnimationRunning: React.Dispatch<React.SetStateAction<boolean>>;
    cycle: number;
    setCycle: React.Dispatch<React.SetStateAction<number>>;
    Xregister:number;
    setXregister: React.Dispatch<React.SetStateAction<number>>;
    setPixels: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function Instructions(
    {instructions,isAnimationRunning, setIsAnimationRunning, cycle, setCycle, Xregister, setXregister, setPixels}: InstructionsProps) {

    const [currentInstructionIndex, setCurrentInstructionIndex] = React.useState(0);

    React.useEffect(()=>{

        const addCycle = (): Promise<void> => {
            return new Promise<void>((resolve,reject)=>{
                setTimeout(()=>{
                    setCycle(prevCycle=>prevCycle+1);
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
                setXregister(prevX=>prevX+XregisterUpdate);
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
        if(Math.abs(cycle%40-Xregister)<=1) {
            setPixels(prevPixels => {
                const newPixels = [...prevPixels];
                newPixels[cycle] = true;
                return newPixels;
            })
        }
    },[cycle])

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