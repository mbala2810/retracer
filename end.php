<?php
 
include 'connection.php';
//$details= json_decode($_REQUEST['message']);
//print_r($_details);
//echo $details[0];
/*$teamname = $_POST['teamname'];
$phone = $_POST['phonenumber'];
$score = $_POST['score'];
*/
$prep = $db->prepare("INSERT INTO score (ID, TeamName, PhoneNumber, score) VALUES ('0', ?, ?, ?)");
	if (!$prep){
		echo "false";
	}
	else {
		$prep->bind_param('sss', $TeamName, $PhoneNumber, $score);
		$TeamName = $_POST['teamname'];
		$PhoneNumber = $_POST['phonenumber'];
		$score = $_POST['score'];

		$prep->execute();
		$result = $db->insert_id;
		$prep->close();
	}
?>
