const STAGE = 4;
const table = document.querySelector(".table");

class Panel{
    constructor(num, x, y){
        this.num=num;
        this.x=x;
        this.y=y;
    }
}

function getRandomInt(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function shuffle(){
    for(let i=1; i>=0; i--){
        let randomIndex=getRandomInt(i+1,16);
        let element = document.getElementById(String(i+1));
        let element1 = document.getElementById(String(randomIndex));
        let temp = element.textContent;
        element.textContent = element1.textContent;
        element1.textContent = temp;
        console.log(randomIndex,i+1);
    }
}

for(let i=0; i<STAGE; i++){
    let tr = document.createElement('tr');
    for(let j=0; j<STAGE; j++){
        let td = document.createElement('td');
        if (i+j*4+1 == 16){
            td.setAttribute('id', "blank");
            td.textContent=" ";
        }else{
            td.setAttribute('id', String(i+j*4+1));
            td.textContent=String(i+j*4+1);
        }
        td.classList.add('panel',50+100*j,50+100*i);
        tr.appendChild(td);
    }
    console.log(tr);
    table.appendChild(tr);
}
shuffle();

document.body.addEventListener("click",function(e){
    // click_x,click_yに対応する
    let td=e.target;
    const str = td.classList.value;
    const word = str.split(" ");
    // base_x,base_yに対応する
    let s = document.getElementById("blank");
    const str1 = s.classList.value;
    const word1 = str1.split(" ");
    let base_x=0;
    let base_y=0;
    let click_x=0;
    let click_y=0;
    if (word1.length == 3){
        base_x = parseInt(word1[1]);
        base_y = parseInt(word1[2]);
    }else{
        base_x = parseInt(word1[1]);
        base_y = parseInt(word1[1]);
    }
    if (word.length == 3){
        click_x = parseInt(word[1]);
        click_y = parseInt(word[2]);
    }else{
        click_x = parseInt(word[1]);
        click_y = parseInt(word[1]);
    }
    console.log(base_x, base_y);
    console.log(click_x, click_y);
    console.log(td);
    console.log(s);
    if (Math.abs(click_x-base_x)==100 && Math.abs(click_y-base_y)==0){
        let temp = td.textContent;
        td.textContent = s.textContent;
        s.textContent = temp;
        let temp1 = td.id;
        td.id = s.id;
        s.id = temp1;
        console.log(td.id);
        console.log(s.id);
    }
    if (Math.abs(click_x-base_x)==0 && Math.abs(click_y-base_y)==100){
        let temp = td.textContent;
        td.textContent = s.textContent;
        s.textContent = temp;
        let temp1 = td.id;
        td.id = s.id;
        s.id = temp1;
        console.log(td.id);
        console.log(s.id);
    }

})


