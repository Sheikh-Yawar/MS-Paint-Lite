"use strict";
const canvas = document.querySelector(".canvas1");
const ctx = canvas.getContext("2d");
const header = document.querySelector("header");
const pen = document.querySelector(".fa-pen");
const eraser = document.querySelector(".fa-eraser");
const pen_color = document.querySelector(".pen_color");
const size = document.querySelector(".size");
const background_color = document.querySelector(".background_color");
const effect = document.querySelector(".effect");
const saveBtn = document.querySelector(".fa-save");
const resetCanvas = document.querySelector(".fa-rotate-right");
const downloadAnchorTag = document.querySelector(".download");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

let pColor = pen_color.value;
let bColor = background_color.value;
let lineSize = size.value;

let penSelected = true;
let eraserSelected = false;
let mouseDown = false;
let effectSelected = false;
let mousemove = false;

const changePenColor = (choice) => {
  let penSelected = choice && !effectSelected;
  if (penSelected) {
    pen.style.color = pColor;
    canvas.style.cursor = "crosshair";
  } else {
    pen.style.color = "grey";
  }
};
const changeEraserColor = (choice) => {
  let eraserSelected = choice && !effectSelected;
  if (eraserSelected) {
    eraser.style.color = bColor;
    canvas.style.cursor = "pointer";
  } else {
    eraser.style.color = "grey";
  }
};

const changeBackgroundColor = (bColor) => {
  canvas.style.backgroundColor = bColor;
};

background_color.addEventListener("change", (e) => {
  bColor = e.target.value;
  changeEraserColor(eraserSelected);
  changeBackgroundColor(bColor);
});

pen_color.addEventListener("change", (e) => {
  pColor = e.target.value;
  changePenColor(penSelected);
  changeEraserColor(eraserSelected);
});

pen.addEventListener("click", () => {
  penSelected = !penSelected;
  eraserSelected = false;
  changePenColor(penSelected);
});
eraser.addEventListener("click", () => {
  eraserSelected = !eraserSelected;
  penSelected = false;
  changePenColor(penSelected);
  changeEraserColor(eraserSelected);
});

size.addEventListener("change", (e) => {
  lineSize = e.target.value;
});

const mouse = {
  x: null,
  y: null,
};

const getMousePosition = (e) => {
  mouse.x = e.x;
  mouse.y = e.y - 110;
};
canvas.addEventListener("mousemove", (e) => {
  if (mouseDown && (penSelected || eraserSelected)) {
    getMousePosition(e);
    drawTo();
  }
});

const drawTo = () => {
  ctx.lineTo(mouse.x, mouse.y);
  ctx.stroke();
};
const drawFrom = (e, color) => {
  getMousePosition(e);
  ctx.moveTo(mouse.x, mouse.y);
  ctx.beginPath();
  ctx.lineWidth = lineSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = penSelected == true ? `${color}` : `${bColor}`;
};

canvas.addEventListener("mousedown", (e) => {
  drawFrom(e, pColor);
  mouseDown = true;
});
canvas.addEventListener("mouseup", () => {
  mouseDown = false;
});
resetCanvas.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
saveBtn.addEventListener("click", () => {
  downloadAnchorTag.href = canvas.toDataURL("image/jpg");
  downloadAnchorTag.download = "masterPiece.jpeg";
});

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 20 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
  }

  update() {
    if (this.x + this.size >= canvas.width || this.x - this.size < 0) {
      this.speedX = -this.speedX;
    }
    this.x += this.speedX;

    if (this.y + this.size >= canvas.height || this.y - this.size < 0) {
      this.speedY = -this.speedY;
    }

    this.y += this.speedY;
  }
  updateTrail() {
    this.update();
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

//Effects
let currentEffect = effect.value;
let effectId;
effect.addEventListener("change", (e) => {
  currentEffect = e.target.value;
  showEffect();
});

const showEffect = () => {
  if (currentEffect == "Moving-Balls") {
    removeEffect();
    mousemove = true;
    effectSelected = true;
    changePenColor(false);
    changeEraserColor(false);
    background_color.value = "#000000";
    changeBackgroundColor(background_color.value);
    canvas.addEventListener("mousemove", (e) => {
      if (mousemove) {
        let x = e.x;
        let y = e.y - 100;
        for (let i = 0; i < 2; i++) particlesArray.push(new Particle(x, y));
      }
    });
    movingBalls();
  } else if (currentEffect == "Snake-Effect") {
    removeEffect();

    effectSelected = true;
    changePenColor(false);
    changeEraserColor(false);
    background_color.value = "#000000";
    changeBackgroundColor(background_color.value);
    init1(200);
    snakeEffect();
  } else if (currentEffect == "Constellation-Effect") {
    removeEffect();
    mousemove = true;
    effectSelected = true;
    changePenColor(false);
    changeEraserColor(false);
    background_color.value = "#000000";
    changeBackgroundColor(background_color.value);
    init1(50);
    canvas.addEventListener("mousemove", (e) => {
      if (mousemove) {
        let x = e.x;
        let y = e.y - 100;
        for (let i = 0; i < 1; i++) particlesArray.push(new Particle(x, y));
      }
    });
    constellationEffect();
  } else if (currentEffect == "Trail-Effect1") {
    removeEffect();
    mousemove = true;
    effectSelected = true;
    changePenColor(false);
    changeEraserColor(false);
    background_color.value = "#000000";
    changeBackgroundColor(background_color.value);

    canvas.addEventListener("mousemove", (e) => {
      if (mousemove) {
        let x = e.x;
        let y = e.y - 100;
        for (let i = 0; i < 2; i++) particlesArray.push(new Particle(x, y));
      }
    });

    trailEffect1();
  } else if (currentEffect == "Trail-Effect2") {
    removeEffect();
    mousemove = true;
    effectSelected = true;
    changePenColor(false);
    changeEraserColor(false);
    background_color.value = "#000000";
    changeBackgroundColor(background_color.value);

    canvas.addEventListener("mousemove", (e) => {
      if (mousemove) {
        let x = e.x;
        let y = e.y - 100;
        for (let i = 0; i < 2; i++) particlesArray.push(new Particle(x, y));
      }
    });

    trailEffect2();
  } else if (currentEffect == "Mystic-Effect") {
    removeEffect();
    mousemove = true;
    effectSelected = true;
    changePenColor(false);
    changeEraserColor(false);
    background_color.value = "#000000";
    changeBackgroundColor(background_color.value);

    canvas.addEventListener("mousemove", (e) => {
      if (mousemove) {
        let x = e.x;
        let y = e.y - 100;
        for (let i = 0; i < 2; i++) particlesArray.push(new Particle(x, y));
      }
    });

    mysticEffect();
  } else {
    removeEffect();
    effectSelected = false;
    changePenColor(true);
  }
};
let particlesArray = [];
const colorsArray = ["#fb8500", "#023047", "#219ebc", "#8ecae6"];
const init1 = (size) => {
  for (let i = 0; i < size; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.width;
    particlesArray.push(new Particle(x, y));
  }
};

const removeEffect = () => {
  mousemove = false;
  particlesArray = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cancelAnimationFrame(effectId);
};

const handleParticles = () => {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
};

const trailParticles = () => {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].updateTrail();
    particlesArray[i].draw();
    if (particlesArray[i].size <= 0.5) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
};

const constellationParticles = () => {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    for (let j = i; j < particlesArray.length; j++) {
      const base = particlesArray[i].x - particlesArray[j].y;
      const height = particlesArray[i].y - particlesArray[j].y;

      const distance = Math.sqrt(base * base + height * height);

      if (distance < 80) {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
};
const movingBalls = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  effectId = requestAnimationFrame(movingBalls);
};

const snakeEffect = () => {
  handleParticles();
  effectId = requestAnimationFrame(snakeEffect);
};

const trailEffect1 = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  trailParticles();
  effectId = requestAnimationFrame(trailEffect1);
};
const trailEffect2 = () => {
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  trailParticles();
  effectId = requestAnimationFrame(trailEffect2);
};

const constellationEffect = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  constellationParticles();
  effectId = requestAnimationFrame(constellationEffect);
};

const mysticEffect = () => {
  trailParticles();
  effectId = requestAnimationFrame(mysticEffect);
};
