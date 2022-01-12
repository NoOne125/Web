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
  let glitch_params = document.getElementById("glitch_params");
  readTextFile("data.json", function (text) {
    let data = JSON.parse(text);

    for (let i = 0; i < data.length; i++) {
      let div_glitch = document.createElement("div");
      div_glitch.classList.add("glitch");

      let select = document.createElement("select");
      select.name = "_order[]";
      for (let i = 0; i < data.length; i++) {
        let option = new Option(i + 1, i + 1);
        select.add(option);
      }
      select.selectedIndex = data[i]["order"] - 1;

      let current_glitch = document.createElement("input");
      current_glitch.setAttribute("type", "text");
      current_glitch.setAttribute("name", "_text[]");
      current_glitch.setAttribute("value", data[i]["text"]);

      let br1 = document.createElement("br");
      let br2 = document.createElement("br");
      let br3 = document.createElement("br");
      let br4 = document.createElement("br");
      let br5 = document.createElement("br");
      let br6 = document.createElement("br");
      let br7 = document.createElement("br");

      let main_color_text = document.createElement("label");
      main_color_text.textContent = "Основной цвет: ";
    
      let main_color = document.createElement("input");
      main_color.setAttribute("type", "color");
      main_color.name = "_main_color[]";
      main_color.setAttribute("value", `${data[i]["main_color"].split("\\")}`);

        //br

      let first_color_text = document.createElement("label");
      first_color_text.textContent = "Первый цвет: ";
    
      let first_color = document.createElement("input");
      first_color.setAttribute("type", "color");
      first_color.name = "_first_color[]";
      first_color.setAttribute("value", `${data[i]["first_color"].split("\\")}`);

        //br

      let second_color_text = document.createElement("label");
      second_color_text.textContent = "Второй цвет: ";
    
      let second_color = document.createElement("input");
      second_color.setAttribute("type", "color");
      second_color.name = "_second_color[]";
      second_color.setAttribute("value", `${data[i]["second_color"].split("\\")}`);
        //br

      let font_size_text = document.createElement("label");
      font_size_text.textContent = "Размер текста: ";

      let font_size = document.createElement("input");
      font_size.setAttribute("type", "number");
      font_size.setAttribute("name", "_font_size[]");
      font_size.setAttribute("value", `${data[i]["font_size"].split("\\")}`);

        //br

        let margin_1_text = document.createElement("label");
        margin_1_text.textContent = "Отступ 1: ";

        let margin_1 = document.createElement("input");
        margin_1.setAttribute("type", "number");
        margin_1.setAttribute("name", "_margin_1[]");
        margin_1.setAttribute("value", `${data[i]["margin_1"].split("\\")}`);
        //br

        let margin_2_text = document.createElement("label");
        margin_2_text.textContent = "Отступ 2: ";

        let margin_2 = document.createElement("input");
        margin_2.setAttribute("type", "number");
        margin_2.setAttribute("name", "_margin_2[]");
        margin_2.setAttribute("value", `${data[i]["margin_2"].split("\\")}`);
        //br

        let duration_anim_text = document.createElement("label");
        duration_anim_text.textContent = "Длина анимации: ";

        let duration_anim = document.createElement("input");
        duration_anim.setAttribute("type", "number");
        duration_anim.setAttribute("name", "_duration_anim[]");
        duration_anim.setAttribute("value", `${data[i]["duration_anim"].split("\\")}`);

        let delete_button = document.createElement("button");
        delete_button.textContent = "Delete glitch";
        delete_button.addEventListener("click", delete_glitch);

        glitch_params.appendChild(div_glitch);
        glitch_params.appendChild(select);
        glitch_params.appendChild(current_glitch);
        glitch_params.appendChild(br1);
        glitch_params.appendChild(main_color_text);
        glitch_params.appendChild(main_color);
        glitch_params.appendChild(br2);
        glitch_params.appendChild(first_color_text);
        glitch_params.appendChild(first_color);
        glitch_params.appendChild(br3);
        glitch_params.appendChild(second_color_text);
        glitch_params.appendChild(second_color);
        glitch_params.appendChild(br4);
        glitch_params.appendChild(font_size_text);
        glitch_params.appendChild(font_size);
        glitch_params.appendChild(br5);
        glitch_params.appendChild(margin_1_text);
        glitch_params.appendChild(margin_1);
        glitch_params.appendChild(br6);
        glitch_params.appendChild(margin_2_text);
        glitch_params.appendChild(margin_2);
        glitch_params.appendChild(br7);
        glitch_params.appendChild(duration_anim_text);
        glitch_params.appendChild(duration_anim);
        glitch_params.appendChild(delete_button);
    }
  });
}

function delete_glitch(e) {
  e.preventDefault();
  let div_glitch = e.target.parentNode;
  let glitch_params = div_glitch.parentNode;

  let select = div_glitch.getElementsByTagName("select")[0];
  let selected_index_to_delete = select.selectedIndex;
  let allSelects = document
    .getElementById("glitch_params")
    .getElementsByTagName("select");

  if (selected_index_to_delete !== select.options.length - 1) {
    for (let i = 0; i < allSelects.length; i++) {
      if (allSelects[i] === select) continue;
      if (allSelects[i].selectedIndex >= selected_index_to_delete)
        allSelects[i].selectedIndex--;
    }
  }
  let lastIndex = allSelects[0].length - 1;
  for (let i = 0; i < allSelects.length; i++) {
    allSelects[i].options.remove(lastIndex);
  }

  glitch_params.removeChild(div_glitch);
}

function add_glitch(e) {
  e.preventDefault();
  let glitch_params = document.getElementById("glitch_params");

  let glitchs = document.getElementsByClassName("glitch");
  let div_glitch = document.createElement("div");
  div_glitch.classList.add("glitch");

  let select = document.createElement("select");
  select.name = "_order[]";
  for (let i = 0; i < glitchs.length + 1; i++) {
    let option = new Option(i + 1, i + 1);
    select.add(option);
  }
  select.selectedIndex = select.options.length - 1;

  let allSelects = document
    .getElementById("glitch_params")
    .getElementsByTagName("select");
  for (let i = 0; i < allSelects.length; i++) {
    let option = new Option(select.selectedIndex + 1, select.selectedIndex + 1);
    allSelects[i].add(option);
  }

  let current_glitch = document.createElement("input");
  current_glitch.setAttribute("type", "text");
  current_glitch.setAttribute("name", "_text[]");


  let br1 = document.createElement("br");
  let br2 = document.createElement("br");
  let br3 = document.createElement("br");
  let br4 = document.createElement("br");
  let br5 = document.createElement("br");
  let br6 = document.createElement("br");
  let br7 = document.createElement("br");

  let main_color_text = document.createElement("label");
  main_color_text.textContent = "Основной цвет: ";

  let main_color = document.createElement("input");
  main_color.setAttribute("type", "color");
  main_color.name = "_main_color[]";

    //br

  let first_color_text = document.createElement("label");
  first_color_text.textContent = "Первый цвет: ";

  let first_color = document.createElement("input");
  first_color.setAttribute("type", "color");
  first_color.name = "_first_color[]";

    //br

  let second_color_text = document.createElement("label");
  second_color_text.textContent = "Второй цвет: ";

  let second_color = document.createElement("input");
  second_color.setAttribute("type", "color");
  second_color.name = "_second_color[]";
    //br

  let font_size_text = document.createElement("label");
  font_size_text.textContent = "Размер текста: ";

  let font_size = document.createElement("input");
  font_size.setAttribute("type", "number");
  font_size.setAttribute("name", "_font_size[]");

    //br

    let margin_1_text = document.createElement("label");
    margin_1_text.textContent = "Отступ 1: ";

    let margin_1 = document.createElement("input");
    margin_1.setAttribute("type", "number");
    margin_1.setAttribute("name", "_margin_1[]");
    //br

    let margin_2_text = document.createElement("label");
    margin_2_text.textContent = "Отступ 2: ";

    let margin_2 = document.createElement("input");
    margin_2.setAttribute("type", "number");
    margin_2.setAttribute("name", "_margin_2[]");
    //br

    let duration_anim_text = document.createElement("label");
    duration_anim_text.textContent = "Длина анимации: ";

    let duration_anim = document.createElement("input");
    duration_anim.setAttribute("type", "number");
    duration_anim.setAttribute("name", "_duration_anim[]");

    let delete_button = document.createElement("button");
    delete_button.textContent = "Delete glitch";
    delete_button.addEventListener("click", delete_glitch);

    glitch_params.appendChild(div_glitch);
    glitch_params.appendChild(select);
    glitch_params.appendChild(current_glitch);
    glitch_params.appendChild(br1);
    glitch_params.appendChild(main_color_text);
    glitch_params.appendChild(main_color);
    glitch_params.appendChild(br2);
    glitch_params.appendChild(first_color_text);
    glitch_params.appendChild(first_color);
    glitch_params.appendChild(br3);
    glitch_params.appendChild(second_color_text);
    glitch_params.appendChild(second_color);
    glitch_params.appendChild(br4);
    glitch_params.appendChild(font_size_text);
    glitch_params.appendChild(font_size);
    glitch_params.appendChild(br5);
    glitch_params.appendChild(margin_1_text);
    glitch_params.appendChild(margin_1);
    glitch_params.appendChild(br6);
    glitch_params.appendChild(margin_2_text);
    glitch_params.appendChild(margin_2);
    glitch_params.appendChild(br7);
    glitch_params.appendChild(duration_anim_text);
    glitch_params.appendChild(duration_anim);
    glitch_params.appendChild(delete_button);
}

function check_for_dublicate_options() {
  let allSelects = document
    .getElementById("glitch_params")
    .getElementsByTagName("select");
  let selected_options = [];
  for (let i = 0; i < allSelects.length; i++) {
    selected_options.push(allSelects[i].selectedIndex);
  }
  return new Set(selected_options).size === selected_options.length;
}

function save() {
  if (check_for_dublicate_options()) {
    let error = document.getElementById("error");
    if (error !== null) {
      error.parentNode.removeChild(error);
    }
    document.forms.gl_settings.submit();
  } else {
    let errorMessage = document.createElement("h3");
    errorMessage.id = "error";
    errorMessage.textContent = "Error: The same options can't be chosen!!!";
    errorMessage.style.color = "darkred";
    document.forms.gl_settings.appendChild(errorMessage);
  }
}

document.forms.gl_settings.add_glitch.addEventListener("click", add_glitch);
document.forms.gl_settings.submit_button.addEventListener("click", save);