<?php

header("Content-Type: application/json; charset=utf-8");

require_once __DIR__."/../../config/session.php";
require_once __DIR__."/../../config/config.php";

$token = getNoteToken();
//empty php.net
if (empty($token)){
    http_response_code(400);
    echo json_encode(["error"=>"No valid note token"]);
    exit();
}

?>