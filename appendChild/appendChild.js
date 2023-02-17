var parent = document.getElementById("parent");
var idx = 4;

// 子要素を追加(新規)
function addChildCreate(){
    var child = document.createElement("div");
    addChild(child);
}

// 子要素を追加(コピー)
function addChildCopy(){
    // 先頭の子要素をコピーする
    var child = document.getElementById("parent").firstElementChild.cloneNode(true);
    addChild(child);
}

// 子要素を追加(既存の要素)
function addChildExist(){
    // 先頭の子要素を取得する
    var child = document.getElementById("parent").firstElementChild;
    addChild(child);
}

// 子要素を追加(共通)
function addChild(child){
    child.id = "child" + idx;
    child.innerText = "子要素" + idx;
    idx++;
    child = parent.appendChild(child);
}


