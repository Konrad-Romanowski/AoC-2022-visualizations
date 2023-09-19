import React from 'react';
import {InstructionType, InstructionsInterface} from './day9Types';

interface InstructionsProps {
    instructions: InstructionsInterface,
    setInstructions:  React.Dispatch<React.SetStateAction<InstructionsInterface>>,
    currentInstructionIndex: Number,
    setCurrentInstructionIndex: React.Dispatch<React.SetStateAction<Number>>
}

export default function Instructions(
    {instructions, setInstructions, currentInstructionIndex, setCurrentInstructionIndex}:InstructionsProps)
{
    const highlightedStyle = {
        backgroundColor: "var(--main-theme-color)",
        color: "#ffffff",
        borderRadius: "1rem"
    }

    const instructionsElements = instructions.map((instruction,index) => 
        <li key={index} style={index === currentInstructionIndex ? highlightedStyle : {}}>{instruction.direction}{instruction.numberOfSteps.toString()}</li>)

    return (
        <ul className='instructions'>
            {instructionsElements}
        </ul>
    )
}