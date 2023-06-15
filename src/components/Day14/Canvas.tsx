import React from 'react';
import { GameMap } from './day14Types';

interface CanvasProps {
    floorLevel: number;
    map: GameMap;
}

export default function Canvas({map,floorLevel}:CanvasProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const width = 800;
    const height = 300;
    
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
            const x = JSON.parse(point)[0];
            const y = JSON.parse(point)[1];
            if(map[point] === "#") {
                ctx.fillStyle = 'red';
            } else {
                ctx.fillStyle = 'orange';
            }
            ctx.fillRect(x,y,1,1);
        }

        //draw floor
        ctx.strokeStyle = 'red';
        ctx.fillRect(0,floorLevel,width,1);

        //draw sand generator
        ctx.fillStyle = 'green'
        ctx.fillRect(500,0,1,1);
    },[map]);

    return (
        <div className='canvas-container'>
            <canvas ref={canvasRef} height={height} width={width} />
        </div>
    )
}
