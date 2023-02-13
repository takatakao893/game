// 0:空きマス 1:黒石 2:白石 8:盤の外
// 黒が先攻 白が後攻
class GBOARD{
    constructor(parent){
      this.parent = document.getElementById(parent);
  
      // 64マスの情報を保持する配列
      this.sq = new Array(64);
      for( let i=0; i<64; i++){
        // 1つのマスを表現する  div 要素
        let e = document.createElement('div');
        e.className = "sq";
  
        let x = (i % 8) * 29 + 12;
        let y = Math.floor( i/8 ) * 29 + 12;
        e.style.left = x + "px";
        e.style.top = y + "px";
  
        e.parent = this;
        e.myid = i;
        e.addEventListener( "click", function(){this.parent.OnClick(this.myid);});
  
        // 石を表現する div 要素
        let d = document.createElement('div');
        d.className = "disc";
        d.style.display = "none";
        e.appendChild(d);
        e.disc = d;
        
        this.parent.appendChild(e);
        this.sq[i] = e;
      }
    }
    // (x,y) のマスに石を置く
    //    d=0 : 石を消す
    //    d=1 : 黒石を置く
    //    d=2 : 白石を置く
    setDisc(x,y,d){
      let p = y * 8 + x;
      this.sq[p].disc.style.display = d == 0 ? "none" : "block";
      if(d>0){
        // 石の色の指定によって背景色を切り替える
        this.sq[p].disc.style.backgroundColor = d == 1 ? "black" : "white";
      }
    }
  
    // Othello bd を渡すことで盤面を表示
    update (bd){
      for(let y=0; y<8; y++){
        for(let x=0; x<8; x++){
          this.setDisc(x,y,bd.get(x,y));
        }
      }
    }
  
    OnClick (id){
      //Log( "click #" + id);
      OnClickBoard(id);
    }
  }
  
  class MoveInfo{
    constructor(){
      this.turn = 0;
      this.pos = 0;
      this.flips = 0;
      this.disc = new Array(100);
    }
    clear(){
      this.turn = 0;
      this.pos = 0;
      this.flips = 0;
    }
    addFlipDisc(p){ this.disc[this.flips++] = p;}
  }
  
  // 隣接するマスを求める
  const VECT = [ -10, -9, -8, -1, 1, 8, 9, 10];
  
  class Othello{
    constructor(){
      // 黒石 白石の情報を格納していく
      this.bd = new Array(91);
      for(let i=0; i<this.bd.length; i++){ this.bd[i]=8; }
      for(let y=0; y<8; y++){
        for(let x=0; x<8; x++){
          this.bd[this.pos(x,y)] = 0;
        }
      }
      this.bd[this.pos(3,3)] = 2;
      this.bd[this.pos(4,3)] = 1;
      this.bd[this.pos(3,4)] = 1;
      this.bd[this.pos(4,4)] = 2;
  
      this.moveinfo = new Array(60);
      // 手番
      this.mp = 0;
      this.mpmax = 0;
  
      this.turn = 1;
    }
    pos(x,y) {return (y+1) * 9 + x + 1;} // 2次元の数を1次元に
    // 1次元の数をpos_x,pos_yに分ける
    pos_x(p) {return p % 9 - 1;}
    pos_y(p) {return Math.floor(p/9)-1;}
  
    get(x,y){
      return this.bd[this.pos(x,y)];
    }
  
    move(x,y){
      let p = this.pos(x,y);
      if (this.bd[p] != 0){ // 空きマスでなければ、
        return 0;           // ここには打てない
      }
      // moveinfoのインスタンス生成
      let moveinfo = new MoveInfo();
      // 裏返した石の合計
      let flipdiscs = 0;
      let oppdisc = this.turn == 2 ? 1 : 2;
      // 8方向それぞれ考える
      for (let v=0; v<VECT.length; v++){
        let vect = VECT[v];
  
        let n=p+vect;
        let flip = 0;
        // 隣のマスから相手の石が1個以上連続して存在する
        while(this.bd[n] == oppdisc){
          n+=vect;
          flip++;
        }
        // その先に自分の石がある
        if (flip > 0 && this.bd[n] == this.turn){
          // 間にある石を裏返す
          for(let i=0; i<flip; i++){
            this.bd[n-=vect] = this.turn;
            // 間にある石の位置情報を保管
            moveinfo.addFlipDisc(n);
          }
          flipdiscs += flip;
        }
      }
  
      if (flipdiscs > 0){         // 打てた場合
        this.bd[p] = this.turn;   // 打ったマスを自分の石にする
        // 打った石の位置情報を保管
        moveinfo.pos = p;
        moveinfo.turn = this.turn;
        this.moveinfo[this.mp++] = moveinfo;
        this.mpmax = this.mp;
  
        this.setNextTurn();
      }
      return flipdiscs;
    }
    // 手番を変える
    setNextTurn (){
      // パスの判定が必要
      this.turn = this.turn == 2 ? 1 : 2;
      if (this.isPass(this.turn)){
        this.turn = this.turn == 2 ? 1 : 2;
        if (this.isPass(this.turn)){
          this.turn = 0;  // 終局
        }
      }
    }
    isPass (turn){
      for( let y=0; y<8; y++){
        for( let x=0; x<8; x++){
          if( this.canMove(x,y,turn)){
            return false;
          }
        }
      }
      return true;
    }
    canMove(x,y){
      let p = this.pos(x,y);
      if (this.bd[p] != 0){ // 空きマスでなければ、
        return false;           // ここには打てない
      }
      // 裏返した石の合計
      let flipdiscs = 0;
      let oppdisc = this.turn == 2 ? 1 : 2;
      // 8方向それぞれ考える
      for (let v=0; v<VECT.length; v++){
        let vect = VECT[v];
  
        let n=p+vect;
        let flip = 0;
        // 隣のマスから相手の石が1個以上連続して存在する
        while(this.bd[n] == oppdisc){
          n+=vect;
          flip++;
        }
        // その先に自分の石がある
        if (flip > 0 && this.bd[n] == this.turn){
          return true;
        }
      }
      return false;
    }
    unmove (){
      if(this.mp <= 0){
        return false;
      }
      let moveinfo = this.moveinfo[--this.mp];
      let opp = moveinfo.turn == 1 ? 2 : 1;
  
      for( let i=0; i<moveinfo.flips; i++){
        this.bd[moveinfo.disc[i]] = opp;
      }
      this.bd[moveinfo.pos]=0;
      this.turn = moveinfo.turn;
      return true;
    }
    forward (){
      if (this.mp >= this.mpmax){
        return false;
      }
      let moveinfo = this.moveinfo[this.mp++];
      let opp = moveinfo.turn == 1 ? 2 : 1;
  
      for(let i=0; i<moveinfo.flips; i++){
        this.bd[moveinfo.disc[i]] = moveinfo.turn;
      }
      this.bd[moveinfo.pos] = moveinfo.turn;
  
      this.setNextTurn();
      return true;
    }
  }
  // ログ表示領域に文字列 s を表示
  function Log ( s ){
    let e = document.getElementById( "logarea" );
    if( e ){
      e.innerHTML += s + "\n";
      e.scrollTop = e.scrollHeight
    }
  }
  let gBoard = null;
  let gOthello = null;
  
  function unmove(){
    if( gOthello.unmove()){
      gBoard.update(gOthello);
    }
  }
  
  function forward(){
    if( gOthello.forward()){
      gBoard.update(gOthello);
    }
  }
  
  function OnClickBoard (pos){
    let x = pos%8;
    let y = Math.floor(pos/8);
    // (x,y)に打つ
    if( gOthello.move(x,y)>0){
      gBoard.update(gOthello);
    }
  }
  
  // GBOARDのインスタンス生成
  gBoard = new GBOARD("board");
  
  // Othelloのインスタンス生成
  gOthello = new Othello();
  
  gBoard.update( gOthello );
  