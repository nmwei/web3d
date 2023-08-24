import { Vector2D } from "../utils/vector2d.js";
import { parametric } from "../utils/parametric.js";

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

//使用参数方程绘图模块绘制圆
// parametric(
//     (t, x0, y0, radius) => x0 + radius * Math.cos(t),
//     (t, x0, y0, radius) => y0 + radius * Math.sin(t)
// )(0, Math.PI * 2, 100, 0, 0, 100).draw(ctx)
//start, end, seg, x, y, radius

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

//使用参数方程绘图模块绘制椭圆
// parametric(
//     (t, x0, y0, radiusX, radiusY) => x0 + radiusX * Math.cos(t),
//     (t, x0, y0, radiusX, radiusY) => y0 + radiusY * Math.sin(t),
// )(0, Math.PI * 2, 100, 0, 0, 100, 50).draw(ctx)
//start, end, seg, x, y, radiusX, radiusY

//描述抛物线
// x = x0 + 2pt^2  p为焦点到准线的距离，t表示抛物线上除顶点外的任意一点与原点连线的斜率的倒数
// y = y0 + 2pt
//https://www.geogebra.org/m/CSdsa7RR
// const LINE_SEGMENTS = 60;
// function parabola(x0, y0, p, min, max) {
//   const ret = [];
//   for(let i = 0; i <= LINE_SEGMENTS; i++) {
//     const s = i / 60;
//     const t = min * (1 - s) + max * s;
//     const x = x0 + 2 * p * t ** 2;
//     const y = y0 + 2 * p * t;
//     ret.push([x, y]);
//   }
//   return ret;
// }
//draw(parabola(0, 0, 5.5, -10, 10));

//使用参数方程绘图模块绘制抛物线
// parametric(
//     (t, p) => 2 * p * t ** 2,
//     (t, p) => 2 * p * t
// )(-10, 10, 60, 5.5).draw(ctx)
//start, end, seg, p

//使用参数方程绘制出阿基米德螺旋线
const helical = parametric(
  (t, l) => l * t * Math.cos(t),
  (t, l) => l * t * Math.sin(t)
);
helical(0, 50, 500, 5).draw(ctx, { strokeStyle: "blue" });

//使用参数方程绘制星形线
const star = parametric(
  (t, l) => l * Math.cos(t) ** 3,
  (t, l) => l * Math.sin(t) ** 3
);
star(0, Math.PI * 2, 50, 150).draw(ctx, { strokeStyle: "red" });

//参数方程绘制二阶贝塞尔曲线
// const quadricBezier = parametric(
//   (t, [{ x: x0 }, { x: x1 }, { x: x2 }]) =>
//     (1 - t) ** 2 * x0 + 2 * (1 - t) * t * x1 + t ** 2 * x2,
//   (t, [{ y: y0 }, { y: y1 }, { y: y2 }]) =>
//     (1 - t) ** 2 * y0 + 2 * (1 - t) * t * y1 + t ** 2 * y2
// );

// const p0 = new Vector2D(0, 0);
// const p1 = new Vector2D(100, 50);
// const p2 = new Vector2D(200, 0);
// const count = 30;
// quadricBezier(0, 1, 100, [p0, p1, p2]).draw(ctx);
//start, end, seg, points

//参数方程绘制三阶贝塞尔曲线
// const cubicBezier = parametric(
//   (t, [{ x: x0 }, { x: x1 }, { x: x2 }, { x: x3 }]) =>
//     (1 - t) ** 3 * x0 +
//     3 * t * (1 - t) ** 2 * x1 +
//     3 * (1 - t) * t ** 2 * x2 +
//     t ** 3 * x3,
//   (t, [{ y: y0 }, { y: y1 }, { y: y2 }, { y: y3 }]) =>
//     (1 - t) ** 3 * y0 +
//     3 * t * (1 - t) ** 2 * y1 +
//     3 * (1 - t) * t ** 2 * y2 +
//     t ** 3 * y3
// );

// const p0 = new Vector2D(0, 0);
// const p1 = new Vector2D(100, 0);
// p1.rotate(0.75);
// const p2 = new Vector2D(150, 0);
// p2.rotate(-0.75);
// const p3 = new Vector2D(200, 0);
// const count = 30;
// for (let i = 0; i < count; i++) {
//   p1.rotate((Math.PI * 2) / count);
//   p2.rotate((Math.PI * 2) / count);
//   p3.rotate((Math.PI * 2) / count);
//   cubicBezier(0, 1, 100, [p0, p1, p2, p3]).draw(ctx);
// }



// canvas指令绘制二次贝塞尔曲线 
//quadraticCurveTo(cx, cy, x, y); cx、cy 是控制点的坐标，x、y 是终点坐标
ctx.beginPath();
ctx.moveTo(0, 0); //起始点
ctx.quadraticCurveTo(200, 0, 100, 50);// 
ctx.stroke();

// canvas指令绘制三次贝塞尔曲线 
// bezierCurveTo(cx1, cy1, cx2, cy2, x, y); cx1、cy1、cx2、cy2 是控制点的坐标，x、y 是终点坐标
ctx.beginPath();
ctx.moveTo(0, 0); //起始点
ctx.bezierCurveTo(100, 0, 150, 0, 200, 0); 
ctx.stroke();



