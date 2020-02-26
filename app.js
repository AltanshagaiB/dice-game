var isNewGame;

var activePlayer;
var scores;
var roundsScore;
var diceDom = window.document.querySelector(".dice");
initGame();

function initGame() {
  isNewGame = true;
  //тоглогчийн ээлжийг хадгалах хувьсагч
  activePlayer = 0;

  //toglogchdiin tsugluulsan onoog hadgalah huvisagch
  scores = [0, 0];

  //toglogchiin eeljinee tsugluulj baigaa onoog hadgalah huvisagch
  roundsScore = 0;
  // shoonii ali talaara buusniig hadgalah heregtei 1-6 gesen utgiig ene huvisagchid sanamsarguigeer uusgej ogno
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = prompt(
    "Тоглогч 1 та нэрээ оруулна уу!",
    "Name"
  );
  document.getElementById("name-1").textContent = prompt(
    "Тоглогч 2 та нэрээ оруулна уу!",
    "Name"
  );

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");

  diceDom.style.display = "none";
}

//Shoog shideh event listener
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (isNewGame !== false) {
    //1-6 dotorhi sanamsargvi neg toog gargaj avna
    var diceNumber = Math.floor(Math.random() * 6) + 1;
    //Shoonii zurgiig web deer gargaj irne
    diceDom.style.display = "block";
    //Buusan toond hargalzah zurgiig web deer gargaj irne
    diceDom.src = "dice-" + diceNumber + ".png";
    //Buusan too ni 1 ees ylgaatai bol idevhitei toglogchiin elljiig solino
    if (diceNumber !== 1) {
      roundsScore = roundsScore + diceNumber;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundsScore;
    } else {
      switchToNextPlayer();
    }
  }
});

//hold tovch
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (isNewGame) {
    scores[activePlayer] = scores[activePlayer] + roundsScore;
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 50) {
      isNewGame = false;
      document.getElementById("name-" + activePlayer).textContent = "Ялагч!!!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.toggle("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      diceDom.style.display = "none";
      activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
      document.getElementById("name-" + activePlayer).textContent =
        "Азгүй Динэг Бүгэс!!!";
    } else {
      switchToNextPlayer();
    }
  }
});

function switchToNextPlayer() {
  roundsScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //   diceDom.style.display = "none";
}
//shineer ehluuleh

document.querySelector(".btn-new").addEventListener("click", initGame);
