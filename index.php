<?php
    $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
    switch($lang) {
        case "en":
        case "uk":
            header("Location: https://poiree.github.io/$lang/index.html");
            break;
        default:
            header("Location: https://poiree.github.io/en/index.html");
            break;
    }
?>