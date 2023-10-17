import React from 'react';
import AnimationController from '../AnimationController/AnimationController';
import AnimationInterface from '../AnimationController/AnimationInterface';
import generateMap from './generateMap';
import Canvas from './Canvas';
import Counter from '../Counter/Counter';
import './day14styles.css';
import { Point, GameMap, REDUCER_ACTION_TYPE } from './day14Types';
import useFetch from '../../hooks/useFetch';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import PendingDisplay from '../PendingDisplay/PendingDisplay';
import {sandReducer, sandInitialState} from './sandReducer';
import useDay14Solution from './useDay14Solution';

export default function Day14() {
    const [animation, setAnimation] = React.useState<AnimationInterface>({
        isRunning: false,
        isCompleted: false,
    });

    const [rockPath, setRockPath] = React.useState<Array<Point[]>>([]);
    const [floorLevel,setFloorLevel] = React.useState<number>(0);
    const [map, setMap] = React.useState<GameMap>({});
    const [sand, sandDispatch] = React.useReducer(sandReducer,sandInitialState);
    const {inputData,isPending,isError} = useFetch('./day14_input.txt');

    // transform input data into more readable / useful structure
    // and by the way get the lowest rock level and set the floor level
    React.useEffect(()=>{
        const solidRockPathsInput = inputData.split('\n');

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

    },[inputData]);

    // Generate map with rock obstacles
    React.useEffect(()=>{
        setMap(generateMap(rockPath));
    },[rockPath]);

    useDay14Solution({
        sand,
        sandDispatch,
        animation,
        setAnimation,
        map,
        setMap,
        floorLevel
    })

    return (
        <article>
            <header className='sub-header'>Day 14 part 2 visualization</header>
            {
                isError ? <ErrorAlert /> :
                isPending ? <PendingDisplay /> :
                <>
                    <AnimationController 
                        animation={animation}
                        setAnimation={setAnimation}
                    />
                    <Canvas
                        map={map}
                        floorLevel={floorLevel}
                    />
                    <Counter
                        counterTitle='Sand grains'
                        counter={sand.sandCounter}
                    />
                </>
            }
        </article>
    )
}