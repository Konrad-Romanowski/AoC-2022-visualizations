// PROBABLY NOT THE BEST PRACTICE TO USE CLASSES IN REACT THAT ARE NOT MEANT TO BE A COMPONENT

import AnimationInterface from './../AnimationController/AnimationInterface';

interface GameMap {
    [key: string]: string;
}

export default class SandGenerator {
    x: number;
    y: number;
    numberOfGeneratedSand: number;

    constructor(x:number,y:number) {
        this.x = x;
        this.y = y;
        this.numberOfGeneratedSand = 0;
    }

    generateSand() {
        const sand = new Sand(this.x,this.y);
        this.numberOfGeneratedSand++;
        return sand;
    }
}

class Sand {
    x: number;
    y: number;
    canMove: boolean;

    constructor(x:number,y:number) {
        this.x = x;
        this.y = y;
        this.canMove = true;
    }

    moveDown() {
        this.y++;
    }

    moveDownAndLeft() {
        this.y++;
        this.x--;
    }

    moveDownAndRight() {
        this.y++;
        this.x++;
    }

    move(map: {[key: string]: string},floorLevel:number,setMap:React.Dispatch<React.SetStateAction<GameMap>>, setAnimation:React.Dispatch<React.SetStateAction<AnimationInterface>>) {
        while(this.canMove) {
            if(!map[`[${this.x},${this.y+1}]`] && this.y+1 !== floorLevel) {
                this.moveDown();
            } else if(!map[`[${this.x-1},${this.y+1}]`] && this.y+1 !== floorLevel) {
                this.moveDownAndLeft();
            } else if(!map[`[${this.x+1},${this.y+1}]`] && this.y+1 !== floorLevel) {
                this.moveDownAndRight();
            } else {
                this.canMove = false;
            }
        }

        setMap(prevMap=>{
            return { ... prevMap, [`[${this.x},${this.y}]`]: 'o' }
        });

        if(!this.canMove && this.x === 500 && this.y === 0) {
            setAnimation(prevState => {
                return {...prevState, isCompleted: true}
            });
        }

    }

}