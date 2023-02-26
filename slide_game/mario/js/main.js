'use strict';
window.onload=function(){
    //コンストラクタ作成
    function Panel(num,x,y){
        this.num=num;
        this.x=x;
        this.y=y;
        this.front;
        this.setFront=function(){
            this.front=`${this.num<10?'0':''}${this.num}.png`;
        }
    }
    //パネル配列作成
    const panels=[];
    const STAGE=4;
    for(let i=0; i<STAGE; i++){
        for(let j=0; j<STAGE; j++){
            let panel=new Panel(4*i+j,50+100*i,50+100*j);
            panel.setFront();
            panels.push(panel)
        }
    }
    console.log(panels)

    function getRandomInt(min,max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    function shuffle(){
        // 画像を入れ替える
        for(let i=1; i>=0; i--){
            let randomIndex=getRandomInt(i,15)
            var temp1=panels[randomIndex].front;
            panels[randomIndex].front=panels[i].front;
            panels[i].front=temp1;
        }
    }
    shuffle();

    const table = document.querySelector(".table");
    for(let i=0; i<STAGE; i++){
        let tr=document.createElement('tr');
        for(let j=0; j<STAGE; j++){
            let td=document.createElement('td');
            let tempPanel=panels[i+j*4];
            td.classList.add('panel',50+100*j,50+100*i);
            td.style.backgroundImage=`url(img/${tempPanel.front})`;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    function search_blank(array){

        for(let i=0; i<4; i++){
            for(let j=0; j<4; j++){
                if(array[4*i+j].front=='03.png'){
                    return array[4*i+j].num
                }
            }
        }
    }
    function search_object(array,word_x,word_y){
        let check=0;
        for(let i=0; i<4; i++){
            for(let j=0; j<4; j++){
                if(array[check].x==word_x && array[check].y==word_y){
                    return check
                }
                check+=1
            }
        }
    }

    document.body.addEventListener( "click", function(e) {
        let td=e.target;
        const str =td.classList.value
        const word = str.split(" ");
        let check=search_blank(panels)
        let base_x=panels[check].x
        let base_y=panels[check].y
        console.log(str);
        console.log(check)
        if (word[2]==null){
            console.log(word[1],word[1]);
            word[2]=word[1]
        }else{
            console.log(word[1],word[2]);
        }
        if (Math.abs(word[1]-base_x)==100 && Math.abs(word[2]-base_y)==0){
            let obj = search_object(panels,parseInt(word[1]),parseInt(word[2]))
            let temp = panels[obj].front;
            panels[obj].front=panels[check].front;
            panels[check].front=temp;
        }
        if (Math.abs(word[1]-base_x)==0 && Math.abs(word[2]-base_y)==100){
            let obj = search_object(panels,parseInt(word[1]),parseInt(word[2]))
            let temp = panels[obj].front;
            panels[obj].front=panels[check].front;
            panels[check].front=temp;
        }
        for (let i=0; i<STAGE; i++){
            table.removeChild(table.firstChild);
        }

        for(let i=0; i<STAGE; i++){
            let tr=document.createElement('tr');
            for(let j=0; j<STAGE; j++){
                let td=document.createElement('td');
                let tempPanel=panels[i+j*4];
                td.classList.add('panel',50+100*j,50+100*i);
                td.style.backgroundImage=`url(img/${tempPanel.front})`;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        console.log(panels)
    });

}