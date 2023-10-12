import React from 'react'
import { Rope, REDUCER_ACTION_TYPE, ReducerAction} from './day9Types';
import distance from './distance';

export const ropeInitialState: Rope = {
    head: {x:0, y:0},
    tail: Array.from({length: 9}, () => { return {x:0, y:0} }),
    visitedCells: {}
}

export function ropeReducer(state: Rope, action: ReducerAction): Rope {
    switch(action.type) {
        case REDUCER_ACTION_TYPE.MOVE_UP:
            return {...state, head: {x:state.head.x, y: state.head.y-1}}
        case REDUCER_ACTION_TYPE.MOVE_DOWN:
            return {...state, head: {x:state.head.x, y: state.head.y+1}}
        case REDUCER_ACTION_TYPE.MOVE_LEFT:
            return {...state, head: {x:state.head.x-1, y: state.head.y}}
        case REDUCER_ACTION_TYPE.MOVE_RIGHT:
            return {...state, head: {x:state.head.x+1, y: state.head.y}}
            case REDUCER_ACTION_TYPE.UPDATE_TAIL: {
                const rope = JSON.parse(JSON.stringify([state.head, ...state.tail]));

                for(let i = 0; i < rope.length-1; i++) {
                    if(distance(rope[i], rope[i+1])>1) {
                        // Next item is in same column
                        if(rope[i].x === rope[i+1].x) {
                            rope[i+1].y = (rope[i+1].y + rope[i].y)/2;
                        }
        
                        // Next item is in same row
                        if(rope[i].y === rope[i+1].y) {
                            rope[i+1].x = (rope[i+1].x + rope[i].x)/2;
                        }
                        
                        // Next item is 2 units away diagonaly
                        if(Math.abs(rope[i].x - rope[i+1].x) === 2 &&
                            Math.abs(rope[i].y - rope[i+1].y) === 2) {
                            rope[i+1].y = (rope[i+1].y + rope[i].y)/2;
                            rope[i+1].x = (rope[i+1].x + rope[i].x)/2;
                        }
        
                        // Next item is 1 column away but 2 units away in rows
                        if(Math.abs(rope[i].x - rope[i+1].x) === 1 &&
                            Math.abs(rope[i].y - rope[i+1].y) === 2) {
                            rope[i+1].y = (rope[i+1].y + rope[i].y)/2;
                            rope[i+1].x = rope[i].x;
                        }
        
                        // Next item is 1 row away but 2 units away in columns
                        if(Math.abs(rope[i].x - rope[i+1].x) === 2 &&
                            Math.abs(rope[i].y - rope[i+1].y) === 1) {
                            rope[i+1].x = (rope[i+1].x + rope[i].x)/2;
                            rope[i+1].y = rope[i].y;
                        }
                    }        
                }
                return {...state, tail: rope.slice(1)}
            }
        case REDUCER_ACTION_TYPE.UPDATE_VISITED_CELLS: {
            const tailLastItem = JSON.stringify(state.tail.at(-1));
            const newVisitedCells = {...state.visitedCells};
            tailLastItem in newVisitedCells ? null : newVisitedCells[tailLastItem] = true;

            return {...state, visitedCells: newVisitedCells}
        }
        default:
            throw new Error();
    }
}
