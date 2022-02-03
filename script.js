var t = [];
var bomb = [];
var buttonArray = [];
var boardSize;
var tableSize;
var numberOfBombs;
var numberOfFlags;
var numberOfMoves;
var firstMove;
var gameOver = false;
var bombPush;
var sekunda = 0;
var minuta = 0;
function createBoard() {
    t = [];
    for (row = 0; row < boardSize; row++) {
        t[row] = [];
        for (column = 0; column < boardSize; column++) {
            t[row][column] = 0;
        }
    }
}
function showBoard() {
    var table = document.createElement("table");
    table.setAttribute("id", "Tabela");
    buttonArray = [];
    for (let row = 0; row < boardSize; row++) {
        buttonArray[row] = [];
        var tr = document.createElement("tr");
        for (let column = 0; column < boardSize; column++) {

            td = document.createElement("td");
            td.innerHTML = t[row][column];
            td.className = "p" + t[row][column];

            let button = document.createElement("button");
            buttonArray[row][column] = button;
            button.addEventListener("click", function () {

                if (button.className == "pf") {
                    button.className = "";
                    numberOfFlags++;
                }
                odkryjPole(row, column);
            })
            button.addEventListener("contextmenu", function () {

                if (button.className != "pf" && numberOfFlags != 0 && button.className != "ps") {
                    button.className += "pf";
                    numberOfFlags--;
                }
                else if (button.className == "pf") {
                    button.className = "ps";
                    numberOfFlags++;
                }
                else if (button.className == "ps") {
                    button.className = "";
                }
                else {
                    button.className = "";
                }
                console.log(numberOfFlags);
            });
            td.appendChild(button);

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    var el = document.getElementById("board");
    el.appendChild(table);
}
function odkryjPole(row, column) {

    if (firstMove == true && t[row][column] === -1) {

        t[row][column] = 0;
        td.className = "p0";
        somsiad(row, column, -1);
        numberOfBombs++;
        setBombs();
        showBoard();
        document.getElementById("Tabela").remove();
    }

    if (t[row][column] === -1 && firstMove == false) {
        bombPush = true;
        czyWygralem();
    }
    firstMove = false;
    var button = buttonArray[row][column];
    if (button.style.display === "none") {
        return;
    }
    button.style.display = "none";
    if (t[row][column] === 0) {
        //z prawej
        if (column < boardSizeMinus1) {
            odkryjPole(row, column + 1);
        }
        // z lewej
        if (column > 0) {
            odkryjPole(row, column - 1);
        }
        // z góry
        if (row > 0) {
            odkryjPole(row - 1, column);
        }
        // z dołu
        if (row < boardSizeMinus1) {
            odkryjPole(row + 1, column);

        }
        // prawo góra
        if (row > 0 && column < boardSizeMinus1) {
            odkryjPole(row - 1, column + 1);

        }
        // lewo góra
        if (row > 0 && column > 0) {
            odkryjPole(row - 1, column - 1);

        }
        // lewo dół
        if (row < boardSizeMinus1 && column > 0) {
            odkryjPole(row + 1, column - 1);
        }
        // prawo dół
        if (row < boardSizeMinus1 && column < boardSizeMinus1) {
            odkryjPole(row + 1, column + 1);
        }

    }
    numberOfMoves--;
}
function somsiad(row, column, wartosc) {
    // z prawej
    if (column < boardSizeMinus1 && t[row][column + 1] != -1) {
        t[row][column + 1] += wartosc;
    }
    // z lewej
    if (column > 0 && t[row][column - 1] != -1) {
        t[row][column - 1] += wartosc;
    }
    // z góry
    if (row > 0 && t[row - 1][column] != -1) {
        t[row - 1][column] += wartosc;
    }
    // z dołu
    if (row < boardSizeMinus1 && t[row + 1][column] != -1) {
        t[row + 1][column] += wartosc;
    }
    // prawo góra
    if (row > 0 && column < boardSizeMinus1 && t[row - 1][column + 1] != -1) {
        t[row - 1][column + 1] += wartosc;
    }
    // lewo góra
    if (row > 0 && column > 0 && t[row - 1][column - 1] != -1) {
        t[row - 1][column - 1] += wartosc;
    }
    // lewo dół
    if (row < boardSizeMinus1 && column > 0 && t[row + 1][column - 1] != -1) {
        t[row + 1][column - 1] += wartosc;
    }
    // prawo dół
    if (row < boardSizeMinus1 && column < boardSizeMinus1 && t[row + 1][column + 1] != -1) {
        t[row + 1][column + 1] += wartosc;
    }
}
function setBombs() {

    while (numberOfBombs > 0) {
        var row = Math.floor(Math.random() * boardSize);
        var column = Math.floor(Math.random() * boardSize);
        if (t[row][column] != -1) {
            t[row][column] = -1;
            t[row][column].className += "bomb";
            somsiad(row, column, 1);
            numberOfBombs--;
        }
    }
}

addEventListener("contextmenu", function () {
    preventDefault();
});

function poziomTrudnoscOnmouse(nazwa) {
    switch (nazwa) {
        case "Easy":
            document.getElementById(nazwa).innerHTML = "Board Size: </br> 9x9<br>Number of Bombs: <br>10";
            break;
        case "Hard":
            document.getElementById(nazwa).innerHTML = "Board Size: </br> 16x16<br>Number of Bombs: <br>40";
            break;
        case "Brutal":
            document.getElementById(nazwa).innerHTML = "Board Size: </br> 24x24<br>Number of Bombs: <br>99";
            break;
        default:
            break;
    }

}
function startGry(x, y) {
    boardSize = x;
    numberOfBombs = y;
    firstMove = true;
    boardSizeMinus1 = boardSize - 1
    tableSize = Math.pow(boardSize, 2);
    numberOfFlags = numberOfBombs;
    numberOfMoves = tableSize - numberOfBombs;
    gameOver = false;
    document.getElementById("hideAll").style.display = "none";
    document.getElementById("victory").style.display = "block";
    createBoard();
    setBombs();
    showBoard();
}
function setGame(nazwa) {
    document.getElementById(nazwa).innerHTML = nazwa;

}
function czyWygralem() {
    if ((numberOfMoves == 0) && (numberOfFlags == 0) && (gameOver == false)) {
        gameOver = true;
        document.getElementById("Tabela").remove();
        document.getElementById("victory").style.display = "none";
        document.getElementById("Reset").style.display = "block";
        document.getElementById("score").innerHTML = "Victory";
    }
    else if (bombPush == true) {
        gameOver = true;
        bombPush = false;
        document.getElementById("Tabela").remove();
        document.getElementById("victory").style.display = "none";
        document.getElementById("Reset").style.display = "block";
        document.getElementById("score").innerHTML = "Game Over ";
    }
}

function reset() {
    document.getElementById("Reset").style.display = "none";
    document.getElementById("hideAll").style.display = "block";
    document.getElementById("score").innerHTML = "";
}