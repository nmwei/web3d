import { Vector2D } from "../utils/vector2d.js";



const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const {width, height} = canvas;
ctx.translate(0.5 * width, 0.5 * height);
ctx.scale(1, -1);


function regularShape(edges = 3, x, y, step) { //边数、初始点横坐标、初始点纵坐标、边长
    const ret = []
    const delta = Math.PI * 2 / edges; //多边形的外角和为360度
    let p = new Vector2D(x, y); //多边形顶点对应的向量
    const dir = new Vector2D(step, 0) //到下一个多边形顶点向量的差值向量

    ret.push(p)
    for(let i = 0; i < edges; i++) {
        p = p.copy().add(dir.rotate(delta));
    ret.push(p);
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




draw(regularShape(3, 128, 128, 100));
draw(regularShape(6, -64, 128, 50));

draw(regularShape(11, -64, -64, 30));
draw(regularShape(60, 128, -64, 6));