<?php

include_once("../../internal/Smarty.php");

$values = array(
    "query" => "",
    "type" => "resources"
);

$query = $_GET ["q"];
if (!empty($query)) {
    $values ["query"] = $query;
    $lower = strtolower($query);
    if (strpos($lower, "authors:") === 0) {
        $values ["type"] = "authors";
        $values ["query"] = substr($query, strlen("authors:"));
    } else if (strpos($lower, "resources:") === 0) {
        $values ["type"] = "resources";
        $values ["query"] = substr($query, strlen("resources:"));
    }

    if (strpos($values ["query"], "/") !== false) {
        $explode = explode("/", $values ["query"]);
        $values ["query"] = $explode [0];
        $values ["limit"] = (int)$explode [1];
    }
    if (empty($values ["limit"])) {
        $values ["limit"] = 10;
    }
}

$smarty->assign($values);
$smarty->display("search.tpl");
