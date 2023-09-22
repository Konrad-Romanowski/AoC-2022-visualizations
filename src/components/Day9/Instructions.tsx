import {InstructionsInterface} from './day9Types';
import './day9styles.css';

interface InstructionsProps {
    instructions: InstructionsInterface,
    currentInstructionIndex: number,
}

export default function Instructions({instructions, currentInstructionIndex}:InstructionsProps) {

    const highlightedStyle = {
        backgroundColor: "var(--main-theme-color)",
        color: "#ffffff",
        borderRadius: "1rem"
    }

    const instructionsElements = instructions.map((instruction,index) => 
        <li key={instruction.id} style={index === currentInstructionIndex ? highlightedStyle : {}}>{instruction.direction}{instruction.numberOfSteps.toString()}</li>)

    return (
        <ul className='day9-instructions'>
            {instructionsElements}
        </ul>
    )
}