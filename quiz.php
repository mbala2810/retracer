<?php
 
	include 'connection.php';
 
	$sql = 'SELECT * FROM question';
	$val = mysqli_query( $db, $sql);
	if(! $val){
		die('Could not get data : ' . mysqli_connect_error());
	}
	$array = array();
	while($row = mysqli_fetch_array($val, MYSQLI_ASSOC)){
		/*echo "question : {$row['question']}	<br>".
			"{$row['option1']} <br>".
			"{$row['option2']} <br>".
			"{$row['option3']} <br>".
			"{$row['option4']} <br>"	;	
		*/
		$array[] = $row;
	}
	header("Content-type:application/json"); 
	echo json_encode($array);
	mysqli_close($db);

?>
