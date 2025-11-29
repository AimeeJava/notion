<?php

// handle note_token cookie
require_once __DIR__."/../config/session.php";

// connect to db and make $mysqli available
require_once __DIR__."/../config/config.php";

$token = getNoteToken();

header("Content-Type: text/html; charset=UTF-8");
$template = file_get_contents(filename: __DIR__."/../templates/index.html");

echo $template;
?>