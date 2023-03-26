import React from "react";

interface InstructionsProps {
    instructions: string[];
}

export default function Instructions({instructions}: InstructionsProps) {

    const instructionsElements = instructions.map((instruction,index) => 
        <li key={index}>{instruction}</li>)

    return (
        <ul className="instructions">
            {instructionsElements}
        </ul>
    )
}