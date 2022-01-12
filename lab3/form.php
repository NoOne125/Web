<?php
    if(isset($_POST["_order"])){
        $count = count($_POST["_order"]);
        $objects = array();
        $_order = $_POST["_order"];
        $_text = $_POST["_text"];
        $_main_color = $_POST["_main_color"];
        $_first_color = $_POST["_first_color"];
        $_second_color = $_POST["_second_color"];
        $_font_size = $_POST["_font_size"];
        $_margin_1 = $_POST["_margin_1"];
        $_margin_2 = $_POST["_margin_2"];
        $_duration_anim = $_POST["_duration_anim"];
        for($i = 0; $i < $count; $i++){
            $obj = array(
                "order" => $_order[$i],
                "text" => $_text[$i],
                "main_color" => $_main_color[$i],
                "first_color" => $_first_color[$i],
                "second_color" => $_second_color[$i],
                "font_size" => $_font_size[$i],
                "margin_1" => $_margin_1[$i],
                "margin_2" => $_margin_2[$i],
                "duration_anim" => $_duration_anim[$i]
            );
            $objects[] = $obj;
        }

        $json_str = json_encode($objects);
        $file = fopen("data.json", "w");
        fwrite($file, $json_str);
        fclose($file);
    }
?>