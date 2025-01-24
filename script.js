let dice_amount = 0;
let dicechoice1 = document.getElementById("1diebutton");
let dicechoice2 = document.getElementById("2dicebutton");
let questionText = document.getElementById("questionText");
let addPlayerButton = document.getElementById("addPlayer");
let nameInputBox = document.getElementById("inputName");
let playerName;
let playerAmount = 0;
let startGameButton = document.getElementById("startGame");
let playerDisplay = document.getElementById("playerDisplay");
let currentTurn = 0;
let diceButton = document.getElementById("throwDice");
let dontThrowButton = document.getElementById("dontThrow");
let rollAgainButton = document.getElementById("rollAgain");
let diceRoll1;
let diceRoll2;
let newRoll1;
let newRoll2;
let roundPoints = 0;
let voittaja;
let baseMusic;
let totalPointsText = document.getElementById("totalPoints")

const musicTracks = [
  "audio/music1.mp3",
  "audio/music2.mp3",
];

baseMusic = document.querySelector(".baseMusic");

selectRandomMusic();

const players = [];

if (dice_amount === 0) {
  questionText.textContent = "Monta noppaa?";
}

function selectRandomMusic() {
  const randomIndex = Math.floor(Math.random() * musicTracks.length);
  const selectedTrack = musicTracks[randomIndex];
  baseMusic.src = selectedTrack;
  console.log(selectedTrack);
}


function dieselect() {
  dice_amount = 1;
  dicechoice1.style.display = "none";
  dicechoice2.style.display = "none";
  questionText.textContent = "Syötä pelaajamäärä ja nimet.";
  nameInputBox.style.display = "block";
  addPlayerButton.style.display = "block";
}

function dice2select() {
  dice_amount = 2;
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
    playerDisplay.style.display = "block";
    playerDisplay.textContent = players.map((player) => player.nimi).join(", ");

    if (players.length > 1) {
      console.log("Ready to start?");
      startGameButton.style.display = "block";
    }

    if (players.length === 10) {
      console.log("Player limit reached.");
      addPlayerButton.style.display = "none";
      nameInputBox.style.display = "none";
    }

    nameInputBox.value = "";
  } else {
    return;
  }
}

function startGame() {
  playerDisplay.style.display = "none";
  startGameButton.style.display = "none";
  nameInputBox.style.display = "none";
  addPlayerButton.style.display = "none";
  questionText.textContent = players[currentTurn].nimi + " heitä noppaa!";
  totalPointsText.textContent = "Pelaajan " + players[currentTurn].nimi + " pisteet: " + players[currentTurn].pisteet
  diceButton.style.display = "block";
  diceButton.textContent = "Heitä";
  startGameButton.textContent = "seuraava vuoro";
}

function rollDice() {
  diceRoll1 = Math.floor(Math.random() * 6) + 1;
  if (dice_amount === 1) {
    if (diceRoll1 === 1) {
      questionText.textContent =
        players[currentTurn].nimi + " heitit " + diceRoll1 + " vuorosi on ohi!";
      currentTurn = (currentTurn + 1) % players.length;
      startGameButton.style.display = "block";
      dontThrowButton.style.display = "none";
      rollAgainButton.style.display = "none";
      diceButton.style.display = "none";
      roundPoints = 0;
      return;
    }
    roundPoints += diceRoll1;
    questionText.textContent =
      players[currentTurn].nimi +
      " heitit " +
      diceRoll1 +
      "! Pisteet: " +
      roundPoints;
      totalPointsText.textContent = "Pelaajan " + players[currentTurn].nimi + " oikeat pisteet: " + players[currentTurn].pisteet + " + " + roundPoints;
    totalPointsText.style.display = "block";
    dontThrowButton.style.display = "block";
  } else {
    diceRoll2 = Math.floor(Math.random() * 6) + 1;
    if (diceRoll1 === 1 || diceRoll2 === 1) {
      questionText.textContent =
        players[currentTurn].nimi +
        " heitit " +
        diceRoll1 +
        " ja " +
        diceRoll2 +
        " vuorosi on ohi!";
      currentTurn = (currentTurn + 1) % players.length;
      startGameButton.style.display = "block";
      dontThrowButton.style.display = "none";
      rollAgainButton.style.display = "none";
      diceButton.style.display = "none";
      roundPoints = 0;
      return;
    }
    if (diceRoll1 === diceRoll2) {
      roundPoints += (diceRoll1 + diceRoll2) * 2;
    } else {
      roundPoints += diceRoll1 + diceRoll2;
    }
    questionText.textContent =
      players[currentTurn].nimi +
      " heitit " +
      diceRoll1 +
      " ja " +
      diceRoll2 +
      "! Pisteet: " +
      roundPoints;
    totalPointsText.textContent = "Pelaajan " + players[currentTurn].nimi + " oikeat pisteet: " + players[currentTurn].pisteet + " + " + roundPoints;
    totalPointsText.style.display = "block";  
    dontThrowButton.style.display = "block";
  }
}

function dontRoll() {
  players[currentTurn].pisteet += roundPoints;
  if (players[currentTurn].pisteet >= 100) {
    voittaja = players[currentTurn].nimi;
    endGame();
    return;
  }
  diceButton.textContent = "Seuraava vuoro";
  rollAgainButton.style.display = "none";
  dontThrowButton.style.display = "none";
  questionText.textContent =
    players[currentTurn].nimi + " pisteesi: " + players[currentTurn].pisteet;
    totalPointsText.textContent = "Pelaajan " + players[currentTurn].nimi + " pisteet: " + players[currentTurn].pisteet
  currentTurn = (currentTurn + 1) % players.length;
  roundPoints = 0;
}

function endGame() {
  const winsound = new Audio("audio/five-nights-at-freddys-6-am.mp3")
  winsound.play()
  document.body.innerHTML = "";

  const victoryText = document.createElement("voittoText");
  victoryText.innerText = "Voittaja on " + voittaja + "!";
  victoryText.style.display = "block";
  victoryText.style.padding = "10px 20px";
  victoryText.style.fontSize = "4vw";
  victoryText.style.position = "absolute";
  victoryText.style.top = "40%";
  victoryText.style.left = "30%";

  const restartButton = document.createElement("button");
  restartButton.innerText = "Restart Game";
  restartButton.style.display = "block";
  restartButton.style.margin = "20px auto";
  restartButton.style.padding = "10px 20px";
  restartButton.style.fontSize = "1.5rem";
  restartButton.style.cursor = "pointer";

  restartButton.onclick = () => {
    location.reload();
  };
  document.body.appendChild(victoryText);
  document.body.appendChild(restartButton);
}
