const canvas = document.getElementById("target");
const context = canvas.getContext("2d"); //2次元描画
let degree = 0;

function triangle(fig,x1,y1,x2,y2,x3,y3,s){
  if (s==true){
    fig.beginPath(); //パスの作成
    fig.moveTo(x1,y1);
    fig.lineTo(x2,y2);
    fig.lineTo(x3,y3);
    fig.closePath();
    fig.fillStyle = "blue";
    fig.fill();
  }else{
    fig.beginPath(); 
    fig.moveTo(x1,y1);
    fig.lineTo(x2,y2);
    fig.lineTo(x3,y3);
    fig.closePath();
    fig.fillStyle = "black";
    fig.fill();
  }
}
// 三角形の重心 (3次元)
let center = (A) => [
    (A[0][0] + A[1][0] + A[2][0]) / 3,
    (A[0][1] + A[1][1] + A[2][1]) / 3,
    (A[0][2] + A[1][2] + A[2][2]) / 3
];
  
function draw(){
    context.clearRect(0,0,canvas.width,canvas.height);
    let V = [
      [0, 0, 0],
      [1, 0, 0],
      [0, 0, 1],
      [0, -1, 0]
    ]
    let F = [
      [0, 1, 2],
      [0, 1, 3],
      [1, 2, 3],
      [0, 2, 3]
    ]
    let width = canvas.width;
    let height = canvas.height;

    let S = V;
    let c = center(S);
    degree+=1
    r=(degree*Math.PI)/180
    let vx = new Array(4);
    let vy = new Array(4);
    let vz = new Array(4);

    for(let i=0; i<4; i++){
      vx[i] = S[i][0] - c[0];
      vy[i] = S[i][1] - c[1];
      vz[i] = S[i][2] - c[2];
  
      // ベクトルを回転
      S[i][0] = vx[i]*Math.cos(r) + vz[i]*Math.sin(r);
      S[i][1] = vy[i];
      S[i][2] = -vx[i]*Math.sin(r) + vz[i]*Math.cos(r);

      for(let j=0; j<3; j++){
          S[i][j]+=c[j];
      }
    }

    // 並行移動
    for(let i=0; i<4; i++){
      S[i] = [S[i][0],S[i][1]+0.5,S[i][2]+2];
    }
    let T = S;

    // ピンホールカメラ (透視投影)
    for(let i=0; i<4; i++){
      S[i] = [S[i][0]/S[i][2], S[i][1]/S[i][2]];
    }

    // 拡大 (画面の大きさに合わせて)
    for(let i=0; i<4; i++){
      S[i] = [S[i][0]/2*width+width/2, S[i][1]/2*height+height/2];
    }

    for(let i=0; i<F.length; i++){
      triangle(context,S[F[i][0]][0],S[F[i][0]][1],S[F[i][1]][0],S[F[i][1]][1],S[F[i][2]][0],S[F[i][2]][1],true); 
    }
    triangle(context,T[0][0],T[0][1]+150,T[1][0],T[1][1]+150,T[2][0],T[2][1]+150,false); 

}

setInterval("draw()",20);