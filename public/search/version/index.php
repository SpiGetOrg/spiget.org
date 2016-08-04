<?php

include_once("../../../internal/Smarty.php");

$values = array(
    "query" => "",
    "method" => "any"
);

$query = $_GET ["q"];
if (!empty($query)) {
    $values ["query"] = $query;
    $lower = strtolower($query);
    if (strpos($lower, "any:") === 0) {
        $values ["method"] = "any";
        $values ["query"] = substr($query, strlen("any:"));
    } else if (strpos($lower, "all:") === 0) {
        $values ["method"] = "all";
        $values ["query"] = substr($query, strlen("all:"));
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
$smarty->display("search-version.tpl");
