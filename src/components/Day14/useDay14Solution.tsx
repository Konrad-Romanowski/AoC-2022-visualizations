import React from 'react';
import { Sand, REDUCER_ACTION_TYPE, ReducerAction, GameMap } from './day14Types';
import AnimationInterface from '../AnimationController/AnimationInterface';

interface useDay14SolutionInterface {
    sand: Sand,
    sandDispatch: React.Dispatch<ReducerAction>,
    animation: AnimationInterface,
    setAnimation: React.Dispatch<React.SetStateAction<AnimationInterface>>,
    gameMap: GameMap,
    setGameMap: React.Dispatch<React.SetStateAction<GameMap>>
}

export default function useDay14Solution(
    {sand, sandDispatch, animation, setAnimation, gameMap, setGameMap}: useDay14SolutionInterface)
{

    React.useEffect(()=>{
        if(gameMap.map[`[500,0]`] === 'o') {
            setAnimation({isRunning: false, isCompleted: true});
        }
        if(!sand.canMove) {
            setGameMap(prevState => {
                return {...prevState,
                    map: {...prevState.map, [`[${sand.x},${sand.y}]`]: 'o'}
                }
            });
            sandDispatch({type:REDUCER_ACTION_TYPE.CREATE_NEW_SAND});
        }
    },[sand.canMove]);

    React.useEffect(()=>{
        if(!animation.isCompleted && animation.isRunning) {
            if(!gameMap.map[`[${sand.x},${sand.y+1}]`] && sand.y+1 !== gameMap.floorLevel) {
                sandDispatch({type:REDUCER_ACTION_TYPE.MOVE_DOWN});
            } else if(!gameMap.map[`[${sand.x-1},${sand.y+1}]`] && sand.y+1 !== gameMap.floorLevel) {
                sandDispatch({type:REDUCER_ACTION_TYPE.MOVE_DOWN_LEFT});
            } else if(!gameMap.map[`[${sand.x+1},${sand.y+1}]`] && sand.y+1 !== gameMap.floorLevel) {
                sandDispatch({type:REDUCER_ACTION_TYPE.MOVE_DOWN_RIGHT});
            } else {
                sandDispatch({type:REDUCER_ACTION_TYPE.TOGGLE_MOVE});
            }
        }
    },[animation.isRunning, animation.isCompleted, sand.y]);
}