<?php
$dbHost = "127.0.0.1";
$dbUser = "root";
$dbPass = "";
$dbName = "hackathon3";
$dbPort = 3307;


$mysqli = new mysqli(
   $dbHost,
   $dbUser,
   $dbPass, 
   $dbName,
   $dbPort
);

 if($mysqli->connect_error){
    //echo "Opps connect error!: <br>".$conn->connect_error;
    die("Server error");
 }


function getLatestNoteByToken($mysqli, $token){
    $sql = "select * from notes where token = ? order by created_at desc limit 1";
    //w3schools.com
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc()?: null;
    $stmt->close();
    return $row ;
}

function getNoteById($mysqli, $id){
    $sql = "select * from notes where id = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc()?: null;
    $stmt->close();
    return $row;
}

function saveNote($mysqli, $token, $content){
    $sql = "insert into notes (token, content) values (?,?)";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("ss", $token, $content);
    $ok = $stmt->execute();
    if (!$ok){
        $stmt->close();
        return false;
    }
    $insert_id = $mysqli->insert_id;
    $stmt->close();
    return $insert_id;
}
?>