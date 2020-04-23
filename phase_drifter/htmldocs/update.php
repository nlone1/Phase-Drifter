<?php

//Load Cookies

//Set variables from cookie
if(!isset($_COOKIE['newName'])) {
	$newName = $_COOKIE['newName'];
}
else{
	$newName = "FOO";
}
if(!isset($_COOKIE['newScore'])) {
	$newScore = $_COOKIE['newScore'];
}
else{
	$newScore = 0;
}
if(!isset($_COOKIE['showScorePage'])) {
	$showScorePage = $_COOKIE['showScorePage'];
}
else{
	$showScorePage = false;
}



//Connect to SQL Server
$servername = "localhost";
$username = "mforrest1";
$password = "mforrest1";
$dbname = "mforrest1";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO `pdhighscores` (`Score`, `Initials`) VALUES
('".$newScore."', '".$newName."');";

if ($conn->query($sql) === TRUE) {
	
	if(showScorePage){
		header("Location: highscores.php");
	}
	else{
		header("Location: index.html");
	}
	
} else {
	echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();



?>