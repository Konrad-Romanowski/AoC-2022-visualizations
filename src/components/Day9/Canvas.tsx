import React from 'react';
import { Rope } from './day9Types';


interface CanvasProps {
    rope: Rope
}

export default function Canvas({rope}:CanvasProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    // highest and lowest coordinates of ropes head for current input
    // minX = -116
    // maxX = 48
    // canvasWidth => 48-(-116)=164

    // minY = -126
    // maxY = 67
    // canvasHeight => 67-(-126)=194

    // set proper scale, canvas size & translation vector 
    // so the canvas will be fully used
    // and the rope won't get off canvas at the same time
    const scale = 4;
    const width = 166*scale;
    const height = 196*scale;

    const translationVector = {x: 116, y:67};

    
    React.useEffect(()=>{
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        // draw background
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,width,height);

        // draw visited cells
        ctx.fillStyle = 'grey';
        for(let cell in rope.visitedCells) {
            const {x:cellX,y:cellY} = JSON.parse(cell);
            ctx.fillRect((cellX+translationVector.x)*scale,(cellY+translationVector.y)*scale,scale,scale);
        }

        // draw tail
        ctx.fillStyle = 'black';
        for(let i = rope.tail.length-1; i >= 0; i--) {
            ctx.fillRect((rope.tail[i].x+translationVector.x)*scale,(rope.tail[i].y+translationVector.y)*scale,scale,scale);
        }
        
        // draw rope head
        ctx.fillStyle = '#0299fd';
        ctx.fillRect((rope.head.x+translationVector.x)*scale,(rope.head.y+translationVector.y)*scale,scale,scale);

    },[rope.head.x,rope.head.y]);

    return (
        <div className='canvas-container'>
            <canvas ref={canvasRef} height={height} width={width} />
        </div>
    )
}
