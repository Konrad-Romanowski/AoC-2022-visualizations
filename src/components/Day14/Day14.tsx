import React from 'react';
import AnimationController from '../AnimationController/AnimationController';
import AnimationInterface from '../AnimationController/AnimationInterface';
import generateMap from './generateMap';
import Canvas from './Canvas';
import './day14styles.css';

export default function Day14() {

    // move Point type to separate file?
    type Point = {x: number, y: number};

    const [animation, setAnimation] = React.useState<AnimationInterface>({
        isRunning: false,
        isCompleted: false,
    });

    interface GameMap {
        [key: string]: string;
    }

    const [rockPath, setRockPath] = React.useState<Array<Point[]>>([]);
    const [floorLevel,setFloorLevel] = React.useState<number>(0);
    const [map, setMap] = React.useState({});

    // REMOVE LATER
    console.log(rockPath);
    console.log(floorLevel);

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
        console.log(map);
    },[rockPath])

    return (
        <>
            <header className='sub-header'>Day 14 part 2 visualization</header>
            <AnimationController 
                animation={animation}
                setAnimation={setAnimation}
            />
            <Canvas
                rockPath={rockPath}
                floorLevel={floorLevel}
            />
        </>
    )
}