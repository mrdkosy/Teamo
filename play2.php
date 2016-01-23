<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
</head>
<body>
 <header>
 	<h1>Teamo</h1>
 </header>

<?php 

try {
	$db=new PDO("sqlite:teamo3.sql");
	//echo "hello2"."<br>";
	//$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    	
	//$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	$db->query('SET NAMES utf8');
//登録済みのとき（データの検索）
	$name=$_GET['name'];
	$stmt=$db->prepare("SELECT p.id FROM player p WHERE p.name = '$name'");
	$r1=$stmt->fetch(PDO::FETCH_NUM);
	$stmt=$db->prepare("SELECT p.level FROM player p WHERE p.name = '$name'");
	$r2=$stmt->fetch(PDO::FETCH_NUM);
		if($r1){
		//プレーヤーのpid	
		echo "ログイン成功！YOUR ID=";echo $r1[0];echo "YOUR LEVEL=";echo $r2[0];echo "<br>";
		//登録済みのプレーヤーだったらゲームをそのままするからgidを発行
		$stmt=$db->prepare("SELECT max(g.gid) FROM game g");
		$stmt->execute();	
		$r3=$stmt->fetch(PDO::FETCH_NUM);
		$gid=$r3[0]+1;
		//$db->exec("INSERT INTO game(gid,pid,music,score) VALUE ('$gid','$r1[0]','$_POST['music']','0')");
		echo $_GET['music'];
		}else{
			echo "接続できませんでした。前ページに戻って新規登録からはじめてください。";
		}		

	echo $_GET['name'];
} catch (PDOException $e) {
	echo "接続失敗";
}


 ?>

	<div id="enchant-stage"></div>
	<script type="text/javascript" src="enchant.js"></script>
	<script type="text/javascript" src="main.js"></script>
</body>
</html>