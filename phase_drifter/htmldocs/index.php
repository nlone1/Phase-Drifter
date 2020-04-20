<!doctype html> 
<html lang="en"> 
<!–– PHP code starts with forced HTTPS check ––>
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
        <meta charset="UTF-8" />
        <title>Test Level 2</title>
        <script type="text/javascript" src="../scripts/phaser.min.js"></script>
        <script type="text/javascript" src="../scripts/phaser-arcade-physics.min.js"></script>
        <script type="text/javascript" src="../scripts/boot_scene.js"></script>
        <script type="text/javascript" src="../scripts/menu_scene.js"></script>
        <script type="text/javascript" src="../scripts/level1_scene.js"></script>
        <script type="text/javascript" src="../scripts/level2_scene.js"></script>
        <script type="text/javascript" src="../scripts/main_scene.js"></script>
        <link rel="stylesheet" type="text/css" href="../styles/styles.css">
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Mansalva">
    </head>
    <body>
        <div id="border">
            <div class="wrp" id="gameWindow">
            </div>
        </div>
		
		<div class="sessionLogutWindow">
			<div class="userNameContaienr">
				<?php 
					echo "Current User: {$username}"; 
				?>
			</div>
			<div>
				<form method="post">
				<label></label>
				<!–– if logoutflag is label as login button, if not label logout ––>
				<input type="submit" name="logInOut" value=<?php if(!$loggedOutFlag)echo "Logout"; else echo "Login";?>>
				</form>
			</div>
		
		</div>
		
    </body>
</html>
