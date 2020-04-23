<?php

//Load Cookies and Set variables from cookie
if($_COOKIE) {
	foreach ($_COOKIE as $key=>$val)
	{
		if ($key =='newName'){
			$newName = $val;
		}
		else if ($key =='newScore'){
			$newScore = $val;
		}
		else if ($key =='showScorePage'){
			$showScorePage = $val;
		}

	}
}
else
{
	echo "No Cookies are Set";    
}

//echo($newName."<br>".$newScore."<br>".$showScorePage);

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
	
	if(showScorePage=="yes"){
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