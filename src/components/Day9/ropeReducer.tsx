import React from 'react'
import { Rope, REDUCER_ACTION_TYPE, ReducerAction } from './day9Types';

export const ropeInitialState: Rope = {
    head: {x:0, y:0},
    tail: new Array({length:9}).map(()=>{return {x:0,y:0}})
}

export function ropeReducer(state: Rope, action: ReducerAction): Rope {
    switch(action.type) {
        case REDUCER_ACTION_TYPE.MOVE_UP:
            return {...state, head: {x:state.head.x, y: state.head.y+1}}
        case REDUCER_ACTION_TYPE.MOVE_DOWN:
            return {...state, head: {x:state.head.x, y: state.head.y-1}}
        case REDUCER_ACTION_TYPE.MOVE_LEFT:
            return {...state, head: {x:state.head.x-1, y: state.head.y}}
        case REDUCER_ACTION_TYPE.MOVE_RIGHT:
            return {...state, head: {x:state.head.x+1, y: state.head.y}}
            case REDUCER_ACTION_TYPE.UPDATE_TAIL:
            // TODO
            return {...state}
        default:
            throw new Error();
    }
}
