const canvas = document.getElementById("target");
const context = canvas.getContext("2d"); //2次元描画

function triangle(fig,x1,y1,x2,y2,x3,y3){
    fig.beginPath(); //パスの作成
    fig.moveTo(x1,y1);
    fig.lineTo(x2,y2);
    fig.lineTo(x3,y3);
    fig.closePath();
    fig.stroke();
  }
  
  function MouseMoveFunc(e){
    context.clearRect(0,0,canvas.width,canvas.height);
    // クライアント座標系を基点としたマウスカーソルの座標を取得
    var mouse_x = e.clientX-100;
    var mouse_y = e.clientY-100;
    let V = [
      [0, 0, 0],
      [1, 0, 0],
      [0, 0, 1],
      [0, -1, 0]
    ]
    let width = canvas.width;
    let height = canvas.height;

    let S = V;
    // 並行移動
    S[0] = [S[0][0]+(mouse_x/120-2),S[0][1]+(mouse_y/120-2),S[0][2]+2];
    S[1] = [S[1][0]+(mouse_x/120-2),S[1][1]+(mouse_y/120-2),S[1][2]+2];
    S[2] = [S[2][0]+(mouse_x/120-2),S[2][1]+(mouse_y/120-2),S[2][2]+2];
    S[3] = [S[3][0]+(mouse_x/120-2),S[3][1]+(mouse_y/120-2),S[3][2]+2];

    // ピンホールカメラ (透視投影)
    S[0] = [S[0][0]/S[0][2], S[0][1]/S[0][2]];
    S[1] = [S[1][0]/S[1][2], S[1][1]/S[1][2]];
    S[2] = [S[2][0]/S[2][2], S[2][1]/S[2][2]];
    S[3] = [S[3][0]/S[3][2], S[3][1]/S[3][2]];

    // 拡大 (画面の大きさに合わせて)
    S[0] = [S[0][0]/2*width+width/2, S[0][1]/2*height+height/2];
    S[1] = [S[1][0]/2*width+width/2, S[1][1]/2*height+height/2];
    S[2] = [S[2][0]/2*width+width/2, S[2][1]/2*height+height/2];
    S[3] = [S[3][0]/2*width+width/2, S[3][1]/2*height+height/2];

    triangle(context,S[0][0],S[0][1],S[2][0],S[2][1],S[1][0],S[1][1]);
    triangle(context,S[0][0],S[0][1],S[1][0],S[1][1],S[3][0],S[3][1]);
    triangle(context,S[1][0],S[1][1],S[2][0],S[2][1],S[3][0],S[3][1]);
    triangle(context,S[0][0],S[0][1],S[3][0],S[3][1],S[2][0],S[2][1]);
  }
  
  if(document.addEventListener){
    // マウスを移動するたびに実行されるイベント
    document.addEventListener("mousemove", MouseMoveFunc);
  
  }