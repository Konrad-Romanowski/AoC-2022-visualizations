export type Point = {x: number, y: number};

export type Rope = {
    head: Point;
    tail: Point[];
}

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