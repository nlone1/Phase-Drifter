<?php
session_start(); // Session start
if(isset($_POST['check'])) // Check form submit with IF Isset function
{
	$username="admin"; // set variable value
	$password="123"; // set variable value
	if($_POST['username']==$username && $_POST['password']==$password) // Check Given user name, password and Variable user name password are same
	{
		$success = "Login Successful, Redirecting";
		$_SESSION['username']=$username; // set session from given user name
		header("Refresh:2;url=index.html");
	}
	else
	{
		$err="Authentication Failed Try again!";
	}
}
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

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
</div>

<div class="w3-mansalva logoNavbar">
	<h1>Login</h1>
</div>

<div class="w3-mansalva highScoreContainer">
	<div class="name">
			<?php if(isset($err)){ echo $err; } ?> <!-- Print Error -->
			<form method="POST" name="loginauth" target="_self">
				User Name: <input name="username" size="20" type="text" />
				<br/><br/>
				Pass Word: <input name="password" size="20" type="password" />
				<br/><br/>
				<input name="check" type="submit" value="Authenticate" />
			</form>
			
			<form action="index.html">
				<input type="submit" value="Skip to game">
			</form>
			<?php if(isset($success)){ echo "<h3>".$success."</h3>"; } ?>
	</div>
</div>



</body>

</html>