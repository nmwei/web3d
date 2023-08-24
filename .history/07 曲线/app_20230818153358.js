import { Vector2D } from "../utils/vector2d.js";



const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const {width, height} = canvas;
ctx.translate(0.5 * width, 0.5 * height);
ctx.scale(1, -1);


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

function draw(points, strokeStyle = 'black', fillStyle = null) {
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(...points[0]);
    for(let i = 1; i < points.length; i++) {
      ctx.lineTo(...points[i]);
    }
    ctx.closePath();
    if(fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }
    ctx.stroke();
  }