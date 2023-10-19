import {InstructionType} from "./day9Types";

export default interface InstructionsInterface {
    list: InstructionType[],
    currentInstructionIndex: number
}