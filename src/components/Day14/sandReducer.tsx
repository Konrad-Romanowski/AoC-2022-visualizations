import { Sand, REDUCER_ACTION_TYPE, ReducerAction } from "./day14Types";
import { sandGeneratorPosition } from "./sandGeneratorPosition";

// initial state for useReducer
export const sandInitialState:Sand = {x:sandGeneratorPosition.x, y:sandGeneratorPosition.y, canMove: true, sandCounter: 0}

// reducer function for sand
export function sandReducer (state: Sand, action:ReducerAction): Sand {
    switch(action.type) {
        case REDUCER_ACTION_TYPE.CREATE_NEW_SAND:
            return {...sandInitialState, sandCounter: state.sandCounter+1};
        case REDUCER_ACTION_TYPE.MOVE_DOWN:
            return {...state, y: state.y+1}
        case REDUCER_ACTION_TYPE.MOVE_DOWN_LEFT:
            return {...state, x: state.x-1, y: state.y+1}
        case REDUCER_ACTION_TYPE.MOVE_DOWN_RIGHT:
            return {...state, x: state.x+1, y: state.y+1}
        case REDUCER_ACTION_TYPE.TOGGLE_MOVE:
            return {...state, canMove: false};
        default:
            throw new Error();
    }
}