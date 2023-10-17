type Instruction = {
    id: string;
    instruction: string;
}

export default interface InstructionsInterface {
    list: Instruction[],
    currentInstructionIndex: number
}