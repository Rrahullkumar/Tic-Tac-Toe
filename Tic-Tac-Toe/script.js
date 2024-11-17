let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#resetbtn");
let newgbtn= document.querySelector("#newgamebutton");
let messagecontainer= document.querySelector(".msg-container");
let message= document.querySelector("#message");

let turno= true  //playerx,playery
let count=0;

const winpatterns =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]


const resetgame = ()=>{
    turno= true;
    count=0;
    enableboxes()
    message.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked")
        if(turno){
            box.innerText="O";
            turno=false;
        }else{
            box.innerText="X";
            turno=true;
        }
        box.disabled=true;
        checkWinner();
    })
})

const disableboxes= ()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableboxes= ()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner= (winner)=>{
    message.innerText=`Congratulations winner is ${winner}`;
    messagecontainer.classList.remove("hide");
    disableboxes();
}

const checkWinner= ()=>{
    for(let pattern of winpatterns){
        let post1val= boxes[pattern[0]].innerText;
        let post2val=boxes[pattern[1]].innerText;
        let post3val= boxes[pattern[2]].innerText;

        if (post1val != "" && post2val != "" && post3val !=""){
            if(post1val==post2val && post2val==post3val){
                console.log("winner", post1val)
                showWinner(post1val);
            }
        }
    }
}

newgbtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);