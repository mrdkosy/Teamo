<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>top</title>
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
		<div class="circleMenu" style="right: 160px; background-color: rgb(250, 250, 250);"><div class="circleFont" style="color: rgb(253, 144, 166);">step2</div></div>
		<div class="circleMenu" style="right: 100px"><div class="circleFont">step3</div></div>
		<div class="circleMenu" style="right: 40px"><div class="circleFont">step4</div></div>
	</header>

	<div id="main" class="index">
		<form action="play.php" method "get"> 
			<p>プレーヤー新規登録</p>
			<input type="text" name="newname" size="30" maxlength="20">
			<select name="music">
				<option value=0>クリスマス・ソング</option>
				<option value=1>トリセツ</option>
				<option value=2>R.Y.U.S.E.I.</option>
				<option value=3>Ki・mi・ni・mu・chu</option>
			</select>
			<input type="submit" value="確定">
		</form>

		<form action="play2.php" method "get"> 
			<p>登録済みの方はこちら</p>
			<input type="text" name="name" size="30" maxlength="20">
			<select name="music">
				<option value=0>クリスマス・ソング</option>
				<option value=1>トリセツ</option>
				<option value=2>R.Y.U.S.E.I.</option>
				<option value=3>Ki・mi・ni・mu・chu</option>
			</select>
			<input type="submit" value="ログイン"> 
		</form>
		<?php 
		try {
			$db=new PDO("sqlite:teamo3.sql");
			//echo "true";
			$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
			$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

		} catch (PDOException $e) {
			echo "faulse";
		}

		?>
		<!--<div id="enchant-stage"></div>
		<script type="text/javascript" src="enchant.js"></script>
		<script type="text/javascript" src="main.js"></script>-->
	</div>
	<!-- <div style="margin-bottom: 10000px"></div> -->
</body>
</html>