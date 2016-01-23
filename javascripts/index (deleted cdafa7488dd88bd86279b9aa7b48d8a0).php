<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
</head>
<body>
 <header>
 	<h1>Teamo</h1>
 </header>
 <form action="play.php" method "post"> 
 	<p>プレーヤー新規登録</p>
	<input type="text" name="newname" size="30" maxlength="20">
	<input type="submit" value="確定">
</form>
<form action="play2.php" method "post"> 
 	<p>登録済みの方はこちら</p>
	<input type="text" name="name" size="30" maxlength="20">
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
	<div id="enchant-stage"></div>
	<script type="text/javascript" src="enchant.js"></script>
	<script type="text/javascript" src="main.js"></script>
</body>
</html>