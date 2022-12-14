/**  @type {HTMLCanvasElement}   */
const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")
const CANVAS_WIDTH = canvas.width = 500
const CANVAS_HEIGHT = canvas.height = 1000
let gameFrame = 0
const numberOfEnemies = 50
const enemyArray = []


class Enemy{
    constructor(){
        this.image = new Image()
        this.image.src = "enemy3.png"
        this.spriteWidth = 218
        this.spriteHeight = 177
       
        this.width = this.spriteWidth / 2.5
        this.height = this.spriteHeight / 2.5
        this.x = Math.random() * (CANVAS_WIDTH - this.width)
        this.y = Math.random() * (CANVAS_HEIGHT - this.height)
        this.speed = Math.random() * 3 + 1
        this.flapSpeed = Math.floor(this.speed)
        this.frame = 0
        this.speed = Math.random() * 4 + 1
        this.angle = Math.random() * 100
        //this.curve = Math.random() * 7
        this.angleSpeed = Math.random() * 0.5 + 0.5
    }
    update(){
        this.x =  canvas.width/2 */*is the amplitude of wave from fixed x*/  Math.sin(this.angle * Math.PI/110) /*is the angle verticle change*/  + (canvas.width/2 - this.width/2) //takes the fixed x in the middle of the canvas
        this.y = canvas.height/2 * Math.cos(this.angle * Math.PI/150) + (canvas.height/2 - this.width/2)
        
        this.angle += this.angleSpeed
        
        if(this.x + this.spriteWidth < 0){ 
            this.x = CANVAS_WIDTH
            //this.y = Math.random() * (CANVAS_HEIGHT - this.height)
        }
        if(gameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++
        }
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}

for (let i = 0; i < numberOfEnemies; i++){
    enemyArray.push(new Enemy())
}




function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    enemyArray.forEach(enemy => {
        enemy.update()
        enemy.draw()
    })


    gameFrame++

    requestAnimationFrame(animate)
}

animate()