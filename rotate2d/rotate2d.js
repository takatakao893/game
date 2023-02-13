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
    // 三角形の重心を求める
    let c = center(S);
    // 回転中心座標から回転する座標へのベクトルを求める
    let vx1 = S[0][0] - c[0];
    let vy1 = S[0][1] - c[1];
    // ベクトルを回転
    let x1 = vx1*Math.cos(r) - vy1*Math.sin(r);
    let y1 = vx1*Math.sin(r) + vy1*Math.cos(r);
    x1+=c[0];
    y1+=c[1];
    let vx2 = S[1][0] - c[0];
    let vy2 = S[1][1] - c[1];
    let x2 = vx2*Math.cos(r) - vy2*Math.sin(r);
    let y2 = vx2*Math.sin(r) + vy2*Math.cos(r);
    x2+=c[0];
    y2+=c[1];
    let vx3 = S[2][0] - c[0];
    let vy3 = S[2][1] - c[1];
    let x3 = vx3*Math.cos(r) - vy3*Math.sin(r);
    let y3 = vx3*Math.sin(r) + vy3*Math.cos(r);
    x3+=c[0];
    y3+=c[1];

    triangle(context,x1,y1,x2,y2,x3,y3)
}

setInterval("rotate()",20);
  
    