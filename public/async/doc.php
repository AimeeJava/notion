<?php

require_once __DIR__ . "/common.php";
//empty php.net
$id = $_GET["id"] ?? null;
if (empty($id)){
    http_response_code(400);
    echo json_encode(["error"=>"Invalid id."]);
    exit();
}

$note = getNoteById($mysqli,$id);
if ($note === null){
    http_response_code(400);
    echo json_encode(["error"=> "Not found."]);
    exit();
}

$content = (string)$note["content"];
http_response_code(200);
echo json_encode([
    "success"=> true,
    "id"=> $note["id"],
    "content"=> $content,
    "created_at"=> $note["created_at"],
], JSON_UNESCAPED_UNICODE);
?>