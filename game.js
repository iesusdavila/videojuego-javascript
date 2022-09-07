const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnup = document.querySelector("#up");
const btndown = document.querySelector("#down");
const btnleft = document.querySelector("#left");
const btnright = document.querySelector("#right");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

window.addEventListener("keydown", moveByKeys);
btnup.addEventListener("click", moveUp);
btndown.addEventListener("click", moveDown);
btnleft.addEventListener("click", moveLeft);
btnright.addEventListener("click", moveRight);

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;
let enemiesPositions = [];

const playerPosition = {
  x: undefined,
  y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
};

function startGame() {
  game.font = elementsSize + "px Verdana";
  game.textAlign = "right";

  const map = maps[level];
  if (!map) {
    playerWin();
    return;
  }
  const arraymap = map.trim().split("\n");

  arraymap.forEach(
    (fila, indFila) => (arraymap[indFila] = fila.trim().split(""))
  );

  const enemiesArray = [];
  let enemiesTotal = 0;

  arraymap.forEach((fila, indFila) => {
    enemiesArray[indFila] = fila.filter((value) => value == "X");
    enemiesTotal += enemiesArray[indFila].length;
  });

  game.clearRect(0, 0, canvasSize, canvasSize);

  arraymap.forEach((fila, numFila) => {
    fila.forEach((caracter, posCaracter) => {
      const posX = elementsSize * (posCaracter + 1) + 10;
      const posY = elementsSize * (numFila + 1);

      if (caracter == "O" && !playerPosition.x && !playerPosition.y) {
        playerPosition.x = posX;
        playerPosition.y = posY;
      }

      if (caracter == "I" && !giftPosition.x && !giftPosition.y) {
        giftPosition.x = posX;
        giftPosition.y = posY;
      }

      if (caracter == "X" && enemiesPositions.length < enemiesTotal) {
        enemiesPositions.push({
          x: posX,
          y: posY,
        });
      }
      game.fillText(emojis[caracter], posX, posY);
    });
  });

  movePlayer();
}

function setCanvasSize() {
  window.innerHeight > window.innerWidth
    ? (canvasSize = window.innerWidth * 0.8)
    : (canvasSize = window.innerHeight * 0.8);

  canvas.setAttribute("width", canvasSize + 8);
  canvas.setAttribute("height", canvasSize + 15);

  elementsSize = canvasSize / 10;

  startGame();
}

function movePlayer() {
  const giftCollisionX =
    playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollisionY =
    playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);

  if (giftCollisionX && giftCollisionY) {
    nextLevel();
  }

  const enemyCollision = enemiesPositions.find((enemy) => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });

  if (enemyCollision) {
    lives--;
    if (lives == 0) {
      playerLoser();
      lives = 3;
    } else {
      restoreLevel();
    }
  }
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function restoreLevel() {
  restoreEnemyAndGift();
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function playerLoser() {
  level = 0;
  restoreEnemyAndGift();
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function nextLevel() {
  level++;
  restoreEnemyAndGift();
  startGame();
}

function restoreEnemyAndGift() {
  giftPosition.x = undefined;
  giftPosition.y = undefined;
  enemiesPositions = [];
  enemiesTotal = 0;
}

function playerWin() {
  console.log("GANO ESTE PELAVERGA");
}

function moveByKeys(event) {
  switch (event.code) {
    case "KeyW":
      moveUp();
      break;
    case "KeyS":
      moveDown();
      break;
    case "KeyA":
      moveLeft();
      break;
    case "KeyD":
      moveRight();
      break;
    default:
      break;
  }
  switch (event.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    default:
      break;
  }
}

function moveUp() {
  if (!(playerPosition.y - elementsSize < 0)) {
    playerPosition.y -= elementsSize;
  }
  startGame();
}

function moveDown() {
  if (!(playerPosition.y + elementsSize > canvasSize)) {
    playerPosition.y += elementsSize;
  }
  startGame();
}

function moveLeft() {
  if (!(playerPosition.x - elementsSize < elementsSize)) {
    playerPosition.x -= elementsSize;
  }
  startGame();
}

function moveRight() {
  if (!(playerPosition.x + elementsSize / 2 > canvasSize)) {
    playerPosition.x += elementsSize;
  }
  startGame();
}
