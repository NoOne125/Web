let radius;
let rectColor;
let step;
let borderColor;
let borderWidth;
let texturePath;
let msgPlay;
let msgStop;
let msgStart;
let msgClose;
let msgReload;
let msgCollision = "rect collided with border";
let msgCollisionrects = "rect collided with rect";
let msgOutOfBorder = "rect is out of border";
let oldText;

function readTextFile(file, callback) {
  let rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

function getJson() {
  readTextFile("data.json", function (text) {
    let parsedJson = JSON.parse(text);
    radius = parsedJson["radius"];
    rectColor = parsedJson["rect_color"];
    rectColor2 = parsedJson["rect_color_2"];
    step = parsedJson["step"];
    borderColor = parsedJson["border_color"];
    borderWidth = parsedJson["border_width"];
    texturePath = parsedJson["filepath"];
    msgPlay = parsedJson["msgPlayButton"];
    msgStop = parsedJson["msgStopButton"];
    msgStart = parsedJson["msgStartButton"];
    msgClose = parsedJson["msgCloseButton"];
    msgReload = parsedJson["msgReloadButton"];
  });
}

function getFormattedDate() {
  let d = new Date();
  d =
    d.getFullYear() +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + d.getDate()).slice(-2) +
    " " +
    ("0" + d.getHours()).slice(-2) +
    ":" +
    ("0" + d.getMinutes()).slice(-2) +
    ":" +
    ("0" + d.getSeconds()).slice(-2) +
    ":" +
    d.getMilliseconds();
  return d;
}

function messagesManage(message) {
  localStorage.setItem(
    "msg" + (localStorage.length + 1),
    getFormattedDate() + " " + message
  );
  document.getElementById("controls_messages").textContent = message;
}

function detectOutsideAnim(x, y) {
  let width = document.getElementById("canvas").width;
  let height = document.getElementById("canvas").height;
  let radiuss = Number.parseInt(radius) / 2;
  if (
    x + radiuss < 0 ||
    y - radiuss > height ||
    x - radiuss > width ||
    y + radiuss < 0
  ) {
    messagesManage(msgOutOfBorder);
    return true;
  }
  return false;
}

function detectCollision(x3, y3) {
  let width = document.getElementById("canvas").width;
  let height = document.getElementById("canvas").height;
  let radiuss = Number.parseInt(radius) / 2;
  if (
    (x3 + radiuss >= 0 && x3 - radiuss <= 0) ||
    (y3 - radiuss <= height && y3 + radiuss >= height) ||
    (x3 - radiuss <= width && x3 + radiuss >= width) ||
    (y3 + radiuss >= 0 && y3 - radiuss <= 0)
  ) {
    messagesManage(msgCollision);
    return true;
  }
  return false;
}

function ColissionRects(x,y,x2,y2) {
  let radiuss = Number.parseInt(radius);
  if (Math.abs(x-x2)<=radiuss && Math.abs(y-y2)<=radiuss) {
    messagesManage(msgCollisionrects);
    return true;
  }
  return false;
}

function drawrectangles(X, Y, X2, Y2, canvas, color, color2) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(X-radius/2, Y-radius/2, radius, radius)
  ctx.fillStyle = color2;
  ctx.fillRect(X2-radius/2, Y2-radius/2, radius, radius)
  ctx.fill();
}

function play() {
  let block3 = document.getElementById("block3");
  let text = document.querySelector("#block3 > p");
  oldText = text.cloneNode(true);
  block3.removeChild(text);

  getJson();

  let work = document.createElement("div");
  work.id = "work";
  work.style.width = "100%";
  work.style.height = "100%";
  work.style.position = "relative";

  let canvas = document.createElement("canvas");
  canvas.id = "canvas";
  canvas.style.position = "relative";
  canvas.style.bottom = "0";
  canvas.style.borderColor = `${borderColor}`;
  canvas.style.borderWidth = `${borderWidth}px`;
  canvas.style.borderStyle = "solid";
  canvas.style.backgroundImage = `url(${texturePath})`;
  canvas.style.backgroundRepeat = "repeat";

  let controls = document.createElement("div");
  controls.id = "controls";
  controls.style.position = "relative";

  let controls_buttons = document.createElement("div");
  controls_buttons.id = "controls_buttons";
  controls_buttons.style.position = "relative";
  controls_buttons.style.top = "0px";
  controls_buttons.style.left = "3%";
  controls_buttons.style.margin = "0";

  let controls_messages = document.createElement("div");
  controls_messages.id = "controls_messages";
  controls_messages.style.position = "relative";
  controls_messages.style.top = "0px";
  controls_messages.style.right = "3%";
  controls_messages.style.margin = "0";

  let btnClose = document.createElement("button");
  btnClose.id = "btnClose";
  btnClose.textContent = "Close";
  btnClose.addEventListener("click", closeAnim);

  let btnStart = document.createElement("button");
  btnStart.id = "btnStart";
  btnStart.textContent = "Start";
  btnStart.addEventListener("click", startAnim);

  controls_buttons.appendChild(btnClose);
  controls_buttons.appendChild(btnStart);
  controls.appendChild(controls_buttons);
  controls.appendChild(controls_messages);
  work.appendChild(controls);
  work.appendChild(canvas);

  block3.appendChild(work);

  canvas.width = work.offsetWidth - 10;
  canvas.height = work.offsetHeight - 50;
  x = (canvas.width - radius) * Math.random() + radius/2;
  y = (canvas.height - radius) * Math.random() + radius/2;
  x2 = (canvas.width - radius) * Math.random() + radius/2;
  y2 = (canvas.height - radius) * Math.random() + radius/2;
  drawrectangles(x,y,x2,y2, canvas, rectColor, rectColor2);

  messagesManage(msgPlay);
}

let x;
let y;
let x2;
let y2;

function startAnim() {
  messagesManage(msgStart);

  let controls_buttons = document.getElementById("controls_buttons");
  let btnStart = document.getElementById("btnStart");
  controls_buttons.removeChild(btnStart);

  let btnStop = document.createElement("button");
  btnStop.id = "btnStop";
  btnStop.textContent = "Stop";
  btnStop.addEventListener("click", stopAnim);
  controls_buttons.appendChild(btnStop);

  let direction = "l";
  let direction2 = "r";
  let currentStep = Number.parseInt(step);
  let canvas = document.getElementById("canvas");
  function makeMove(direction, direction2, currentStep, step, canvas, x, y, x2, y2) {
    setTimeout(() => {
      switch (direction) {
        case "l":
          x -= currentStep;
          if (detectCollision(x,y) || detectOutsideAnim(x,y)){
            direction = "r";
            x += 2* currentStep;
          }
          break;
        case "b":
          y += currentStep;
          if (detectCollision(x,y) || detectOutsideAnim(x,y)){
            direction = "t";
            y -= 2* currentStep;
          }
          break;
        case "r":
          x += currentStep;
          if (detectCollision(x,y) || detectOutsideAnim(x,y)){
            direction = "l";
            x -= 2* currentStep;
          }
          break;
        case "t":
          y -= currentStep;
          if (detectCollision(x,y) || detectOutsideAnim(x,y)){
            direction = "b";
            y += 2* currentStep;
          }
          break;
      }
      switch (direction) {
        case "l":
          direction = "b";
          break;
        case "b":
          direction = "r";
          break;
        case "r":
          direction = "t";
          break;
        case "t":
          direction = "l";
      }
      switch (direction2) {
        case "l":
          x2 -= currentStep;
          if (detectCollision(x2,y2) || detectOutsideAnim(x2,y2)){
            direction2 = "r";
            x2 += 2* currentStep;
          }
          break;
        case "b":
          y2 += currentStep;
          if (detectCollision(x2,y2) || detectOutsideAnim(x2,y2)){
            direction2 = "t";
            y2 -=2*  currentStep;
          }
          break;
        case "r":
          x2 += currentStep;
          if (detectCollision(x2,y2) || detectOutsideAnim(x2,y2)){
            direction2 = "l";
            x2 -=2*  currentStep;
          }
          break;
        case "t":
          y2 -= currentStep;
          if (detectCollision(x2,y2) || detectOutsideAnim(x2,y2)){
            direction2 = "b";
            y2 += 2* currentStep;
          }
          break;
      }
      switch (direction2) {
        case "l":
          direction2 = "b";
          break;
        case "b":
          direction2 = "r";
          break;
        case "r":
          direction2 = "t";
          break;
        case "t":
          direction2 = "l";
      }
      drawrectangles(x,y,x2,y2, canvas, rectColor, rectColor2);
      currentStep += step;
      if (ColissionRects(x,y,x2,y2) || detectOutsideAnim(x2,y2) || detectOutsideAnim(x,y)) {
        if (document.getElementById("btnReload") == null) {
          let controls_buttons = document.getElementById("controls_buttons");
          let btnStop = document.getElementById("btnStop");
          controls_buttons.removeChild(btnStop);

          let btnReload = document.createElement("button");
          btnReload.id = "btnReload";
          btnReload.textContent = "Reload";
          btnReload.addEventListener("click", reloadAnim);
          controls_buttons.appendChild(btnReload);
        }
      }
      if (
        !ColissionRects(x,y,x2,y2) &&
        !detectOutsideAnim(x,y)&&
        !detectOutsideAnim(x2,y2) &&
        document.getElementById("btnStart") == null
      )
        makeMove(direction, direction2, currentStep + step, step, canvas, x, y, x2, y2);
    }, 250);
  }
  makeMove(direction, direction2, currentStep, Number.parseInt(step), canvas, x, y, x2, y2);
}

function reloadAnim() {
  messagesManage(msgReload);

  let controls_buttons = document.getElementById("controls_buttons");
  let btnReload = document.getElementById("btnReload");
  controls_buttons.removeChild(btnReload);

  let btnStart = document.createElement("button");
  btnStart.id = "btnStart";
  btnStart.textContent = "Start";
  btnStart.addEventListener("click", startAnim);
  controls_buttons.appendChild(btnStart);

  let canvas = document.getElementById("canvas");
  x = (canvas.width - radius) * Math.random() + radius/2;
  y = (canvas.height - radius) * Math.random() + radius/2;
  x2 = (canvas.width - radius) * Math.random() + radius/2;
  y2 = (canvas.height - radius) * Math.random() + radius/2;
  drawrectangles(x,y,x2,y2, canvas, rectColor, rectColor2);
}

function stopAnim() {
  messagesManage(msgStop);

  let controls_buttons = document.getElementById("controls_buttons");
  let btnStop = document.getElementById("btnStop");
  controls_buttons.removeChild(btnStop);

  let btnStart = document.createElement("button");
  btnStart.id = "btnStart";
  btnStart.textContent = "Start";
  btnStart.addEventListener("click", startAnim);
  controls_buttons.appendChild(btnStart);
}

function closeAnim() {
  messagesManage(msgClose);
  let block3 = document.getElementById("block3");
  let work = document.getElementById("work");
  block3.removeChild(work);
  block3.appendChild(oldText);

  let navmenu = document.getElementById("navmenu");
  let oldList = document.getElementById("showAllMessages");
  if (oldList != null) {
    navmenu.removeChild(oldList);
  }

  let allMessages = document.createElement("ul");
  allMessages.id = "showAllMessages";
  for (let i = 0; i < localStorage.length; i++) {
    let li = document.createElement("li");
    li.appendChild(
      document.createTextNode(localStorage.getItem(`msg${i + 1}`))
    );
    allMessages.appendChild(li);
  }
  navmenu.appendChild(allMessages);

  localStorage.clear();
}

document.getElementById("play").addEventListener("click", play);