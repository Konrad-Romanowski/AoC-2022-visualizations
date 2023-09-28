export type Point = {x: number, y: number};

export type VisitedCells = {
    [key:string]: boolean
}

export type Rope = {
    head: Point;
    tail: Point[];
    visitedCells: VisitedCells;
}

export type InstructionType = {
    id: string,
    direction: string,
    numberOfSteps: number,
}

export interface InstructionsInterface extends Array<InstructionType> {}

export const enum REDUCER_ACTION_TYPE {
    MOVE_UP,
    MOVE_DOWN,
    MOVE_LEFT,
    MOVE_RIGHT,
    UPDATE_TAIL,
    UPDATE_VISITED_CELLS
}

export type ReducerAction = {
    type: REDUCER_ACTION_TYPE
}