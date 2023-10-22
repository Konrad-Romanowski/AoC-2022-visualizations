import React from 'react';
import AnimationController from '../AnimationController/AnimationController';
import AnimationInterface from '../AnimationController/AnimationInterface';
import generateMap from './generateMap';
import Canvas from './Canvas';
import Counter from '../Counter/Counter';
import './day14styles.css';
import { Point, GameMap } from './day14Types';
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
    const [gameMap,setGameMap] = React.useState<GameMap>({
        map: {},
        floorLevel: 0
    })
    const [sand, sandDispatch] = React.useReducer(sandReducer,sandInitialState);
    const {inputData,isPending,isError} = useFetch('./day14_input.txt');

    // transform input data into more readable / useful structure
    // and by the way get the lowest rock level and set the floor level
    React.useEffect(()=>{
        const solidRockPathsInput = inputData.split('\n');

        let lowestRocksLevel = -Infinity;

        const solidRockPaths = solidRockPathsInput.reduce((rockPaths:Point[][],path:string)=>{
            const pathAsArray = path.split(' -> ');
            const singlePath = pathAsArray.reduce((points:Point[],point:string)=>{
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

        setGameMap({
            map: generateMap(solidRockPaths),
            floorLevel:lowestRocksLevel+2
        });

    },[inputData]);

    useDay14Solution({
        sand,
        sandDispatch,
        animation,
        setAnimation,
        gameMap,
        setGameMap
    });

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
                        gameMap={gameMap}
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