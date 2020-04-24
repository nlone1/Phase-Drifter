
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<!-- PHP code starts with forced HTTPS check -->
<?php
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

$sql = "SELECT * from pdhighscores ORDER BY Score DESC LIMIT 10;";
$result = $conn->query($sql);

//Go through each data entry and put its content in a HTML table row
if ($result->num_rows > 0) {
    // output data of each row
    while(($row = $result->fetch_assoc())&&($tenCount<10)) {
		$namesTemp .= "<li>".$row['Initials']."</li>";
		$scoresTemp .= "<li>".$row['Score']."</li>";
	}
} else {
   $namesTemp = "0 results";
   $scoreTemp = "0 results";
}
$conn->close();
?>






<head>
	<title>Phaser Drifter | About Us</title>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Mansalva">
	<link rel="stylesheet" type="text/css" href="../styles/mainpage.css" title="style" />
</head>


<body>

<div class="logoNavbar">
	<div class="logo">
	<img src="../assets/final_logo.jpg" alt="Phaser Drifter Logo" height="125">
	</div>
	
	<div class="navContain">
		<div><a href="index.html"><button class="button w3-mansalva">Game</button></a></div>
		<div><a href="highscores.php"><button class="button w3-mansalva">Highscores</button></a></div>
		<div><a href="https://www.youtube.com/watch?v=V5hyo21Zl9k"><button class="button w3-mansalva">Youtube</button></a></div>
	</div>
</div>

<div class="w3-mansalva logoNavbar">
	<h1>High Scores</h1>
</div>

<div class="w3-mansalva highScoreContainer">
	<div class="name">
		<h3>Name:</h3>
		<ol style="margin-left: 14px;">
		<?php   if (isset($namesTemp)) echo $namesTemp; ?>
		</ol>
	</div>
	<div class="score">
		<h3>Score:</h3>
		<ul style="list-style-type:none;">
		<?php   if (isset($scoresTemp)) echo $scoresTemp; ?>
		</ul>
	</div>
</div>
</body>

</html>