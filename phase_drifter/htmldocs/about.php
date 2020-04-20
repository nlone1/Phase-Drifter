
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<!-- PHP code starts with forced HTTPS check -->
<?php
if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === "off") {
    $location = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $location);
    exit;
}
//Start session required for any session page
session_start();

if(isset($_SESSION["sessionUser"])){
	$username=$_SESSION["sessionUser"];
	$loggedOutFlag = false;
} 
else {
	// username and password not given so say not logged in
	$username="Not logged in";
	$loggedOutFlag = true;
}


if(isset($_POST['logInOut'])){
	if(!$loggedOutFlag){
		session_unset();
		header("Refresh:0");
	}
	else{
		header( "Location: login.php" );
	}
}
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
	
		<div class="sessionLogutWindow">
			<div class="userNameContaienr">
				<?php 
					echo "<span class='funFont'>Current User: </span><br>{$username}"; 
				?>
			</div>
			<div>
				<form method="post">
				<label></label>
				<!-- if logoutflag is label as login button, if not label logout -->
				<input type="submit" name="logInOut" value=<?php if(!$loggedOutFlag)echo "Logout"; else echo "Login";?>>
				</form>
			</div>
		
		</div>
	
	<div class="navContain">
		<div><a href="login.php"><button class="button w3-mansalva">Home Page</button></a></div>
		<div><a href="https://www.youtube.com/watch?v=w0Xlca8TKqM"><button class="button w3-mansalva">Youtube Video</button></a></div>
	</div>
</div>

<div class="w3-mansalva logoNavbar">
	<h1>About Us Page</h1>
</div>

<div class="w3-mansalva highScoreContainer">
	<div class="name">
		<img src="dude1.png" alt="Phaser Drifter Logo" height="150">
	</div>
	<div class="score p1">
		<h3>Dude #1</h3>
		Dude one is pretty chill. He had the idea for the game and came up with some cool animation ideas for game sprits. Also he made the logo at the top
	</div>
</div>

<div class="w3-mansalva highScoreContainer">
	<div class="name">
		<img src="dude2.png" alt="Phaser Drifter Logo" height="150">
	</div>
	<div class="score p1">
		<h3>Dude #2</h3>
		Dude two is also cool. He's played with some side scrolling game code recently and has a better idea of how to set that up than dudes one or two.
	</div>
</div>

<div class="w3-mansalva highScoreContainer">
	<div class="name">
		<img src="dude3.png" alt="Phaser Drifter Logo" height="155">
	</div>
	<div class="score p1">
		<h3>Dude #3</h3>
		Dude three is fairly swell. He's not that good at web building yet but he did manage to put togeather most of this site. So he's got that going for him, which is nice.
	</div>
</div>
</body>

</html>