import { Point } from "./day9Types";

export default function distance(p1:Point,p2:Point) {
    return Math.max(Math.abs(p1.x-p2.x),Math.abs(p1.y-p2.y));
}