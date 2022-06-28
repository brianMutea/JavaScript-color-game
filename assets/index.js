let diffEls = document.querySelectorAll(".diff__btn");
let easy = document.querySelector(".easy");
let hard = document.querySelector(".hard");
let colorsEl = document.querySelector(".colors");
let colorsBlocks;
let rgbEl = document.querySelector(".rgb");
let h1_change_bg = document.getElementById('bg-change');
let statusEl = document.querySelector(".status");
let n = 6;

easy.addEventListener('click', () => {
  easy.classList.add('active');
  n = easy.innerHTML;
  if (hard.classList.contains('active')) {
    hard.classList.remove('active');
  }
  createBlocks(n);
  resetGame();
})

hard.addEventListener('click', () => {
  n = hard.innerHTML;
  hard.classList.add('active');
  if (easy.classList.contains('active')) {
    easy.classList.remove('active');
  }
  createBlocks(n);
  resetGame()
})


let colors = [];
createBlocks(n);
window.onload = resetGame();

function produceColor() {
  pickedColor = random(n);
  let randClr = colors[pickedColor];
  return randClr;

}

function resetGame() {
  createBlocks(n);
  document.body.style.color = "black";
  colors = [];
  pickColors();
  rgbEl.innerHTML = produceColor();
  setColors();
  statusEl.innerHTML =
    `Try to guess the right color based on the RGB value by clicking on the blocks.`;
  statusEl.style.color = '';
  h1_change_bg.style.backgroundColor = '';
}

function setColors() {
  for (let i = 0; i < colorsBlocks.length; i++) {
    colorsBlocks[i].style.backgroundColor = colors[i];
  }
}

function pickColors() {
  for (let i = 0; i < n; i++) {
    colors.push(randomColor());
  }
}

function randomColor() {
  return "rgb(" + random(255) + ", " + random(255) + ", " + random(255) + ")";
}

function random(r) {
  return Math.floor(Math.random() * r);
}

function checkColors(blockClr, block, colorsBlocks) {

  let winColor = rgbEl.textContent;
  if (blockClr === winColor) {
    h1_change_bg.style.backgroundColor = winColor;
    colorsBlocks.forEach(block => {
      block.style.backgroundColor = winColor;
    })
    statusEl.textContent = `Finally! Correct Guess!`;
    statusEl.style.color = `${winColor}`;

  } else {
    block.style.backgroundColor = '#ddd';
    statusEl.textContent = `Keep guessing...!`;
    statusEl.style.color = 'red';
  }
}

function createBlocks(num) {
  colorsEl.innerHTML = "";

  // here is an example of a loop that is used to create the blocks of color depending on you choice ie 6 or 9, however you need to add event listeners
  for (let i = 0; i < num; i++) {
    let block = document.createElement("div");
    block.classList.add("colors__block");
    colorsEl.appendChild(block);
  }
  colorsBlocks = document.querySelectorAll(".colors__block");
  
  colorsBlocks.forEach(block => {
    block.addEventListener('click', () => {
      checkColors(block.style.backgroundColor, block, colorsBlocks);
    })
  })
}
