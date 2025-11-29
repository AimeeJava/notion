<?php

require_once __DIR__ . "/common.php";

$data = file_get_contents("php://input");
if ($data === false) {
    http_response_code(400);
    echo json_encode(["error"=>"Server error"]);
    exit();
}


$data = json_decode($data, true);
//Empty content is allowed but stored as empty string.
$content = (string)$data["content"];
// Validates content length (e.g., ≤ 50 KB).
$maxBytes = 50 * 1024; //50KB
if (strlen($content) > $maxBytes){
    http_response_code(413);
    echo json_encode(["error"=>"Content too long"]);
    exit();
}

if (!mb_check_encoding($content,"UTF-8")) {
    //mb_convert_enco php.net
    $content = mb_convert_encoding($content,"UTF-8","");
}

$result = saveNote($mysqli, $token, $content);
if ($result === false) {
    echo json_encode(["error"=>"Server error"]);
    exit();
}
http_response_code(200);
echo json_encode(["success"=> ["id"=> $result]]);
exit();
?>