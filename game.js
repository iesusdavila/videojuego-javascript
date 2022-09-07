const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

let canvasSize;
let elementsSize;

function startGame() {
  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[1];
  const arraymap = map.trim().split("\n");

  arraymap.forEach((element, value) => {
    arraymap[value] = element.trim();
  });

  for (let fila = 1; fila <= 10; fila++) {
    for (let columna = 1; columna <= 10; columna++) {
      game.fillText(
        emojis[arraymap[fila - 1][columna - 1]],
        elementsSize * columna + 10,
        elementsSize * fila
      );
    }
  }
}

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  startGame();
}
