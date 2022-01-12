load_structure();
load_params();

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

function load_params() {
  readTextFile("data.json", function (text) {
    let data = JSON.parse(text);
    if (Object.keys(data).length === 0) return;

    let form = document.forms.animation_settings;

    let radius = form.radius;
    radius.selectedIndex = data["radius"] - 5;

    let step = form.step;
    step.selectedIndex = data["step"] - 1;

    let rect_color = form.rect_color;
    rect_color.value = data["rect_color"];

    let rect_color_2 = form.rect_color_2;
    rect_color_2.value = data["rect_color_2"];

    let border_color = form.border_color;
    border_color.value = data["border_color"];

    let border_width = form.border_width;
    border_width.selectedIndex = data["border_width"] - 1;

    let animation_params = document.getElementById("animation_params");
    let current_texture = document.createElement("label");
    let br = document.createElement("br");

    let hidden = document.forms.animation_settings.hidden;
    hidden.setAttribute("value", `${data["filepath"].split("/")[1]}`);

    current_texture.id = "current_texture";
    current_texture.textContent = `Current texture: ${
      data["filepath"].split("/")[1]
    }`;
    animation_params.appendChild(current_texture);
    animation_params.insertBefore(br, current_texture);
  });
}

function load_structure(e) {
  let animation_params = document.getElementById("animation_params");

  let radius_label = document.createElement("label");
  radius_label.textContent = "Ширина квадратов: ";

  let select_radius = document.createElement("select");
  select_radius.name = "radius";
  for (let i = 4; i < 100; i++) {
    let option = new Option(i + 1, i + 1);
    select_radius.add(option);
  }
  let br_radius = document.createElement("br");

  let movement_label = document.createElement("label");
  movement_label.textContent = "Скорость квадратов: ";

  let select_movement = document.createElement("select");
  select_movement.name = "step";
  for (let i = 0; i < 10; i++) {
    let option = new Option(i + 1, i + 1);
    select_movement.add(option);
  }
  let br_step = document.createElement("br");

  let rect_color_label = document.createElement("label");
  rect_color_label.textContent = "Цвет квадрата 1: ";

  let rect_color_input = document.createElement("input");
  rect_color_input.setAttribute("type", "color");
  rect_color_input.name = "rect_color";

  let br_rect_color = document.createElement("br");

  let rect_color_label_2 = document.createElement("label");
  rect_color_label_2.textContent = "Цвет квадрата 2: ";

  let rect_color_input_2 = document.createElement("input");
  rect_color_input_2.setAttribute("type", "color");
  rect_color_input_2.name = "rect_color_2";

  let br_rect_color_2 = document.createElement("br");

  let border_color_label = document.createElement("label");
  border_color_label.textContent = "Цвет границ: ";

  let border_color_input = document.createElement("input");
  border_color_input.setAttribute("type", "color");
  border_color_input.name = "border_color";

  let br_border_color = document.createElement("br");

  let border_width_label = document.createElement("label");
  border_width_label.textContent = "Ширина границы: ";

  let select_border_width = document.createElement("select");
  select_border_width.name = "border_width";
  for (let i = 0; i < 10; i++) {
    let option = new Option(i + 1, i + 1);
    select_border_width.add(option);
  }
  let br_border_width = document.createElement("br");

  let choose_texture = document.createElement("label");
  choose_texture.textContent = "Текстура: ";

  let texture = document.createElement("input");
  texture.setAttribute("type", "file");
  texture.setAttribute("name", "upload");

  let hidden = document.createElement("input");
  hidden.setAttribute("type", "hidden");
  hidden.setAttribute("name", "hidden");

  animation_params.appendChild(radius_label);
  animation_params.appendChild(select_radius);
  animation_params.appendChild(br_radius);
  animation_params.appendChild(movement_label);
  animation_params.appendChild(select_movement);
  animation_params.appendChild(br_step);
  animation_params.appendChild(rect_color_label);
  animation_params.appendChild(rect_color_input);
  animation_params.appendChild(br_rect_color);
  animation_params.appendChild(rect_color_label_2);
  animation_params.appendChild(rect_color_input_2);
  animation_params.appendChild(br_rect_color_2);
  animation_params.appendChild(border_color_label);
  animation_params.appendChild(border_color_input);
  animation_params.appendChild(br_border_color);
  animation_params.appendChild(border_width_label);
  animation_params.appendChild(select_border_width);
  animation_params.appendChild(br_border_width);
  animation_params.appendChild(choose_texture);
  animation_params.appendChild(texture);
  animation_params.appendChild(hidden);
}

function save() {
  let animation_params = document.getElementById("animation_params");
  let texture = document.forms.animation_settings.upload;
  let hidden = document.forms.animation_settings.hidden;
  if (texture.value === "" && hidden.value === "") {
    alert("Add texture");
  } else {
    let current_texture = document.getElementById("current_texture");
    if (current_texture === null) {
      let current_texture = document.createElement("label");
      current_texture.id = "current_texture";
      current_texture.textContent = `Current texture: ${
        texture.value.split("/canvas_animation.css")[2]
      }`;

      let br = document.createElement("br");
      animation_params.appendChild(current_texture);
      animation_params.insertBefore(br, current_texture);
    } else {
      if (texture.value === "")
        current_texture.textContent = `Current texture: ${hidden.value}`;
      else {
        current_texture.textContent = `Current texture: ${
          texture.value.split("/")[2]
        }`;
      }
    }
    document.forms.animation_settings.submit();
  }
}

document.forms.animation_settings.submit_button.addEventListener("click", save);
