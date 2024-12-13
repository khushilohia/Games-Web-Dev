let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGamebtn = document.querySelector("#newbtn");
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg");

let turnO = true; //player O, Player X

const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        msgContainer.classList.add("hide");
        box.classList.remove("highlight");
        box.classList.remove("x", "o");
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box clicked");
        if (turnO) {
            box.innerText = "X";
            box.classList.add("x");
            turnO = false;
        }
        else {
            box.innerText = "O";
            box.classList.add("o");
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const resetGame = () => {
    turnO=true;
    enableBoxes();
}

const highlightPattern = (pattern) => {
    pattern.forEach((index) => {
        boxes[index].classList.add("highlight");
    });
}

const showWinner = (winner,pattern) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    highlightPattern(pattern);
    disableBoxes();
}

const checkWinner = () => {
    let isDraw=true;
    for (let pattern of winPattern) {
        
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                console.log("Winner", pos1);
                showWinner(pos1,pattern);
                return;
            }
        }
        for (let box of boxes){
            if(box.innerText==""){
                isDraw=false;
                break;
            }
        }
        if(isDraw){
            msg.innerText="Its a draw";
            msgContainer.classList.remove("hide");
            disableBoxes();
        }
    }
};

newGamebtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
