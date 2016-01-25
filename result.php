<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>ranking</title>
	<link rel="stylesheet" href="./stylesheets/teamo.css">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="./back.js"></script>
</head>
<body onload="init();">
	<canvas id="canvas" width=700 height=500></canvas>
	<script>
		// canvasサイズをスクリーンサイズに合わせる
		$('#canvas').attr('width', window.parent.screen.width);
		$('#canvas').attr('height',window.parent.screen.height);   
	</script>

	<header>
		<img src="./images/topbar2.png">
		<h1>Teamo</h1>
		<div class="circleMenu" style="right: 220px"><div class="circleFont">step1</div></div>
		<div class="circleMenu" style="right: 160px"><div class="circleFont">step2</div></div>
		<div class="circleMenu" style="right: 100px"><div class="circleFont">step3</div></div>
		<div class="circleMenu" style="right: 40px; background-color: rgb(250, 250, 250);"><div class="circleFont" style="color: rgb(253, 144, 166);">step4</div></div>
	</header>
	<div id="main" class="result">

		<h1>ランキング</h1>
		<?php
$db=new PDO("sqlite:teamo3.sql");
$db->query('SET NAMES utf8');
$stmt=$db->prepare("SELECT p.name,g.music,g.score FROM player p, game g WHERE p.pid=g.pid ORDER BY g.score desc");
$stmt->execute();
//$r1=$stmt->fetch(PDO::FETCH_ASSOC);
$r1=$stmt->fetchALL();
// echo "<br><br>";
for($num1=0;$num1<3;$num1++){
	echo $num1+1; echo "位  ";
	for ($num2=0;$num2<3;$num2++){
		echo $r1[$num1][$num2];
		echo "  ";

	}
	echo "点";
	echo "<br>";
}
	echo "<br><br>";

?>
		<a href="./index.php"><div class="seleciton">もう一度プレイ</div></a>

		
	</div>

</body>
</html>