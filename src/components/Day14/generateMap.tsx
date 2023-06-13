interface GameMap {
    [key: string]: string;
}

// move Point type to separate file?
type Point = {x: number, y: number};

export default function generateMap(rockPaths:Array<Point[]>) {
    const map:GameMap = {}

    rockPaths.forEach(path => {
        for(let i = 0; i < path.length - 1; i++) {
            drawPath(map,path[i],path[i+1]);
        }
    });
    
    return map;
}

function drawPath(map:GameMap,p1:Point,p2:Point) {
    // create horizontal line
    if(p1.x === p2.x) {
        const yStart = Math.min(p1.y,p2.y);
        const yEnd = Math.max(p1.y,p2.y);

        for(let i = yStart; i <= yEnd; i++) {
            map.hasOwnProperty(`[${p1.x},${i}]`) ? null : map[`[${p1.x},${i}]`] = '#';
        }
    }

    // create vertical line
    if(p1.y === p2.y) {
        const xStart = Math.min(p1.x,p2.x);
        const xEnd = Math.max(p1.x,p2.x);

        for(let i = xStart; i <= xEnd; i++) {
            map.hasOwnProperty(`[${i},${p1.y}]`) ? null : map[`[${i},${p2.y}]`] = '#';
        }
    }
}