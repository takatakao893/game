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
    let F = [
      [0, 1, 2],
      [0, 1, 3],
      [1, 2, 3],
      [0, 2, 3]
    ]
    let width = canvas.width;
    let height = canvas.height;

    let S = V;
    // 並行移動
    for(let i=0; i<4; i++){
      S[i] = [S[i][0]+(mouse_x/120-2),S[i][1]+(mouse_y/120-2),S[i][2]+2];
    }

    // ピンホールカメラ (透視投影)
    for(let i=0; i<4; i++){
      S[i] = [S[i][0]/S[i][2], S[i][1]/S[i][2]];
    }

    // 拡大 (画面の大きさに合わせて)
    for(let i=0; i<4; i++){
      S[i] = [S[i][0]/2*width+width/2, S[i][1]/2*height+height/2];
    }

    for(let i=0; i<F.length; i++){
      triangle(context,S[F[i][0]][0],S[F[i][0]][1],S[F[i][1]][0],S[F[i][1]][1],S[F[i][2]][0],S[F[i][2]][1]);
    }
  }
  
  if(document.addEventListener){
    // マウスを移動するたびに実行されるイベント
    document.addEventListener("mousemove", MouseMoveFunc);
  
  }