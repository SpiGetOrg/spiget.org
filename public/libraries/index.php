<?php

include_once("../../internal/Smarty.php");

$libraries = file_get_contents("./libraries.json");
try {
    $libraries = json_decode($libraries, true);
} catch (Exception $e) {
    $libraries = array();
}
$smarty->assign("libraries", $libraries);

$smarty->display("libraries.tpl");
