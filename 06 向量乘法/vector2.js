class Vector2D extends Array {
    constructor(x, y) {
        super(x, y)
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

    copy() {
        return new Vector2D(this.x, this.y)
    }

    dot(v) {
        return this.x * v.x + this.y * v.y
    }

    cross(v) {
        return this.x * v.y - this.y * v.x
    }

    scale(s) {
        this.x *= s
        this.y *= s
        return this;
    }

    normalize() {
        return this.scale(1 / this.len)
    }
}

function isRange(x, y) {
    const v1 = (new Vector2D(x, y)).normalize();
    const v2 = new Vector2D(0, 1);
    return Math.abs(v1.cross(v2)) <= 0.5
}

console.log(isRange(1, 1.733))
console.log(isRange(1, 1.731))



//[[x10, y10], [x11, y11]], [[x20, y20], [x21, y21]]
function getRelation(line1, line2) {
    const [ point10, point11 ] = line1;
    const [ point20, point21 ] = line2
    const v1 = new Vector2D(point11[0] - point10[0], point11[1] - point10[1]);
    const v2 = new Vector2D(point21[0] - point20[0], point21[1] - point20[1]);
    if(v1.dot(v2) === 0) {
        console.log('垂直')
    } else if(v1.cross(v2) === 0) {
        console.log('平行')
    } else {
        console.log('其它')
    }
}
getRelation([[1,0], [0,0]], [[0, 1], [0, 0]])
getRelation([[1,0], [0,0]], [[0, 1], [1, 1]])
getRelation([[1,0], [0,0]], [[0, 1], [1, 4]])


function getDistance(line, point) {
    const [ point0, point1 ] = line;
    const v1 = new Vector2D(point1[0] - point0[0], point1[1] - point0[1])
    const v2 = new Vector2D(point[0] - point0[0], point[1] - point0[1])

    return Math.abs(v1.cross(v2)) / v1.len
}

console.log(getDistance([[1,0], [-1, 0]], [-10, 1]))
console.log(getDistance([[1,0], [0, 1]], [0, 0]))


// const box = document.querySelector('.box')
// debugger;
// console.log(box)
// const rect = box.getBoundingClientRect()
//
// box.onmouseenter = function (e) {
//     const vx = new Vector2D(1, 0)
//     const ox = rect.left + rect.width / 2
//     const oy = rect.top + rect.height / 2
//     debugger;
//
//     const v = new Vector2D(e.clientX - ox, e.clientY - oy).normalize()
//     const v1 = new Vector2D(rect.right - ox, rect.top - oy).normalize()
//     debugger;
//
//     if(Math.abs(v1.cross(vx)) < Math.abs(v.cross(vx))) {
//         //上下
//         if(v.y > 0) {
//             box.innerHTML = '下'
//         } else {
//             box.innerHTML = '上'
//         }
//     } else {
//        box.innerHTML = v.x > 0 ? '右' : '左'
//     }
// }
// box.onmouseleave = function () {
//     box.innerHTML = ''
// }





