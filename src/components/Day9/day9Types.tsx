export type Point = {x: number, y: number};

export type Rope = {
    head: Point;
    tail: Point[];
}

export type InstructionType = {
    id: String,
    direction: String,
    numberOfSteps: Number,
}

export interface InstructionsInterface extends Array<InstructionType> {}

export const enum REDUCER_ACTION_TYPE {
    MOVE_UP,
    MOVE_DOWN,
    MOVE_LEFT,
    MOVE_RIGHT,
    MOVE_TAIL
}

export type ReducerAction = {
    type: REDUCER_ACTION_TYPE
}