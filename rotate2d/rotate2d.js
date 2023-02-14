const canvas = document.getElementById("target");
const context = canvas.getContext("2d"); //2次元描画
let degree = 0; //変数角度を設定

let array=[
    [120,60],
    [360,120],
    [240,240]
]

function triangle(fig,x1,y1,x2,y2,x3,y3){
    fig.beginPath(); //パスの作成
    fig.moveTo(x1,y1);
    fig.lineTo(x2,y2);
    fig.lineTo(x3,y3);
    fig.closePath();
    fig.fillStyle = "blue";
    fig.fill();
    fig.lineWidth = 3;
    fig.strokeStyle = "black";
    fig.stroke();
}

let center = (A) => [
    (A[0][0] + A[1][0] + A[2][0]) / 3,
    (A[0][1] + A[1][1] + A[2][1]) / 3
];

function rotate(){
    context.clearRect(0,0,canvas.width,canvas.height);
    degree+=1
    r=(degree*Math.PI)/180
    let S = array;
    let vx = new Array(3);
    let vy = new Array(3);
    let x = new Array(3);
    let y = new Array(3);
    // 三角形の重心を求める
    let c = center(S);
    for(let i=0; i<3; i++){
        // 回転中心座標から回転する座標へのベクトルを求める
        vx[i] = S[i][0] - c[0];
        vy[i] = S[i][1] - c[1];
        // ベクトルを回転
        x[i] = vx[i]*Math.cos(r) - vy[i]*Math.sin(r);
        y[i] = vx[i]*Math.sin(r) + vy[i]*Math.cos(r);
        x[i]+=c[0];
        y[i]+=c[1];
    }

    triangle(context,x[0],y[0],x[1],y[1],x[2],y[2])
}

setInterval("rotate()",20);

