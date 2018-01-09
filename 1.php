<?php
 
include 'connection.php';
 
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
 

	$prep = $db->prepare("INSERT INTO register (UserId, TeamName, ParticipantName1, ParticipantName2, PhoneNumber, EmailAddress) VALUES ('0', ?, ?, ?, ?, ?)");
	if (!$prep){
		echo "false";
	}
	else {
		$prep->bind_param('sssss', $TeamName, $ParticipantName1, $ParticipantName2, $PhoneNumber, $EmailAddress);
		$TeamName = $_POST['team-name'];
		$ParticipantName1 = $_POST['p1-name'];
		$ParticipantName2 = $_POST['p2-name'];
		$PhoneNumber = $_POST['ph-no'];
		$EmailAddress = $_POST['email-addr'];

		$prep->execute();
		$result = $db->insert_id;
		$prep->close();
		header('Location: /rules1.html');
	}
}
?>

<!DOCTYPE html>
<html>
	<head>
		<title>Retracer - Login</title>
		<meta charset = "UTF-8">
		<meta name = "viewport" content = "width=device-width, initial-scale = 1.0">		
		<link href = "css/log.css" rel = "stylesheet">
		<script src = "js/main.js"></script>
	</head>
	<body>
		<div class = "d1">
			<h1 text-align = 'center' style = "color : #3498DB;">MINDSPARK 17</h1>
			<h3 text-align = 'center' style = "font-size : 18pt; color : #3498DB;">Register : Retracer Round 1</h3>
			 <form id="phpbasics" name="phpbasics" action="<?php echo $_SERVER['PHP_SELF'];  ?>" method="post" enctype="multipart/form-data">

			<div class = "login-form">
				<input type = "text" class = "ip" name = "team-name" id = "team-name" tabindex = "1" placeholder = "Teamname" value = "">
			</div>
			<br>
			<div class = "login-form">
				<input type = "text" class = "ip" name = "p1-name" id = "p1-name" tabindex = "1" placeholder = "Participant name 1" value = "">
			</div>
			<br>
			<div class = "login-form">
				<input type = "text" class = "ip" name = "p2-name" id = "p2-name" tabindex = "1" placeholder = "Participant name 2" value = "">
			</div>
			<br>
			<div class = "login-form">
				<input type = "text" class = "ip" name = "ph-no" id = "ph-no" tabindex = "1" placeholder = "Phone Number" value = "">
			</div>
			<br>
			<div class = "login-form">
				<input type = "text" class = "ip" name = "email-addr" id = "email-addr" tabindex = "1" placeholder = "Email Address" value = "">
			</div>
			<br>
			<div class = "login-form">
				<input type = "submit" class = "reg"  name = "submit" id = "submit" tabindex = "1" value = "Register Now">
			</div>
			</form>
		</div>
		<div>
			<?php if(isset($_POST['submit'])){
				echo $result;
			}?>
		</div>
	</body>
</html>
