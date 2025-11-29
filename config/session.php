<?php
$cookieName = "note_token";
$cookieDays = 7;
$cookieExpire = $cookieDays *24*60*60 + time();

$noteToken = "";
if (isset($_COOKIE[$cookieName])) {
    $noteToken = $_COOKIE[$cookieName];
}else{
    //bin2hex php.net
    $noteToken = bin2hex(random_bytes(32));
    setcookie($cookieName, $noteToken, $cookieExpire,"/");
    $_COOKIE[$cookieName] = $noteToken;
} 

function getNoteToken(){
    global $noteToken;
    return $noteToken ?? "";
}

?>