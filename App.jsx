import React, {useRef, useEffect} from 'react'

const Canvas = props => {
  
  const { draw, ...rest } = props
  const canvasRef = useRef(null)
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId
    
    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return <canvas ref={canvasRef} {...rest}/>
}


class Particle {
  constructor(xInit, yInit, mass){
    this.pos = {x: xInit, y: yInit}
    this.vel = {x : 0, y : 0}
    this.acc = {x : 0, y : 9.8}
    this.mass = mass;
  }
  update(dt){   
    this.pos.x = this.pos.x + this.vel.x*dt + this.acc.x*dt*dt*0.5
    this.pos.y = this.pos.y + this.vel.y*dt + this.acc.y*dt*dt*0.5
    this.vel.x = this.vel.x + this.acc.x*dt*0.5
    this.vel.y = this.vel.y+ this.acc.y*dt*0.5
  }
}

export function App(props) {
  particle = new Particle(100, 0, 20);

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    particle.update(0.1)
    ctx.fillStyle = '#C0FFEE'
    ctx.beginPath()
    ctx.arc(particle.pos.x, particle.pos.y, particle.mass, 0, 2*Math.PI)
    ctx.fill()

  }
  
  return (
    <div>
      <Canvas draw={draw} />
    </div>
    );
}

// Log to console
console.log('Hello console')
