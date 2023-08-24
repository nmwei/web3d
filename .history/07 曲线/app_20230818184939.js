import { Vector2D } from "../utils/vector2d.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const { width, height } = canvas;
ctx.translate(0.5 * width, 0.5 * height);
ctx.scale(1, -1);

//生成正多边形顶点左边
function regularShape(edges = 3, x, y, step) {
  //边数、初始点横坐标、初始点纵坐标、边长
  const ret = [];
  const delta = (Math.PI * 2) / edges; //多边形的外角和为360度
  let p = new Vector2D(x, y); //多边形顶点对应的向量
  const dir = new Vector2D(step, 0); //到下一个多边形顶点向量的差值向量

  ret.push(p);
  for (let i = 0; i < edges; i++) {
    p = p.copy().add(dir);
    ret.push(p);
    dir.rotate(delta);
  }
  return ret;
}

//根据顶点数组，使用canvas绘制
function draw(points, strokeStyle = "black", fillStyle = null) {
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.moveTo(...points[0]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(...points[i]);
  }
  ctx.closePath();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  ctx.stroke();
}

//绘制多边形
// draw(regularShape(3, 128, 128, 100));
// draw(regularShape(6, -64, 128, 50));

// draw(regularShape(11, -64, -64, 30));
// draw(regularShape(60, 128, -64, 6));

//描述圆
//x = x0 + r * cos(a)
//y = y0 + r * sin(a)
// const number = 60;
// function arc1(x0, y0, radius) {
//     const ret = []
//     for(let i = 0; i < number; i++) {
//         const angle = Math.PI * 2 / number * i
//         const x = x0 + radius * Math.cos(angle)
//         const y = y0 + radius * Math.sin(angle)
//         ret.push([x, y])
//     }
//     return ret
// }

// draw(arc1(10, 10, 100))




//描述圆
//x = x0 + r * cos(a)
//y = y0 + r * sin(a)
// const TAU_SEGMENTS = 60;
// const TAU = Math.PI * 2;
// function arc(x0, y0, radius, startAng = 0, endAng = Math.PI * 2) {
//   const ang = Math.min(TAU, endAng - startAng);
//   const ret = ang === TAU ? [] : [[x0, y0]];
//   const segments = Math.round((TAU_SEGMENTS * ang) / TAU);
//   for (let i = 0; i <= segments; i++) {
//     const x = x0 + radius * Math.cos(startAng + (ang * i) / segments);
//     const y = y0 + radius * Math.sin(startAng + (ang * i) / segments);
//     ret.push([x, y]);
//   }
//   return ret;
// }
//draw(arc(0, 0, 100));





//描述椭圆
//x = x0 + a * cos(a)  a表示长轴
//y = y0 + b * sin(a)  b表示短轴
// const TAU_SEGMENTS = 60;
// const TAU = Math.PI * 2;
// function ellipse(x0, y0, radiusX, radiusY, startAng = 0, endAng = Math.PI * 2) {
//   const ang = Math.min(TAU, endAng - startAng);
//   const ret = ang === TAU ? [] : [[x0, y0]];
//   const segments = Math.round((TAU_SEGMENTS * ang) / TAU);
//   for (let i = 0; i <= segments; i++) {
//     const x = x0 + radiusX * Math.cos(startAng + (ang * i) / segments);
//     const y = y0 + radiusY * Math.sin(startAng + (ang * i) / segments);
//     ret.push([x, y]);
//   }
//   return ret;
// }

// draw(ellipse(0, 0, 100, 50));


//描述抛物线
// x = x0 + 2pt^2  p为焦点到准线的距离，t表示抛物线上除顶点外的任意一点与原点连线的斜率的倒数
// y = y0 + 2pt
//https://www.geogebra.org/m/CSdsa7RR
const LINE_SEGMENTS = 60;
function parabola(x0, y0, p, min, max) {
  const ret = [];
  for(let i = 0; i <= LINE_SEGMENTS; i++) {
    const s = i / 60;
    const t = min * (1 - s) + max * s;
    const x = x0 + 2 * p * t ** 2;
    const y = y0 + 2 * p * t;
    ret.push([x, y]);
  }
  return ret;
}

draw(parabola(0, 0, 5.5, -10, 10));
