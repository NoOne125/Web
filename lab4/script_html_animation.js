let radius;
let rectColor;
let rectColor2;
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
    console.log(text);
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
    ":" + d.getMilliseconds();
  return d;
}

function messagesManage(message) {
  localStorage.setItem(
    "msg" + (localStorage.length + 1),
    getFormattedDate() + " " + message
  );
  document.getElementById("controls_messages").textContent = message;
}
//NENNENENEKOIJERITHRHRU\g
function detectOutsideAnim() {
  let rectangle = document.getElementById("rectangle");
  let anim = document.getElementById("anim");
  if (
    rectangle.offsetLeft + rectangle.offsetWidth < 0 ||
    rectangle.offsetLeft - rectangle.offsetWidth > anim.offsetWidth ||
    rectangle.offsetTop + rectangle.offsetHeight < 0 ||
    rectangle.offsetTop - rectangle.offsetHeight > anim.offsetHeight
  ) {
    messagesManage(msgOutOfBorder);
    return true;
  }
  return false;
}

function detectOutsideAnim2() {
  let rectangle = document.getElementById("rectangle2");
  let anim = document.getElementById("anim");
  if (
    rectangle.offsetLeft + rectangle.offsetWidth < 0 ||
    rectangle.offsetLeft - rectangle.offsetWidth > anim.offsetWidth ||
    rectangle.offsetTop + rectangle.offsetHeight < 0 ||
    rectangle.offsetTop - rectangle.offsetHeight > anim.offsetHeight
  ) {
    messagesManage(msgOutOfBorder);
    return true;
  }
  return false;
}
//NENNENENEKOIJERITHRHRU\g
function detectCollision() {
  let rectangle = document.getElementById("rectangle");
  let anim = document.getElementById("anim");
  if (
    (rectangle.offsetLeft <= 0 && rectangle.offsetLeft + rectangle.offsetWidth >= 0) ||
    (rectangle.offsetLeft >= anim.offsetWidth &&
      rectangle.offsetLeft - rectangle.offsetWidth <= anim.offsetWidth) ||
    (rectangle.offsetTop <= 0 && rectangle.offsetTop + rectangle.offsetHeight >= 0) ||
    (rectangle.offsetTop >= anim.offsetHeight &&
      rectangle.offsetTop - rectangle.offsetHeight <= anim.offsetHeight)
  ) {
    messagesManage(msgCollision);
    return true;
  }
  return false;
}

function ColissionRects() {
  let rectangle = document.getElementById("rectangle");
  let rectangle2 = document.getElementById("rectangle2");
  if (Math.abs(rectangle.offsetLeft - rectangle2.offsetLeft)<=radius && Math.abs(rectangle2.offsetTop - rectangle.offsetTop)<=radius) 
  {
      messagesManage(msgCollisionrects);
    return true;
  }
  return false;
}

function detectCollision2() {
  let rectangle = document.getElementById("rectangle2");
  let anim = document.getElementById("anim");
  if (
    (rectangle.offsetLeft <= 0 && rectangle.offsetLeft + rectangle.offsetWidth >= 0) ||
    (rectangle.offsetLeft >= anim.offsetWidth &&
      rectangle.offsetLeft - rectangle.offsetWidth <= anim.offsetWidth) ||
    (rectangle.offsetTop <= 0 && rectangle.offsetTop + rectangle.offsetHeight >= 0) ||
    (rectangle.offsetTop >= anim.offsetHeight &&
      rectangle.offsetTop - rectangle.offsetHeight <= anim.offsetHeight)
  ) {
    messagesManage(msgCollision);
    return true;
  }
  return false;
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

  let anim = document.createElement("div");
  anim.id = "anim";
  anim.style.width = "calc(100% - 10px)";
  anim.style.height = "calc(100% - 50px)";
  anim.style.position = "absolute";
  anim.style.bottom = "0px";
  anim.style.borderColor = `${borderColor}`;
  anim.style.borderWidth = `${borderWidth}px`;
  anim.style.borderStyle = "solid";
  anim.style.backgroundImage = `url(${texturePath})`;
  anim.style.backgroundRepeat = "repeat";

  let controls = document.createElement("div");
  controls.id = "controls";
  controls.style.position = "relative";

  let controls_buttons = document.createElement("div");
  controls_buttons.id = "controls_buttons";
  controls_buttons.style.position = "absolute";
  controls_buttons.style.top = "0px";
  controls_buttons.style.left = "3%";
  controls_buttons.style.margin = "0";

  let controls_messages = document.createElement("div");
  controls_messages.id = "controls_messages";
  controls_messages.style.position = "absolute";
  controls_messages.style.top = "0px";
  controls_messages.style.right = "3%";
  controls_messages.style.margin = "0";

  let x1 = Math.random() * (100 - 1) + 1
  let y1 = Math.random() * (100 - 1) + 1

  let rectangle = document.createElement("div");
  rectangle.id = "rectangle";
  rectangle.style.width = `${radius}px`;
  rectangle.style.height = `${radius}px`;
  rectangle.style.backgroundColor = `${rectColor}`;
  rectangle.style.position = "absolute";
  rectangle.style.top = `calc(${x1}% - ${radius/2}px)`;
  rectangle.style.left = `calc(${y1}% - ${radius/2}px)`;

  let x = Math.random() * (100 - 1) + 1
  let y = Math.random() * (100 - 1) + 1

  let rectangle2 = document.createElement("div");
  rectangle2.id = "rectangle2";
  rectangle2.style.width = `${radius}px`;
  rectangle2.style.height = `${radius}px`;
  rectangle2.style.backgroundColor = `${rectColor2}`;
  rectangle2.style.position = "absolute";
  rectangle2.style.top = `calc(${x}% - ${radius/2}px)`;
  rectangle2.style.left = `calc(${y}% - ${radius/2}px)`;

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
  anim.appendChild(rectangle);
  anim.appendChild(rectangle2);
  work.appendChild(controls);
  work.appendChild(anim);

  block3.appendChild(work);

  messagesManage(msgPlay);
}

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
  let rectangle = document.getElementById("rectangle");
  let rectangle2 = document.getElementById("rectangle2");
  let left = rectangle.offsetLeft;
  let top = rectangle.offsetTop;
  let left2 = rectangle2.offsetLeft;
  let top2 = rectangle2.offsetTop;

  function makeMove(direction, currentStep, step, left, top, rectangle) {
    setTimeout(() => {
      switch (direction) {
        case "l":
          left -= currentStep;
          rectangle.style.left = `${left}px`;
          if (detectCollision() || detectOutsideAnim()){
            direction = "r";
            left += 2*currentStep;
            rectangle.style.left = `${left}px`;
          }
          break;
        case "b":
          top += currentStep;
          rectangle.style.top = `${top}px`;
          if (detectCollision() || detectOutsideAnim()){
            direction = "t";
            top -= 2*currentStep;
            rectangle.style.top = `${top}px`;
          }
          break;
        case "r":
          left += currentStep;
          rectangle.style.left = `${left}px`;
          if (detectCollision() || detectOutsideAnim()){
            direction = "l";
            left -= 2*currentStep;
            rectangle.style.left = `${left}px`;
          }
          break;
        case "t":
          top -= currentStep;
          rectangle.style.top = `${top}px`;
          if (detectCollision() || detectOutsideAnim()){
            direction = "b";
            top += 2*currentStep;
            rectangle.style.top = `${top}px`;
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
          left2 -= currentStep;
          rectangle2.style.left = `${left2}px`;
          if (detectCollision2() || detectOutsideAnim2()){
            direction = "r";
            left2 += 2*currentStep;
            rectangle2.style.left2 = `${left2}px`;
          }
          break;
        case "b":
          top2 += currentStep;
          rectangle2.style.top = `${top2}px`;
          if (detectCollision2() || detectOutsideAnim2()){
            direction = "t";
            top2 -= 2*currentStep;
            rectangle2.style.top2 = `${top2}px`;
          }
          break;
        case "r":
          left2 += currentStep;
          rectangle2.style.left = `${left2}px`;
          if (detectCollision2() || detectOutsideAnim2()){
            direction = "l";
            left2 -= 2*currentStep;
            rectangle2.style.left2 = `${left2}px`;
          }
          break;
        case "t":
          top2 -= currentStep;
          rectangle2.style.top = `${top2}px`;
          if (detectCollision2() || detectOutsideAnim2()){
            direction = "b";
            top2 += 2*currentStep;
            rectangle2.style.top2 = `${top2}px`;
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
      currentStep += step;
      if (ColissionRects()|| detectOutsideAnim2() || detectOutsideAnim()) {
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
      if (!ColissionRects() && document.getElementById("btnStart") == null && !detectOutsideAnim2() && !detectOutsideAnim())
        makeMove(direction, currentStep + step, step, left, top, rectangle);
    }, 250);
  }
  makeMove(direction, currentStep, Number.parseInt(step), left, top, rectangle);
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

  let anim = document.getElementById("anim");
  let rectangle = document.getElementById("rectangle");
  let rectangle2 = document.getElementById("rectangle2");
  let x = Math.random() * (100 - 1) + 1
  let y = Math.random() * (100 - 1) + 1
  let x2 = Math.random() * (100 - 1) + 1
  let y2 = Math.random() * (100 - 1) + 1
  rectangle.style.top = `calc(${x}% - ${radius/2}px)`;
  rectangle.style.left = `calc(${y}% - ${radius/2}px)`;
  rectangle2.style.top = `calc(${x2}% - ${radius/2}px)`;
  rectangle2.style.left = `calc(${y2}% - ${radius/2}px)`;
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