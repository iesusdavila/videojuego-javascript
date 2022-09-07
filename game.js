const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnup = document.querySelector("#up");
const btndown = document.querySelector("#down");
const btnleft = document.querySelector("#left");
const btnright = document.querySelector("#right");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

let canvasSize;
let elementsSize;

const playerPosition = {
  x: undefined,
  y: undefined,
};

function startGame() {
  game.font = elementsSize + "px Verdana";
  game.textAlign = "right";

  const map = maps[0];
  const arraymap = map.trim().split("\n");

  arraymap.forEach(
    (fila, indFila) => (arraymap[indFila] = fila.trim().split(""))
  );

  game.clearRect(0, 0, canvasSize, canvasSize);

  arraymap.forEach((fila, numFila) => {
    fila.forEach((caracter, posCaracter) => {
      const posX = elementsSize * (posCaracter + 1) + 10;
      const posY = elementsSize * (numFila + 1);

      if (caracter == "O" && !playerPosition.x && !playerPosition.y) {
        playerPosition.x = posX;
        playerPosition.y = posY;
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

window.addEventListener("keydown", moveByKeys);
btnup.addEventListener("click", moveUp);
btndown.addEventListener("click", moveDown);
btnleft.addEventListener("click", moveLeft);
btnright.addEventListener("click", moveRight);

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
  if (!(playerPosition.y - elementsSize < elementsSize)) {
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

function movePlayer() {
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}
