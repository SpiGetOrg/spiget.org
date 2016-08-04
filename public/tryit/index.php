<?php

include_once("../../internal/Smarty.php");

if (isset($_GET ["embed"])) {
    $smarty->display("tryit_embed.tpl");
}