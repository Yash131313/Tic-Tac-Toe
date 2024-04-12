const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer; 
let gameGrid; //grid position

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

initGame();
//let's create the function to initialie the game
function initGame(){
    currentPlayer='X';
    gameGrid=["","","","","","","","",""]; //initially empty
    //UI pr empty kardo
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        box.classList.remove("win");

    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index); 
    })
});

function swapTurn(){
    if(currentPlayer==='X')
      currentPlayer='O';
    else
      currentPlayer='X';

    //UI update
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer="";
    winningPosition.forEach((position)=>{
        //aa 3 boxes are non empty and exactly same in value
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="" ) && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            //check if winner is X
            if(gameGrid[position[0]]==='X')
              answer = 'X';
            else
              answer = 'O';

            //disable pointer events on getting winner
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            //Now we know X/O is winner mark green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");


           
        }
    })

    //it means we have a winner
    if(answer!==""){
       gameInfo.innerText=`Winner Player - ${answer}`;
       newGameBtn.classList.add("active");
       return;
    }

    //we know no winner found,let's check whether ther is tie
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!="")
          fillCount++;
    })

    if(fillCount===9){
        gameInfo.innerText="Game Tied !";
        newGameBtn.classList.add("active");
    }

    //if game is not tied , not win it's in running state
}

function handleClick(index) {
    //box empty
    if(gameGrid[index]===""){
       boxes[index].innerText=`${currentPlayer}`; //UI mai change
       gameGrid[index]=currentPlayer; 
       boxes[index].style.pointerEvents="none";

       //swap turn karo
       swapTurn();

       //check koi jeet toh nahi gaya
       checkGameOver();
    }
}

newGameBtn.addEventListener("click",initGame);