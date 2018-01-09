<?php

$message = '';

$db = new mysqli('localhost', 'id2998051_someuser', 'hello123', 'id2998051_test');

if ($db->connect_error){
	$message = $db->connect_error;
}
else{
	echo $message;
}
?>
