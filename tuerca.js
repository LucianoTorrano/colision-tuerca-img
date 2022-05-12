const tuercaImg = document.getElementById('tuerca');
const container = document.getElementById('contenedor-tuerca');
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;

const mouse = {
    x: null,
    y: null,
    radius : 50
}

addEventListener('mousemove',(e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
});

class ObjectBG{
    constructor({image,x,y}){
        this.position={
            x:x,
            y:y,
        }
        this.initX = x;
        this.initY = y;
        this.image = image;
        this.width = image.width;
        this.height = image.height;
        this.size = image.width;
    }
    draw(){
        c.drawImage(this.image,this.position.x,this.position.y);
    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        let forceDirectionX = 4*dx/distance;
        let forceDirectionY = 4*dy/distance;
        const returnSpeed = 4;
        // distancia donde la fuerza sobre la particula será cero
        const maxDistance = 100;
        let force = (maxDistance - distance)/maxDistance;
        if(force<0)force = 0;

        let directionX = (forceDirectionX*force*3);
        let directionY = (forceDirectionY*force*3);

        if(distance < mouse.radius +this.size){
            this.position.x -=directionX;
            this.position.y -=directionY;
        }else{
            // Con esto me aseguro que la particula vuelva a su posicion inicial
            if(this.position.x !== this.initX){
                let dx = this.position.x -this.initX;
                this.position.x -= dx/returnSpeed;
            }
            if(this.position.y !== this.initY){
                let dy = this.position.y - this.initY;
                this.position.y -=dy/returnSpeed;
            }
        }
    }
}
let tuerca = new ObjectBG({image:tuercaImg,x:300,y:200});


function animate(){
    requestAnimationFrame(animate);
    c.fillRect(0,0,canvas.width,canvas.height);
    tuerca.update();
}
animate();