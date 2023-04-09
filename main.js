const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");

const startCells = ["", "", "", "", "", "", "", "", ""]

let go = "cross"
infoDisplay.textContent = "Cross inizia!";


function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("square");
        cellElement.id = index;
        cellElement.addEventListener("click", addGo)
        gameBoard.append(cellElement)

    })

}

createBoard();

function addGo(e) {
    const goDisplay = document.createElement("div");
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === "cross" ? "circle" : "cross";
    infoDisplay.textContent = "ora è il turno di " + go + " !";
    e.target.removeEventListener("click", addGo);
    e.target.setAttribute("localName", "premuto");
    console.log(e.target.localName);

    checkScore(e);

}

function checkScore(e) {
   // e.target.setAttribute(title,"ciao")
    console.log(e.target);

    const allSquareNodeList = document.querySelectorAll(".square");
const allSquare=Array.from(allSquareNodeList)
    const winningCombo = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8],
        [2, 4, 6]
    ]

    let circleWins= false;
    let crossWins= false;
    winningCombo.forEach((combo) => {
         circleWins = combo.every((cell) =>
            allSquare[cell].firstElementChild?.classList.contains('circle')


        )
        if (circleWins) {
            infoDisplay.textContent = "circle vince!"
            allSquare.forEach(square => {
                square.replaceWith(square.cloneNode(true))
                return;

            })
        }

    
    })

    winningCombo.forEach((combo) => {
         crossWins = combo.every((cell) =>
            allSquare[cell].firstElementChild?.classList.contains('cross')


        )
        if (crossWins) {
            infoDisplay.textContent = "cross vince!"
            allSquare.forEach(square => {
                square.replaceWith(square.cloneNode(true))
                
                return;
            })
        }
       
    })

    let bo=allSquare.every((cell,i) => {return  allSquare[i].getAttribute("localName") === "premuto"})

    if ( bo && circleWins == false && crossWins == false) {
        infoDisplay.textContent = "pareggio"
        console.log("ciao");
        return;
    }
    

}