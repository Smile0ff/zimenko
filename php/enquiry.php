<?php
    sleep(1);

    $response = [];

    if($_POST["name"]){
        $response = [
            "message" => "Спасибо за ваше предложение, наш менеджер свяжется с вами в ближайшее время, хорошего вам дня"
        ];
        echo json_encode($response);
    } else{
        $response = [
            "message" => "Пожалуйста исправьте допущенные ошибки при заполнении формы",
            "errors" => [
                "name" => "Не правильное значение поля",
                "email" => "Не правильное значение поля",
                "message" => "Не правильное значение поля",
            ]
        ];
        header('HTTP/1.1 500 Internal Server Booboo');
        echo json_encode($response);
    }
    
?>