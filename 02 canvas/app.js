
const dataSource = 'https://s5.ssl.qhres2.com/static/b0695e2dd30daa64.json';
(async function (){
    const data = await (await fetch(dataSource)).json();

    const regions = d3.hierarchy(data)
        .sum(n => 1)
        .sort((a, b) => a.value - b.value)

    const pack = d3.pack()
        .size([1600, 1600])
        .padding(4)

    const root = pack(regions);

    function draw(root, node, {bg = 'rgba(0, 0, 0, 0.2)', textColor = 'white'} = {}) {
        const children = node.children;
        const { x, y, r } = node;
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle.setAttribute('cx', x)
        circle.setAttribute('cy', y)
        circle.setAttribute('r', r)
        circle.setAttribute('fill', bg)
        circle.setAttribute('data-name', node.data.name)
        root.appendChild(circle)
        if(children) {
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
            children.forEach(c => {
                draw(g, c, { bg, textColor })
            })
            g.setAttribute('data-name', node.data.name)
            root.appendChild(g)
        } else {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
            text.setAttribute('font-size', '1.5rem')
            text.setAttribute('fill', textColor)
            text.setAttribute('x', x)
            text.setAttribute('y', y)
            text.textContent = node.data.name;
            text.setAttribute('text-anchor', 'middle')
            root.appendChild(text)
        }
    }

    const svgRoot = document.querySelector('svg')
    draw(svgRoot, root)

    let lastTarget = null;

    const getText = function (node) {
        const name = node.getAttribute('data-name');
        if(node.parentNode && node.parentNode.nodeName === 'g') {
            return node.parentNode.getAttribute('data-name') + '-' + name
        }
        return name
    }

    svgRoot.addEventListener('mousemove',  (e) => {
        let target = e.target
        if(target.nodeName === 'text') {
            target = target.previousSibling;
        }

        if(lastTarget && target !== lastTarget) {
             lastTarget.setAttribute('fill', 'rgba(0, 0, 0, 0.2)')
        }

        target.setAttribute('fill', 'rgba(0, 200, 0, 0.3)')

        document.querySelector('h1').textContent = getText(target)

        lastTarget = target;
    })

})()