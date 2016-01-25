<!DOCTYPE>
<html>
<head>
	<meta charset="utf-8">
	<title>result</title>
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
	<div id="main" class="rank">
		<h1>あなたの今回の結果</h1>

		<?php 
		echo $_GET['_maxScore'];echo "点";echo "<br>";
		//あなたの部分をインサートができたらこれに変える
		/*$db=new PDO("sqlite:teamo3.sql");
		$stmt=$db->prepare("SELECT p.name,max(g.gid) FROM game g,player p WHERE p.pid=g.gid");
		$stmt->execute();
		$r1=$stmt->fetch(PDO::FETCH_NUM);
		echo $r1[0];*/
		?>
		<a href="./index.php"><div class="seleciton">もう一度プレイ</div></a>
		<a href="./result.php"><div class="seleciton">ランキングを見る</div></a>


	<?php

		$db=new PDO("sqlite:teamo3.sql");
		$stmt=$db->prepare("SELECT max(g.gid) FROM game g");
		$stmt->execute();
		$r1=$stmt->fetch(PDO::FETCH_NUM);
		$gid=$r1[0];
		$stmt=$db->prepare("UPDATE game SET score=/*○○*/ WHERE gid=4");
		$flag=$stmt->execute();
		if($flag){
			echo "get score";
		}else{
			echo "false";
		}
		?>
		
		<!--ここに結果をかいていまやったゲームの結果かいてこのページではPHPはでーたの更新だけに使ってます。-->

	</div>
</body>
</html>