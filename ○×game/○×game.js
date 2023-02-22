const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const GRID = 3;
let turn = 0;

canvas.width = 400;
canvas.height = 400;

canvas.setAttribute('style','display:block;margin:auto;background-color:#ddd');
document.body.appendChild(canvas);

const block = {
    width: null,
    height: null,
    data: [],

    update: function(){
        this.data.forEach(brick =>{
            ctx.strokeStyle='black';
            ctx.strokeRect(brick.x,brick.y,brick.width,brick.height);
        })
    }
}

const circle = {
    x: null,
    y: null,
    dx: canvas.width / GRID,
    dy: canvas.height / GRID,
    radius: null,
    data: [],
    color: null,

    judge: function(){
        // 横
        for(let i=0; i<GRID; i++){
            cnt=0;
            for(let j=0; j<GRID; j++){
                if (level[i][j]) cnt+=1;
            }
            if (cnt==GRID) return true;
        }
        // 縦
        for(let j=0; j<GRID; j++){
            cnt=0;
            for(let i=0; i<GRID; i++){
                if (level[i][j]) cnt+=1;
            }
            if (cnt==GRID) return true;
        }
        cnt=0;
        // 斜め
        for(let i=0; i<GRID; i++){
            if(level[i][i]) cnt+=1
        }
        if (cnt==GRID) return true;
        cnt=0;
        for(let i=0; i<GRID; i++){
            if(level[i][2-i]) cnt+=1
        }
        if (cnt==GRID) return true;
        return false;
    },

    assign: function(){
        this.data.forEach(ellipse =>{
            ctx.beginPath();
            ctx.arc(ellipse.x*canvas.width/GRID+canvas.width/(2*GRID),ellipse.y*canvas.height/GRID+canvas.height/(2*GRID),
            this.radius,0,Math.PI*2,true);
            ctx.strokeStyle='black';
            ctx.stroke();
        })
    },

    update: function(){
        ctx.beginPath();
        ctx.strokeStyle=this.color;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.stroke();
    }
}

const level = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
]

const cross ={
    x: null,
    y: null,
    dx: canvas.width/GRID,
    dy: canvas.height/GRID,
    color: null,
    data: [],

    assign: function(){
        this.data.forEach(line =>{
            ctx.beginPath();
            ctx.strokeStyle='black';
            s=canvas.width/GRID;
            t=canvas.height/GRID;
            ctx.moveTo(line.x*s,line.y*t);
            ctx.lineTo((line.x+1)*s,(line.y+1)*t);
            ctx.moveTo((line.x+1)*s,line.y*t);
            ctx.lineTo(line.x*s,(line.y+1)*t);
            ctx.stroke();
        })
    },
    judge: function(){
        // 横
        for(let i=0; i<GRID; i++){
            cnt=0;
            for(let j=0; j<GRID; j++){
                if (level1[i][j]) cnt+=1;
            }
            if (cnt==GRID) return true;
        }
        // 縦
        for(let j=0; j<GRID; j++){
            cnt=0;
            for(let i=0; i<GRID; i++){
                if (level1[i][j]) cnt+=1;
            }
            if (cnt==GRID) return true;
        }
        cnt=0;
        // 斜め
        for(let i=0; i<GRID; i++){
            if(level1[i][i]) cnt+=1
        }
        if (cnt==GRID) return true;
        cnt=0;
        for(let i=0; i<GRID; i++){
            if(level1[i][2-i]) cnt+=1
        }
        if (cnt==GRID) return true;
        return false;
    },
    update: function(){
        ctx.beginPath();
        ctx.strokeStyle=this.color;
        s=canvas.width/GRID;
        t=canvas.height/GRID;
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x+s,this.y+t);
        ctx.moveTo(this.x+s,this.y);
        ctx.lineTo(this.x,this.y+t);
        ctx.stroke();
    }
}

const level1 = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
]

const init = () =>{
    circle.x = canvas.width / (2*GRID);
    circle.y = canvas.height / (2*GRID);
    circle.radius = canvas.width / (2*GRID);
    circle.color = 'red';

    cross.x=0;
    cross.y=0;
    cross.color = 'red';

    block.width = canvas.width / GRID;
    block.height = canvas.height / GRID;

    for(let i=0; i<GRID; i++){
        for(let j=0; j<GRID; j++){
            block.data.push({
                x: block.width * j,
                y: block.height * i,
                width: block.width,
                height: block.height
            })
        }
    }
    console.log(block.data)
}
const loop = () =>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    block.update();
    if (turn%2==0){
        circle.update();
    }else{
        cross.update();
    }
    circle.assign();
    cross.assign();
}

init();
setInterval(loop,1000/15);

document.addEventListener('keydown',e=>{
    if (turn%2==0){
        switch(e.key){
            case 'ArrowLeft':
                circle.x -= circle.dx;
                if (circle.x<0) circle.x=canvas.width/(2*GRID)+(GRID-1)*canvas.width/GRID;
                break;
            case 'ArrowRight':
                circle.x += circle.dx;
                if (circle.x>canvas.width/(2*GRID)+(GRID-1)*canvas.width/GRID)
                circle.x = canvas.width/(2*GRID);
                break;
            case 'ArrowDown':
                circle.y += circle.dy;
                if (circle.y>canvas.height/(2*GRID)+(GRID-1)*canvas.height/GRID)
                circle.y = canvas.height/(2*GRID);
                break;
            case 'ArrowUp':
                circle.y -= circle.dy;
                if (circle.y<0) circle.y=canvas.height/(2*GRID)+(GRID-1)*canvas.height/GRID;
                break;
            case 'Enter':
                lx = Math.round(((circle.x-canvas.width/(2*GRID))*GRID)/canvas.width);
                ly = Math.round(((circle.y-canvas.height/(2*GRID))*GRID)/canvas.height);
                circle.data.push({
                    x: lx,
                    y: ly,
                })
                level[lx][ly]+=1;
                circle.x = canvas.width / (2*GRID);
                circle.y = canvas.height / (2*GRID);
                circle.color = 'red';
                console.log(circle.data);
                if(circle.judge()){
                    let text = document.getElementById("sampleArea").textContent;
                    document.getElementById("sampleArea").textContent='YouWin!';
                }
                turn+=1;
        }
    }else{
        switch(e.key){
            case 'ArrowLeft':
                cross.x -= cross.dx;
                if (cross.x<0) cross.x=(GRID-1)*canvas.width/GRID;
                break;
            case 'ArrowRight':
                cross.x += cross.dx;
                if (cross.x>(GRID-1)*canvas.width/GRID) cross.x=0;
                break;
            case 'ArrowDown':
                cross.y += cross.dy;
                if (cross.y>(GRID-1)*canvas.height/GRID) cross.y=0;
                break;
            case 'ArrowUp':
                cross.y -= cross.dy;
                if (cross.y<0) cross.y = (GRID-1)*canvas.height/GRID;
                break;
            case 'Enter':
                lx = cross.x*GRID/canvas.width;
                ly = cross.y*GRID/canvas.height;
                cross.data.push({
                    x: lx,
                    y: ly
                })
                level1[lx][ly]+=1;
                cross.x=0;
                cross.y=0;
                cross.color = 'red';
                if(cross.judge()){
                    let text = document.getElementById("sampleArea").textContent;
                    document.getElementById("sampleArea").textContent='YouLoss!';                    
                }
                turn+=1;
        }
    }
});