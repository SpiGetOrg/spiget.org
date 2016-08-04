<?php

include_once("../../../internal/Smarty.php");

$smarty->assign($values);
$smarty->display("legal/privacy.tpl");
