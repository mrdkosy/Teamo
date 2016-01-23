<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
</head>
<body>
 <header>
 	<h1>Teamo</h1>
 </header>
 <form action="play.php" method "get"> 
 	<div>プレーヤー新規登録</div>
	<input type="text" name="newname" size="30" maxlength="20">
	<select name="music">
		<option value="Xmas">Xmas Song</option>
		<option value="Love">Love Song</option>
		<option value="happy">Happy Song</option>
		<option value="winter">Winter Song</option>
	</select>
	<input type="submit" value="確定">
</form>
<form action="play2.php" method "post"> 
 	<div>登録済みの方はこちら</div>
	<input type="text" name="name" size="30" maxlength="20">
	<select name="music">
		<option value="XmasSong">Xmas Song</option>
		<option value="LoveSong">Love Song</option>
		<option value="happySong">Happy Song</option>
		<option value="winterSong">Winter Song</option>
	</select>
	<input type="submit" value="ログイン"> 
</form>
<?php 
try {
	$db=new PDO("sqlite:teamo3.sql");
	echo "true";
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
	$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	
} catch (PDOException $e) {
	echo "faulse";
}

 ?>
	<!--<div id="enchant-stage"></div>
	<script type="text/javascript" src="enchant.js"></script>
	<script type="text/javascript" src="main.js"></script>-->
</body>
</html>