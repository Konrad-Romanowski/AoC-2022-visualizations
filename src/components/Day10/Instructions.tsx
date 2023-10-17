import InstructionsInterface from './InstructionsInterface';

interface InstructionsProps {
    instructions: InstructionsInterface;
}

export default function Instructions({instructions}: InstructionsProps) {

    const highlightedStyle = {
        backgroundColor: "var(--main-theme-color)",
        color: "#ffffff",
        borderRadius: "1rem"
    }

    const instructionsElements = instructions.list.map((instruction,index) => 
        <li key={instruction.id} style={index === instructions.currentInstructionIndex ? highlightedStyle : {}}>{instruction.instruction}</li>
    );

    return (
        <ul className="instructions">
            {instructionsElements}
        </ul>
    )
}