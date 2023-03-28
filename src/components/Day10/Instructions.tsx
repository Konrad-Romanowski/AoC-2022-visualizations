import React from "react";

interface InstructionsProps {
    instructions: string[];
    isAnimationRunning: boolean;
    cycle: number;
    addCycle: ()=>void;
}

export default function Instructions({instructions,isAnimationRunning, cycle, addCycle}: InstructionsProps) {

    function readInstructions() {
        console.log("Instruction read");
    }

    React.useEffect(()=>{
        // Create a loop to read instructions and perform them
    },[isAnimationRunning])

    const instructionsElements = instructions.map((instruction,index) => 
        <li key={index}>{instruction}</li>)

    return (
        <ul className="instructions">
            {instructionsElements}
        </ul>
    )
}