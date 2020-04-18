<?php
//I think this forces https for this page
if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === "off") {
    $location = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $location);
    exit;
}
//Start session required for any session page
session_start();
if(isset($_SESSION["sessionUser"])){
	header( "Location: index.php" );
} 


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$username = $_POST['username'];
	$pass = $_POST['password'];
	$postback = $_POST['postback'];
		if ($pass == 'guest' && strlen($username) > 3) {
			$_SESSION["sessionUser"] = "$username";
			$loginFail=false;
			//Dont forget to try adding the delay and message if this works
			header("Refresh:2;url=index.php");
			//header( "Location: index.php" );
		}
		else{
			$loginFail=true;
		}
}

if(empty($postback)){
	$postback = FALSE;
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
	
<?php
//Im putting all of the user feedback messages here	

//This shows an error message if postback is set and a credintial doesnt conform to the rules
//else if was used to keep more than one message from showing
if ($postback && strlen($username)<4) {
	echo "Please enter a valid username.";
}
else if ($postback && strlen($pass)<4) {
	echo "Please enter a valid password.";
}
else if (isset($loginFail)){
	if ($loginFail){echo "Invalid Login credentials!";}
}
if (isset($loginFail)){
	if (!$loginFail){
		echo "Login Success, redirecting!";
		
}
	
}
?>

			<form method="post" class="formLayout">
				<label>Username:</label>
				<input type="text" name="username" value="<?php  if (isset($username)) echo $username; ?>" 
						class="formElement" 
						title="first name" required autofocus /><br>

				<label>Password:</label>
				<input type="password" name="password" value="<?php if (isset($pass)) echo $pass; ?>"
						class="formElement" 
						title="password" required /><br>
	
				<label> </label>
				<input type="hidden" name="postback" value="true">
				<input type="submit" name="loginButton" value="Login">
			</form>   
				
			<form action="index.php">
				<label></label>
				<!–– Try to go straight to the protected page ––>
					<input type="submit" name="skipLogin" value="Skip to game">
			</form>
	</div>
</div>



</body>

</html>