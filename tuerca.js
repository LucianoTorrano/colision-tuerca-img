const tuercaImg = document.getElementById('tuerca');
const container = document.getElementById('contenedor-tuerca');
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;

const mouse = {
    x: null,
    y: null,
    radius : 100
}
const returnSpeed = 60;
const densityFraction = 10;
const movementSpeed = .5;
addEventListener('mousemove',(e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
});

class ObjectBG{
    constructor({image,x,y,speed=0,range=0}){
        this.x=x +image.width/2;
        this.y=y + image.height/2;
        this.initX = x;
        this.initY = y;
        this.image = image;
        this.width = image.width;
        this.height = image.height;
        this.size = image.width;
        this.density = densityFraction;
        this.movement = {
            speed: speed,
            range: range
        }
        this.initRange = range;
    }
    draw(){
        c.drawImage(this.image,this.x - this.image.width/2.5,this.y-this.image.height/2.5);
    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        let forceDirectionX = 4*dx/distance;
        let forceDirectionY = 4*dy/distance;

        // distancia donde la fuerza sobre la particula será cero
        const maxDistance = 200;
        let force = (maxDistance - distance)/maxDistance;
        if(force<0)force = 0;

        let directionX = (forceDirectionX*force*this.density);
        let directionY = (forceDirectionY*force*this.density);

        if(distance < mouse.radius +this.size){
            this.x -=directionX;
            this.y -=directionY;
        }else{
            // Con esto me aseguro que la particula vuelva a su posicion inicial
            if(this.x !== this.initX){
                let dx = this.x -this.initX;
                this.x -= dx/returnSpeed;
            }
            if(this.y !== this.initY){
                let dy = this.y - this.initY;
                this.y -=dy/returnSpeed;
            }
        }
        this.draw();
    }
}
let tuercas = [new ObjectBG({image:tuercaImg,x:300,y:200,speed:.5,range:130}),
              new ObjectBG({image:tuercaImg,x:600,y:350,speed:1,range:150}),
              new ObjectBG({image:tuercaImg,x:360,y:500,speed:.3,range:90})];


              
/* MOVIMIENTO DE TUERCAS EN EL EJE Y 

let tl = gsap.timeline();
tl.from(tuercas[0],{
    duration: 5,
    y: tuercas[0].y -60,
    repeat: -1,
    yoyo: true
})
.from(tuercas[1],{
    duration: 3,
    y: tuercas[2].y -60,
    repeat: -1,
    yoyo: true
})
.from(tuercas[2],{
    duration: 4,
    y: tuercas[2].y -60,
    repeat: -1,
    yoyo: true
})
*/

function animate(){
    requestAnimationFrame(animate);
    c.fillRect(0,0,canvas.width,canvas.height);

    tuercas.forEach(tuerca =>{
        tuerca.update();
    })
}
animate();