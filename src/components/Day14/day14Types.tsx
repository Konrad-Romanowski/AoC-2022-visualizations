export type Point = {x: number, y: number};

export type Map = {
    [key: string]: string;
}

export type GameMap = {
    map: Map;
    floorLevel: number;
}

export type Sand = {
    x: number;
    y: number;
    canMove: boolean;
    sandCounter: number;
}

// action types for useReducer
export const enum REDUCER_ACTION_TYPE {
    CREATE_NEW_SAND,
    MOVE_DOWN,
    MOVE_DOWN_LEFT,
    MOVE_DOWN_RIGHT,
    TOGGLE_MOVE
}

export type ReducerAction = {
    type: REDUCER_ACTION_TYPE
}