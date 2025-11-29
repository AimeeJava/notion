<?php

require_once __DIR__ . "/common.php";
//return empty if no token

$latestNote = null;
if ($token !== ""){
    $latestNote = getLatestNoteByToken($mysqli, $token);
}
if ($latestNote === null){
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Not found",
        "id" => null,
        "content" => "",
        "created_at" => null
    ]);
    exit;
} else {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "id" => $latestNote["id"],
        "content" => $latestNote["content"],
        "created_at" => $latestNote["created_at"]
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

?>