import React from 'react';
import AnimationController from '../AnimationController/AnimationController';
import AnimationInterface from '../AnimationController/AnimationInterface';
import generateMap from './generateMap';
import Canvas from './Canvas';
import './day14styles.css';
import { Point, GameMap } from './day14Types';

export default function Day14() {
    const [animation, setAnimation] = React.useState<AnimationInterface>({
        isRunning: false,
        isCompleted: false,
    });

    // initial state for useReducer
    const sandInitialState = {x:500, y:0}

    // action types for useReducer
    const enum REDUCER_ACTION_TYPE {
        CREATE_NEW_SAND,
        MOVE_DOWN,
        MOVE_DOWN_LEFT,
        MOVE_DOWN_RIGHT,
        MERGE_TO_MAP
    }

    type ReducerAction = {
        type: REDUCER_ACTION_TYPE
    }

    // reducer function for sand
    const sandReducer = (state: typeof sandInitialState, action:ReducerAction): typeof sandInitialState => {
        switch(action.type) {
            case REDUCER_ACTION_TYPE.CREATE_NEW_SAND:
                return sandInitialState;
            case REDUCER_ACTION_TYPE.MOVE_DOWN:
                return {...state, y: state.y+1}
            case REDUCER_ACTION_TYPE.MOVE_DOWN_LEFT:
                return {x: state.x-1, y: state.y+1}
            case REDUCER_ACTION_TYPE.MOVE_DOWN_RIGHT:
                return {x: state.x+1, y: state.y+1}
            case REDUCER_ACTION_TYPE.MERGE_TO_MAP:
                {
                    // is it legal?
                    setMap(prevMap => {
                        return {...prevMap, [`[${state.x},${state.y}]`]: 'o'}
                    });
                    return sandInitialState;
                }
            default:
                throw new Error();
        }
    }

    const [rockPath, setRockPath] = React.useState<Array<Point[]>>([]);
    const [floorLevel,setFloorLevel] = React.useState<number>(0);
    const [map, setMap] = React.useState<GameMap>({});

    const [sand, updateSand] = React.useReducer(sandReducer,sandInitialState);
    
    // REMOVE LATER
    // console.log(rockPath);
    // console.log(floorLevel);

    // read day14_input.txt and transform data into more readable / useful structure
    // and by the way get the lowest rock level and set the floor level
    React.useEffect(()=>{

        async function getRockPaths() {
            const response = await fetch('./day14_input.txt');
            const data = await response.text();
            const solidRockPathsInput = data.split('\r\n');

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
        //REMOVE LATER
        // console.log(map);
    },[rockPath]);

    React.useEffect(()=>{
        // while(!animation.isCompleted && animation.isRunning) {
        //     if(!map[`[${sand.x},${sand.y+1}]`] && sand.y+1 !== floorLevel) {
        //         updateSand({type:REDUCER_ACTION_TYPE.MOVE_DOWN});
        //     } else if(!map[`[${sand.x-1},${sand.y+1}]`] && sand.y+1 !== floorLevel) {
        //         updateSand({type:REDUCER_ACTION_TYPE.MOVE_DOWN_LEFT});
        //     } else if(!map[`[${sand.x+1},${sand.y+1}]`] && sand.y+1 !== floorLevel) {
        //         updateSand({type:REDUCER_ACTION_TYPE.MOVE_DOWN_RIGHT});
        //     } else {
        //         updateSand({type:REDUCER_ACTION_TYPE.MERGE_TO_MAP});
        //     }
        // }

    },[animation.isRunning, animation.isCompleted]);

    // what should be the dependency array
    // React.useEffect(()=>{
    //     // const currentSand = sandGenerator.generateSand();
    //     updateSand({type: REDUCER_ACTION_TYPE.CREATE_NEW_SAND});
    // },[map]);

    // 
    // React.useEffect(()=>{

    // },[sand]);

    return (
        <>
            <header className='sub-header'>Day 14 part 2 visualization</header>
            <AnimationController 
                animation={animation}
                setAnimation={setAnimation}
            />
            <Canvas
                map={map}
                floorLevel={floorLevel}
            />
        </>
    )
}