/**
 * 点乘(*)： x1 * x2 + y1 * y2    投影  做的功
 * v1 * v2 = |v1| * |v2| * cos(a)
 * 如果长度为1，则|v1 * v2| = cos(a)
 *
 *
 * 叉乘(x): x1 * y2 - x2 * y1     面积  力矩
 * v1 x v2 = |v1| * |v2| * sin(a)
 * 如果长度为1，则|v1 x v2| = cos(a)
 */

class Vector extends Array {
    constructor(x, y) {
        super(x, y);
    }

    set x(x) {
        this[0] = x
    }

    set y(y) {
        this[1] = y
    }

    get x() {
        return this[0]
    }

    get y() {
        return this[1]
    }

     get len() {
        return Math.hypot(this.x, this.y)
     }

     pot(v) {
        return this.x * v.x + this.y * v.y
     }

     cross(v) {
        return this.x * v.y - v.x * this.y
     }

     scale(s) {
        this.x *= s
        this.y *= s
        return this
     }

     copy() {
        return new Vector(this.x, this.y)
     }

     normalize() {
        return this.scale(1 / this.len)
     }
}

const node = document.querySelector('.box')
const rect = node.getBoundingClientRect()

node.onmouseenter = function (e) {
    const vx = new Vector(1, 0)
    const zx = rect.right - rect.width / 2
    const zy = rect.bottom - rect.height / 2
    const v1 = new Vector(rect.right - zx, rect.bottom - zy).normalize()
    const v = new Vector(e.clientX - zx, e.clientY - zy).normalize()
    if(Math.abs(v1.cross(vx)) > Math.abs(v.cross(vx))) {
        node.innerHTML = v.x > 0 ? "右" : "左"
    } else {
        node.innerHTML = v.y > 0 ? '下' : '上'
    }
}

node.onmouseleave = function () {
    node.innerHTML = ''
}

// const lint1 = [[x1, y1], [x2, y2]]
// const lint2 = [[x3, y3], [x4, y4]]
// function getRelation(line1, line2) {
//     const [p1, p2] = line1;
//     const [p3, p4] = line2
//     const v1 = new Vector(p2[0] - p1[0], p2[1] - p1[1])
//     const v2 = new Vector(p4[0] - p3[0], p4[1] - p3[1])
//     if(v1.pot(v2) === 0) {
//         console.log('垂直')
//     }  else if(v1.cross(v2) === 0) {
//         console.log('平行')
//     } else {
//         console.log('其他')
//     }
// }
//
// getRelation([[1,0], [0,0]], [[0, 1], [0, 0]])
// getRelation([[1,0], [0,0]], [[0, 1], [1, 1]])
// getRelation([[1,0], [0,0]], [[0, 1], [1, 4]])



// function getDistance(line, point) {
//     const [p1, p2] = line;
//     const v1 = new Vector(p2[0] - p1[0], p2[1] - p1[1])
//     const v2 = new Vector(point[0] - p1[0], point[1] - p1[1])
//     return Math.abs(v1.cross(v2) / v1.len)
// }
//
//
// console.log(getDistance([[1,0], [-1, 0]], [-10, 1]))
// console.log(getDistance([[1,0], [0, 1]], [0, 0]))


// function isRange(x, y) {
//     const v1 = new Vector(0, 1)
//     const v = new Vector(x, y).normalize()
//     return Math.abs(v.cross(v1)) < 0.5
// }
//
// console.log(isRange(1, 1.733))
// console.log(isRange(1, 1.731))

















