import React from 'react';
import { Rope } from './day9Types';


interface CanvasProps {
    rope: Rope
}

export default function Canvas({rope}:CanvasProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const width = 800;
    const height = 400;

    const translationVector = {x: 400, y:200};
    const scale = 8;
    
    React.useEffect(()=>{
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        // draw background
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,width,height);

        // draw rope head
        ctx.fillStyle = '#0299fd';
        ctx.fillRect(rope.head.x+translationVector.x,rope.head.y+translationVector.y,scale,scale);


    },[rope.head.x,rope.head.y]);

    return (
        <div className='canvas-container'>
            <canvas ref={canvasRef} height={height} width={width} />
        </div>
    )
}
