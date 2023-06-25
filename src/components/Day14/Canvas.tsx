import React from 'react';
import { Point, GameMap } from './day14Types';

interface CanvasProps {
    floorLevel: number;
    sandGenerator: Point;
    map: GameMap;
}

export default function Canvas({map,sandGenerator,floorLevel}:CanvasProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const width = 800;
    const height = 400;

    const translationVector = {x: -600, y:0};
    const scale = 2;
    
    React.useEffect(()=>{
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        // draw background
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,width,height);

        // draw rocks and sand from map
        for(let point in map) {
            const x = JSON.parse(point)[0]*scale + translationVector.x;
            const y = JSON.parse(point)[1]*scale + translationVector.y;
            if(map[point] === "#") {
                ctx.fillStyle = 'black';
            } else {
                ctx.fillStyle = 'gold';
            }
            ctx.fillRect(x,y,1*scale,1*scale);
        }

        //draw floor
        ctx.fillStyle = 'black';
        ctx.fillRect(0+translationVector.x,floorLevel*scale+translationVector.y,width*scale,1*scale);

        // draw sand generator
        ctx.fillStyle = 'red';
        ctx.fillRect(sandGenerator.x+(sandGenerator.x+translationVector.x),sandGenerator.y+(sandGenerator.y+translationVector.y),1*scale,1*scale);

    },[map]);

    return (
        <div className='canvas-container'>
            <canvas ref={canvasRef} height={height} width={width} />
        </div>
    )
}
