const canvas = document.getElementById("target");
const context = canvas.getContext("2d"); //2次元描画


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

function MouseMoveFunc(e){
  context.clearRect(0,0,canvas.width,canvas.height);
  // クライアント座標系を基点としたマウスカーソルの座標を取得
  var mouse_x = e.clientX-100;
  var mouse_y = e.clientY-100;
  let array=[
    [240,240],
    [120,60],
    [360,120]
  ]
  triangle(context,array[0][0]+mouse_x,array[0][1]+mouse_y,
    array[1][0]+mouse_x,array[1][1]+mouse_y,array[2][0]+mouse_x,array[2][1]+mouse_y)

}

if(document.addEventListener){
  // マウスを移動するたびに実行されるイベント
  document.addEventListener("mousemove", MouseMoveFunc);

}




