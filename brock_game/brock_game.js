const canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d');
canvas.width=500;
canvas.height=500;
canvas.setAttribute('style','display:block;margin:auto;background-color:#ddd');
document.body.appendChild(canvas);

const ball = {
    x: null,
    y: null,
    width: 10,
    height: 10,
    speed: 2,
    dx: null,
    dy: null,

    update: function(){
        ctx.fillStyle='yellow';
        ctx.strokeStyle='black';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x, this.y, this.width, this.height);

        if(this.x < 0 || this.x > canvas.width) this.dx *= -1;
        if(this.y < 0 || this.y > canvas.height) this.dy *= -1;
        this.x += this.dx;
        this.y += this.dy;
    }
}
const paddle = {
    x: null,
    y: null,
    width: 100,
    height: 15,
    speed: 0,

    update: function(){
        ctx.fillStyle="black"
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if(this.x>400) this.x=400;
        if(this.x<0) this.x=0;
        this.x += this.speed;
    }
}
const block = {
    width: null,
    height: 20,
    data: [],

    update: function(){
        this.data.forEach(brick => {
            ctx.fillStyle='blue';
            ctx.strokeStyle='black';
            ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
            ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        })
    }
}
const level = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,1,1,1,1,0],
    [0,1,1,1,1,0],
    [0,1,1,1,1,0],
    [0,1,1,1,1,0],
]
const floor = {
    x: 0,
    y: 500,
    width: canvas.width,
    height: 0
}

const init = () => {
    paddle.x = canvas.width / 2 - paddle.width/2;
    paddle.y = canvas.height - paddle.height - 100;


    ball.x = canvas.width / 2 - 100;
    ball.y = canvas.height / 2 - 100;
    ball.dx = ball.speed;
    ball.dy = ball.speed;

    block.width = canvas.width / level[0].length;

    for(let i=0; i<level.length; i++){
        for(let j=0; j<level[i].length; j++){
            if(level[i][j]){
                block.data.push({
                    x: block.width * j,
                    y: block.height * i,
                    width: block.width,
                    height: block.height
                })
            }
        }
    }
    console.log(block)

}
const collide = (obj1, obj2) => {
    return obj1.x < obj2.x + obj2.width &&
           obj2.x < obj1.x + obj1.width &&
           obj1.y < obj2.y + obj2.height &&
           obj2.y < obj1.y + obj1.height;
}
const loop = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    paddle.update();
    ball.update();
    block.update();

    if(collide(ball, paddle)){
        ball.dy *= -1;
        ball.y = paddle.y - ball.height;
    }
    if(collide(ball, floor)){
        let text = document.getElementById("sampleArea").textContent;
        document.getElementById("sampleArea").textContent="GameOver!";
        e.preventDefault();
    }
    if(block.data.length==0){
        let text = document.getElementById("sampleArea").textContent;
        document.getElementById("sampleArea").textContent="GameClear!";
        e.preventDefault();
    }
    block.data.forEach((brick, index) => {
        if(collide(ball, brick)){
            ball.dy *= -1;
            block.data.splice(index, 1);
        }
    })
    window.requestAnimationFrame(loop);
}

init();
loop();

document.addEventListener('keydown', e => {
    if(e.key == 'ArrowLeft') paddle.speed = -6;
    if(e.key == 'ArrowRight') paddle.speed = 6;
});
document.addEventListener('keyup', () => {paddle.speed=0;});