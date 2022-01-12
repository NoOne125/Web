load_glitchs();

function readTextFile(file, callback) {
  let rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

function load_glitchs() {
  let lists = document.getElementsByClassName("glitchessss")[0];
  let glitches = document.createElement("div");
  glitches.classList.add("glitches");

  readTextFile("data.json", function (text) {
    if (text.length === 0) {
      let errorMessage = document.createElement("h3");
      errorMessage.id = "error";
      errorMessage.textContent = "/...!!!";
      errorMessage.style.color = "white";
      slider.appendChild(errorMessage);
    } else {
      let data = JSON.parse(text);
      data.sort(function (a, b) {
        let keyA = parseInt(a["order"]);
        let keyB = parseInt(b["order"]);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      for (let i = 0; i < data.length; i++) {
        let glitch = document.createElement("div");
        glitch.id = `glitch-${i + 1}`;

        var styleElem = document.head.appendChild(document.createElement("style"));

        let text_glitch = document.createElement("p");
        text_glitch.classList.add("glitch");
        text_glitch.textContent = data[i]["text"];
        text_glitch.after.textContent = data[i]["text"];
        text_glitch.before.textContent = data[i]["text"];
        text_glitch.style.fontSize = `${data[i]["font_size"]}px`;
        text_glitch.style.color = data[i]["main_color"];
        styleElem.innerHTML = "#glitch-"+String(i + 1)+"> .glitch:before {text-shadow:" + data[i]["margin_1"] + "px 0 " + data[i]["first_color"] + "; content: '"+ data[i]["text"] +"'; animation-duration: " + data[i]["duration_anim"] +"s;} " + "#glitch-"+String(i + 1)+"> .glitch:after {text-shadow:" + data[i]["margin_2"] + "px 0 " + data[i]["second_color"] + "; content: '"+ data[i]["text"] +"'; animation-duration: " + data[i]["duration_anim"] +"s;} ";


        glitch.appendChild(text_glitch);
        glitches.appendChild(glitch);
      }
      lists.appendChild(glitches);
    }
  });
}