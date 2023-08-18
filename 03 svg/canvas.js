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
  function draw(ctx, node, {fillStyle = 'rgba(0, 0, 0, 0.2)', textColor = 'white'} = {}) {
    const { x, y, r, children } = node
    ctx.beginPath()
    ctx.fillStyle = fillStyle
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
    if(children) {
      children.forEach(c => {
        draw(ctx, c, { fillStyle, textColor })
      })
    } else {
      ctx.beginPath()
      ctx.fillStyle = textColor
      ctx.textAlign = 'center'
      ctx.font = '12px Arial'
      ctx.fillText(node.data.name, x, y)
    }
  }

  const ctx = document.querySelector('canvas').getContext('2d')

  draw(ctx, root)

})()