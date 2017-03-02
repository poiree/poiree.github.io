<?php
    $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
    switch($lang) {
        case "en":
        case "uk":
        case "ru":
            header("Location: https://ide50-eugeniaty.cs50.io/$lang/index.html");
            break;
        default:
            header("Location: https://ide50-eugeniaty.cs50.io/en/index.html");
            break;
    }
?>