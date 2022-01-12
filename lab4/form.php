<?php
    if(isset($_POST["hidden"]) || isset($_FILES["upload"])){
        $radius = $_POST["radius"];
        $step = $_POST["step"];
        $rect_color = $_POST["rect_color"];
        $rect_color_2 = $_POST["rect_color_2"];
        $border_color = $_POST["border_color"];
        $border_width = $_POST["border_width"];
        $upload = $_FILES["upload"];
        $hidden = $_POST["hidden"];
        $obj = array(
            "radius" => $radius,
            "step" => $step,
            "rect_color" => $rect_color,
            "rect_color_2" => $rect_color_2,
            "border_color" => $border_color,
            "border_width" => $border_width,
            "filepath" => "uploads/" . ($upload["name"] === "" ? $_POST["hidden"] : $upload["name"]),
            "msgPlayButton" => "Show animation field",
            "msgCloseButton" => "Close animation field",
            "msgStopButton" => "Stop animation",
            "msgReloadButton" => "Reload animation",
            "msgStartButton" => "Start animation"
        );

        $json_str = json_encode($obj);
        $file = fopen("data.json", "w");
        fwrite($file, $json_str);
        fclose($file);

        $tmp_name = $_FILES["upload"]["tmp_name"];
        $name = "uploads/" . $_FILES["upload"]["name"];
        move_uploaded_file($tmp_name, $name);
    }
?>