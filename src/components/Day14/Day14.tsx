import React from 'react';
import AnimationController from '../AnimationController/AnimationController';
import AnimationInterface from '../AnimationController/AnimationInterface';
import generateMap from './generateMap';
import Canvas from './Canvas';
import SandCounter from './SandCounter';
import './day14styles.css';
import { Point, GameMap } from './day14Types';

export default function Day14() {
    const [animation, setAnimation] = React.useState<AnimationInterface>({
        isRunning: false,
        isCompleted: false,
    });

    // sand generator position
    const sandGenerator:Point = {x:500, y:0};

    // initial state for useReducer
    const sandInitialState = {x:sandGenerator.x, y:sandGenerator.y, canMove: true, sandCounter: 0}

    // action types for useReducer
    const enum REDUCER_ACTION_TYPE {
        CREATE_NEW_SAND,
        MOVE_DOWN,
        MOVE_DOWN_LEFT,
        MOVE_DOWN_RIGHT,
        TOGGLE_MOVE
    }

    type ReducerAction = {
        type: REDUCER_ACTION_TYPE
    }

    // reducer function for sand
    const sandReducer = (state: typeof sandInitialState, action:ReducerAction): typeof sandInitialState => {
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

    const [rockPath, setRockPath] = React.useState<Array<Point[]>>([]);
    const [floorLevel,setFloorLevel] = React.useState<number>(0);
    const [map, setMap] = React.useState<GameMap>({});

    const [sand, sandDispatch] = React.useReducer(sandReducer,sandInitialState);

    // read day14_input.txt and transform data into more readable / useful structure
    // and by the way get the lowest rock level and set the floor level
    React.useEffect(()=>{

        async function getRockPaths() {
            const response = await fetch('./day14_input.txt');
            const data = await response.text();
            const solidRockPathsInput = data.split('\n');

            let lowestRocksLevel = -Infinity;

            const solidRockPaths = solidRockPathsInput.reduce((rockPaths:Array<Point[]>,path:string)=>{
                const pathAsArray = path.split(' -> ');
                const singlePath = pathAsArray.reduce((points:Array<Point>,point:string)=>{
                    const pointCoordinates = point.split(',');
                    const x = parseInt(pointCoordinates[0]);
                    const y = parseInt(pointCoordinates[1]);
                    lowestRocksLevel = Math.max(lowestRocksLevel, y);
                    points.push({x, y});
                    return points;
                },[]);

                rockPaths.push(singlePath);
                return rockPaths;
            },[]);
            
            setFloorLevel(lowestRocksLevel+2);
            setRockPath(solidRockPaths);
        }

        getRockPaths();
    },[]);

    // Generate map with rock obstacles
    React.useEffect(()=>{
        setMap(generateMap(rockPath));
    },[rockPath]);

    React.useEffect(()=>{
        if(!sand.canMove) {
            setMap(prevMap => {
                return {...prevMap, [`[${sand.x},${sand.y}]`]: 'o'}
            });
            sandDispatch({type:REDUCER_ACTION_TYPE.CREATE_NEW_SAND});
        }
    },[sand.canMove]);

    React.useEffect(()=>{
        if(!animation.isCompleted && animation.isRunning) {
            if(sand.x === 500 && sand.y === 0 && !sand.canMove) {
                setAnimation({isRunning: false, isCompleted: true})
            }
            if(!map[`[${sand.x},${sand.y+1}]`] && sand.y+1 !== floorLevel) {
                sandDispatch({type:REDUCER_ACTION_TYPE.MOVE_DOWN});
            } else if(!map[`[${sand.x-1},${sand.y+1}]`] && sand.y+1 !== floorLevel) {
                sandDispatch({type:REDUCER_ACTION_TYPE.MOVE_DOWN_LEFT});
            } else if(!map[`[${sand.x+1},${sand.y+1}]`] && sand.y+1 !== floorLevel) {
                sandDispatch({type:REDUCER_ACTION_TYPE.MOVE_DOWN_RIGHT});
            } else {
                sandDispatch({type:REDUCER_ACTION_TYPE.TOGGLE_MOVE});
            }
        }
    },[animation.isRunning, animation.isCompleted, sand.y]);

    return (
        <article>
            <header className='sub-header'>Day 14 part 2 visualization</header>
            <AnimationController 
                animation={animation}
                setAnimation={setAnimation}
            />
            <Canvas
                map={map}
                sandGenerator={sandGenerator}
                floorLevel={floorLevel}
            />
            <SandCounter sandCounter={sand.sandCounter} />
        </article>
    )
}