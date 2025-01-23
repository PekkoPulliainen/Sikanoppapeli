let dice_amount = 0;
let dicechoice1 = document.getElementById("1diebutton");
let dicechoice2 = document.getElementById("2dicebutton");
let questionText = document.getElementById("questionText");
let addPlayerButton = document.getElementById("addPlayer");
let nameInputBox = document.getElementById("inputName");
let playerName;
let playerAmount = 0;
let startGameButton = document.getElementById("startGame");
const players = [];

if (dice_amount === 0) {
    questionText.textContent = "Monta noppaa?";
}

function dieselect() {
    dice_amount = 1;
    console.log(dice_amount + " noppa");
    dicechoice1.style.display = "none";
    dicechoice2.style.display = "none";
    questionText.textContent = "Syötä pelaajamäärä ja nimet.";
    nameInputBox.style.display = "block";
    addPlayerButton.style.display = "block";
}

function dice2select() {
    dice_amount = 2;
    console.log("noppia " + dice_amount);
    dicechoice1.style.display = "none";
    dicechoice2.style.display = "none";
    questionText.textContent = "Syötä pelaajamäärä ja nimet.";
    nameInputBox.style.display = "block";
    addPlayerButton.style.display = "block";
}

function addPlayer() {
    if (nameInputBox.value != "") {
        playerName = nameInputBox.value;
        players.push({ nimi: playerName, pisteet: 0 });
        playerAmount += 1;
        console.log(players);

        if (players.length > 1) {
            console.log("Ready to start?");
            startGameButton.style.display = "block";
        }

        nameInputBox.value = "";
    } else {
        return;
    }
}

function startGame() {
    startGameButton.style.display = "none";
    nameInputBox.style.display = "none";
    addPlayerButton.style.display = "none";
}