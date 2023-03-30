import React from "react";

interface InstructionsProps {
    instructions: string[];
    isAnimationRunning: boolean;
    cycle: number;
    setIsAnimationRunning: React.Dispatch<React.SetStateAction<boolean>>;
    setCycle: React.Dispatch<React.SetStateAction<number>>;
}

export default function Instructions({instructions,isAnimationRunning, cycle, setCycle}: InstructionsProps) {

    const [currentInstructionIndex, setCurrentInstructionIndex] = React.useState(0);

    // function readInstructions() {
    //     console.log("Instruction read");
    // }

    // function addCycle() {
    //     return new Promise(resolve => setTimeout(()=>{
    //         console.log("added cycle")
    //         setCycle(prevCycle=>prevCycle+1)
    //     },500)) 
    // }

    // function wait(ms:number) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }
      
    // async function addCycle() {
    //     await wait(1000);
    //     setCycle(prevCycle=>prevCycle+1);
    // }      

    // React.useEffect(()=>{
    //     if(isAnimationRunning && currentInstructionIndex < instructions.length) {
            
    //         const currentInstruction = instructions[currentInstructionIndex];

            // setCurrentInstructionIndex(prevIndex => prevIndex+1);
            // setTimeout(()=>{
            //     if(currentInstruction === "noop") {
            //         // setCycle(prevCycle=>prevCycle+1);
            //         addCycle();
            //     } else {
            //         // calculate new X
            //         addTwoCycles()
            //     }
            //     setCurrentInstructionIndex(prevIndex => prevIndex+1);
            // },500)

    //         if(currentInstruction === "noop") {
    //             addCycle();
    //         } else {
    //             addCycle();
    //             addCycle();
    //         }
    //         setCurrentInstructionIndex(prevIndex => prevIndex+1);
    //     }
    // },[isAnimationRunning,currentInstructionIndex])
    
    // DODAĆ STATE:
    // currentInstruction
    
    React.useEffect(()=>{
        let intervalID:(number | null) = null;

        if(isAnimationRunning) {
            intervalID = setInterval(()=>{
                let currentInstruction = instructions[currentInstructionIndex];
                if(currentInstruction === "noop") {
                    setCycle(prevCycle=>prevCycle+1);
                } else {
                    setCycle(prevCycle=>prevCycle+1);
                    setCycle(prevCycle=>prevCycle+1);
                }
                setCurrentInstructionIndex(prevIndex => prevIndex +1)
            },500)
        }

        return () => {
            if(intervalID) clearInterval(intervalID)
        }
    },[isAnimationRunning]);

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