import InstructionInterface from './InstructionInterface';

interface InstructionsProps {
    instructions: InstructionInterface[];
    currentInstructionIndex: number;
}

export default function Instructions({instructions, currentInstructionIndex}: InstructionsProps) {

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