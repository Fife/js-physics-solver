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
  const particle = new Particle(125, 0, 10);
  const o_particle = new Particle(200, 10, 10);
  o_particle.vel.x = -1
  const dt = 0.1

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    //draw ground
    ctx.fillStyle = '#00001E'
    ctx.beginPath()
    ctx.rect(0, 100, 250, 10)
    ctx.fill()

    //update particle
    particle.update(dt)
    o_particle.update(dt)

    //check for collision with ground
    if (particle.pos.y > 90){
      particle.vel.y = 0 - particle.vel.y
      particle.pos.y = 90
    }
    if (o_particle.pos.y > 90){
      o_particle.vel.y = 0 - o_particle.vel.y
      o_particle.pos.y = 90
    }

    //check for collision with other particles
    collision(particle, o_particle);
 
    //draw particle
    ctx.fillStyle = '#C0FFEE'
    ctx.beginPath()
    ctx.arc(particle.pos.x, particle.pos.y, particle.mass, 0, 2*Math.PI)
    ctx.fill()
    ctx.fillStyle = '#A0F2EE'
    ctx.beginPath()
    ctx.arc(o_particle.pos.x, o_particle.pos.y, o_particle.mass, 0, 2*Math.PI)
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

export function collision(p1, p2){

    let thresh = p2.mass + p1.mass
    let mass_diff = p1.mass - p2.mass

    let distance = Math.sqrt(Math.pow((p2.pos.x - p1.pos.x), 2) + Math.pow((p2.pos.y - p1.pos.y), 2))
    if(distance < thresh){
      //Elastic Collision Simulation
      let denom = p1.mass + p2.mass
      
      p1.vel.x = p1.vel.x - (((2*p2.mass)/denom)*(p1.vel.x - p2.vel.x)*())
}
export function magnitude(x, y){
      return Math.sqrt(Math.pow(x , 2) + Math.pow(y, 2))
    }

export function modify(p1){
  p1.pos.x = 144
}
