(async function () {
  const url = 'https://s5.ssl.qhres2.com/static/b0695e2dd30daa64.json'
  const data = await (await fetch(url)).json()

  const regions = d3.hierarchy(data)
    .sum(n => 1)
    .sort((a, b) => b.value - a.value)

  const pack = d3.pack()
    .size([800, 800])
    .padding(5)

  const root = pack(regions)
  debugger;

  const svg = document.querySelector('svg')
  function draw(parent, node, {bg = 'rgba(0, 0, 0, 0.1)', color= 'white'} = {}) {
    const { x, y, r, children } = node

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', x)
    circle.setAttribute('cy', y)
    circle.setAttribute('r', r)
    circle.setAttribute('fill', bg)
    circle.setAttribute('data-name', node.data.name)

    parent.appendChild(circle)
    if(children) {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      g.setAttribute('data-name', node.data.name)
      children.forEach(c => draw(g, c))
      parent.appendChild(g)
    } else {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      text.setAttribute('x', x)
      text.setAttribute('y', y)
      text.setAttribute('fill', color)
      text.setAttribute('text-anchor', 'middle')
      text.setAttribute('font-size', '13px')
      text.setAttribute('data-name', node.data.name)
      text.textContent = node.data.name
      parent.appendChild(text)
    }
  }

  function getTitle(node) {
    let text = node.getAttribute('data-name')
    if(node.parentNode && node.parentNode.nodeName === 'g') {
      return node.parentNode.getAttribute('data-name') + " - " + node.getAttribute('data-name')
    }
    return text || " "
  }

  let lastTarget;
  svg.addEventListener('mousemove', function (e) {
    let target = e.target
    if(target.nodeName === 'text') {
      target = target.previousSibling
    }
    if(lastTarget && target !== lastTarget) {
      lastTarget.setAttribute('fill', 'rgba(0, 0, 0, 0.1)')
    }
    target.setAttribute('fill', 'rgba(0, 255, 0, 0.2)')
    const title = document.querySelector('h1')
    title.textContent = getTitle(target)
    lastTarget = target
  })

  draw(svg, root)


})()