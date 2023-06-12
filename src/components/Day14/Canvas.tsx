import React from 'react';

type Point = {x: number, y: number};

interface CanvasProps {
    rockPath: Array<Point[]>;
    floorLevel: number;
}

export default function Canvas({rockPath,floorLevel}:CanvasProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const scale = 2;
    const width = 800;
    const height = 300;
    
    React.useEffect(()=>{
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        // draw background
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,width,height)

        // draw rocks;
        rockPath.forEach((path:Point[]) => {
            for(let i = 0; i < path.length-1; i++) {
                const startPoint = {x:path[i].x, y:path[i].y}
                const endPoint = {x:path[i+1].x, y:path[i+1].y}
                ctx.beginPath();
                ctx.moveTo(startPoint.x,startPoint.y);
                ctx.lineTo(endPoint.x,endPoint.y);
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });

        //draw floor
        ctx.beginPath();
                ctx.moveTo(0,floorLevel);
                ctx.lineTo(width,floorLevel);
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 1;
                ctx.stroke();

        //draw sand generator
        ctx.fillStyle = 'green'
        ctx.fillRect(500,0,1,1);
    },[rockPath])

    // UPDATE CLASS NAMES
    return (
        <div className='canvas-container'>
            <canvas ref={canvasRef} height={height} width={width} />
        </div>
    )
}
