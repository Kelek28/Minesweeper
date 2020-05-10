var t = [];
var bomba = [];
var buttonArray = [];
var wielkoscPlanszy;
var rozmiarTabeli;
var ileBomb;
var ileFlag;
var ileRuchow;
var firstMove;
var gameOver = false;
var bombPush;
var sekunda = 0;
var minuta = 0;
function UtworzPlansze() {
    t = [];
    for (wiersz = 0; wiersz < wielkoscPlanszy; wiersz++) {
        t[wiersz] = [];
        for (kolumna = 0; kolumna < wielkoscPlanszy; kolumna++) {
            t[wiersz][kolumna] = 0;
        }
    }
}
function PokazPlansze() {
    var table = document.createElement("table");
    table.setAttribute("id", "Tabela");
    buttonArray = [];
    for (let wiersz = 0; wiersz < wielkoscPlanszy; wiersz++) {
        buttonArray[wiersz] = [];
        var tr = document.createElement("tr");
        for (let kolumna = 0; kolumna < wielkoscPlanszy; kolumna++) {

            td = document.createElement("td");
            td.innerHTML = t[wiersz][kolumna];
            td.className = "p" + t[wiersz][kolumna];

            let button = document.createElement("button");
            buttonArray[wiersz][kolumna] = button;
            button.addEventListener("click", function () {
                
                if (button.className == "pf") {
                    button.className = "";
                    ileFlag++;
                }
                odkryjPole(wiersz, kolumna);
            })
            button.addEventListener("contextmenu", function () {
                 
                if (button.className != "pf" && ileFlag != 0 && button.className != "ps") {
                    button.className += "pf";
                    ileFlag--;
                }
                else if (button.className == "pf") {
                    button.className = "ps";
                    ileFlag++;
                }
                else if(button.className == "ps" ){
                    button.className = "";
                }
                else {
                    button.className = "";
                }
                console.log(ileFlag);
            });
            td.appendChild(button);

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    var el = document.getElementById("plansza");
    el.appendChild(table);
}
function odkryjPole(wiersz, kolumna) {
    
    if (firstMove == true && t[wiersz][kolumna] === -1) {
        
        t[wiersz][kolumna] = 0;
        td.className = "p0";
        somsiad(wiersz, kolumna, -1);
        ileBomb++;
        PostawBomby();
        PokazPlansze();
        document.getElementById("Tabela").remove();
    }
    // stoper
    // if(firstMove){
    //     console.log("wywołana")

    //         setInterval(function(){
    //             sekunda++;
    //             if(sekunda < 9){
    //     czas = "0"+minuta+" : 0" + sekunda;
    //   }
    //   if (sekunda > 9){

    //     czas = "0"+minuta+" : " + sekunda;
    //   } 
    //   if (sekunda > 60) {
    //       sekunda = 0;
    //     minuta++;
    //     czas = "0"+minuta+" : " + sekunda;
    //   }
      
    //   if (minuta > 9){
    //     czas= minuta+" : " + sekunda;;
    //   }
    
    //             document.getElementById("czas").innerHTML = czas; 
    //         },1000);
        
    // }
    if (t[wiersz][kolumna] === -1 && firstMove == false) {
        bombPush = true;
        czyWygralem();
    }
    firstMove = false;
    var button = buttonArray[wiersz][kolumna];
    if (button.style.display === "none") {
        return;
    }
    button.style.display = "none";
    if (t[wiersz][kolumna] === 0) {
        //z prawej
        if (kolumna < wielkoscPlanszyMinus1) {
            odkryjPole(wiersz, kolumna + 1);
        }
        // z lewej
        if (kolumna > 0) {
            odkryjPole(wiersz, kolumna - 1);
        }
        // z góry
        if (wiersz > 0) {
            odkryjPole(wiersz - 1, kolumna);
        }
        // z dołu
        if (wiersz < wielkoscPlanszyMinus1) {
            odkryjPole(wiersz + 1, kolumna);

        }
        // prawo góra
        if (wiersz > 0 && kolumna < wielkoscPlanszyMinus1) {
            odkryjPole(wiersz - 1, kolumna + 1);

        }
        // lewo góra
        if (wiersz > 0 && kolumna > 0) {
            odkryjPole(wiersz - 1, kolumna - 1);

        }
        // lewo dół
        if (wiersz < wielkoscPlanszyMinus1 && kolumna > 0) {
            odkryjPole(wiersz + 1, kolumna - 1);
        }
        // prawo dół
        if (wiersz < wielkoscPlanszyMinus1 && kolumna < wielkoscPlanszyMinus1) {
            odkryjPole(wiersz + 1, kolumna + 1);
        }

    }
    ileRuchow--;
}
function somsiad(wiersz, kolumna, wartosc) {
    // z prawej
    if (kolumna < wielkoscPlanszyMinus1 && t[wiersz][kolumna + 1] != -1) {
        t[wiersz][kolumna + 1] += wartosc;
    }
    // z lewej
    if (kolumna > 0 && t[wiersz][kolumna - 1] != -1) {
        t[wiersz][kolumna - 1] += wartosc;
    }
    // z góry
    if (wiersz > 0 && t[wiersz - 1][kolumna] != -1) {
        t[wiersz - 1][kolumna] += wartosc;
    }
    // z dołu
    if (wiersz < wielkoscPlanszyMinus1 && t[wiersz + 1][kolumna] != -1) {
        t[wiersz + 1][kolumna] += wartosc;
    }
    // prawo góra
    if (wiersz > 0 && kolumna < wielkoscPlanszyMinus1 && t[wiersz - 1][kolumna + 1] != -1) {
        t[wiersz - 1][kolumna + 1] += wartosc;
    }
    // lewo góra
    if (wiersz > 0 && kolumna > 0 && t[wiersz - 1][kolumna - 1] != -1) {
        t[wiersz - 1][kolumna - 1] += wartosc;
    }
    // lewo dół
    if (wiersz < wielkoscPlanszyMinus1 && kolumna > 0 && t[wiersz + 1][kolumna - 1] != -1) {
        t[wiersz + 1][kolumna - 1] += wartosc;
    }
    // prawo dół
    if (wiersz < wielkoscPlanszyMinus1 && kolumna < wielkoscPlanszyMinus1 && t[wiersz + 1][kolumna + 1] != -1) {
        t[wiersz + 1][kolumna + 1] += wartosc;
    }
}
function PostawBomby() {

    while (ileBomb > 0) {
        var wiersz = Math.floor(Math.random() * wielkoscPlanszy);
        var kolumna = Math.floor(Math.random() * wielkoscPlanszy);
        if (t[wiersz][kolumna] != -1) {
            t[wiersz][kolumna] = -1;
            t[wiersz][kolumna].className += "bomba";
            somsiad(wiersz, kolumna, 1);
            ileBomb--;
        }
    }
}

addEventListener("contextmenu", function () {
    event.preventDefault();
});

function poziomTrudnoscOnmouse(nazwa) {
    switch (nazwa) {
        case "Łatwy":
            document.getElementById(nazwa).innerHTML = "Wielkość planszy: </br> 9x9<br>Ilość Bomb: <br>10";
            break;
        case "Trudny":
            document.getElementById(nazwa).innerHTML = "Wielkość planszy: </br> 16x16<br>Ilość Bomb: <br>40";
            break;
        case "Brutalny":
            document.getElementById(nazwa).innerHTML = "Wielkość planszy: </br> 24x24<br>Ilość Bomb: <br>99";
            break;
        default:
            break;
    }

}
function startGry(x, y) {
    wielkoscPlanszy = x;
    ileBomb = y;
    firstMove = true;
    wielkoscPlanszyMinus1 = wielkoscPlanszy - 1
    rozmiarTabeli = Math.pow(wielkoscPlanszy, 2);
    ileFlag = ileBomb;
    ileRuchow = rozmiarTabeli - ileBomb;
    gameOver = false;
    document.getElementById("hideAll").style.display = "none";
    document.getElementById("wygrana").style.display = "block";
    UtworzPlansze();
    PostawBomby();
    PokazPlansze();
}
function poziomTrudnoscOutMouse(nazwa) {
    document.getElementById(nazwa).innerHTML = nazwa;

}
function czyWygralem() {
    if ((ileRuchow == 0) && (ileFlag == 0) && (gameOver == false)) {
        gameOver = true;
        document.getElementById("Tabela").remove();
        document.getElementById("wygrana").style.display = "none";
        document.getElementById("Reset").style.display = "block";
        document.getElementById("wynik").innerHTML = "&#128293;Wygrana&#128293;</br>&#128079&#128079&#128079";
    }
    else if (bombPush == true) {
        gameOver = true;
        bombPush = false;
        document.getElementById("Tabela").remove();
        document.getElementById("wygrana").style.display = "none";
        document.getElementById("Reset").style.display = "block";
        document.getElementById("wynik").innerHTML = "&#128557;Przegrana&#128557;</br>&#128078;&#128078;&#128078;";
    }
}

function reset() {
    document.getElementById("Reset").style.display = "none";
    document.getElementById("hideAll").style.display = "block";
    document.getElementById("wynik").innerHTML = "";
}