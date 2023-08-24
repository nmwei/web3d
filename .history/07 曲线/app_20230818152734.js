import { Vector2D } from "../utils/vector2d.js";

function regularShape(edges = 3, x, y, step) { //边数、初始点横坐标、初始点纵坐标、边长
    const ret = []
    const v = (new Vector2D(x, y)).normalize().scale(step)
    ret.push(v.copy())
    for(let i = 0; i < edges -1; i++) {
        v.rotate(Math.PI * 2 / edges)
        ret.push(v.copy())
    } 
    return ret
}
