<?php
echo file_get_contents("https://raw.githubusercontent.com/SpiGetOrg/Documentation/master/swagger.json",false,stream_context_create(array(
    "ssl"=>array(
        "verify_peer"=>false,
        "verify_peer_name"=>false,
    ),
)));