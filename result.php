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
		<a href="./index.php"><div class="seleciton">もう一度プレイ</div></a>

		<?php
		$db=new PDO("sqlite:teamo3.sql");
		$db->query('SET NAMES utf8');
		$stmt=$db->prepare("SELECT　p.name, FROM player p, game g WHERE p.pid=g.pid ORDER BY g.score desc");
		// echo"1";
		$stmt->execute();
		echo "a";

		/*while($r1=$stmt->fetch(PDO::FETCH_ASS0C)){
			echo $r1['name'];
			echo $r1['music'];
			echo $r1['score'];
			echo "<br>";
		}*/

		?>
	</div>

</body>
</html>