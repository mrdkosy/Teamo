<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>play game</title>
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
		<div class="circleMenu" style="right: 100px; background-color: rgb(250, 250, 250);"><div class="circleFont" style="color: rgb(253, 144, 166);">step3</div></div>
		<div class="circleMenu" style="right: 40px"><div class="circleFont">step4</div></div>
		<div id="data">
			<?php 

			try {
				$db=new PDO("sqlite:teamo3.sql");
				$db->query('SET NAMES utf8');
//登録済みのとき（データの検索）
				$name=$_GET['name'];
				$stmt=$db->prepare("SELECT p.pid FROM player p WHERE p.name = '$name'");
				$stmt->execute();
				$r1=$stmt->fetch(PDO::FETCH_NUM);
				$stmt=$db->prepare("SELECT p.level FROM player p WHERE p.name = '$name'");
				$stmt->execute();
				$r2=$stmt->fetch(PDO::FETCH_NUM);
				if($r1){
		//プレーヤーのpid	
					echo "ログイン成功";echo "ようこそ".$name;echo " さん";echo "<br>";
					echo "YOUR ID=";echo $r1[0];echo "  YOUR LEVEL=";echo $r2[0];echo "<br>";

		//登録済みのプレーヤーだったらゲームをそのままするからgidを発行
					$stmt=$db->prepare("SELECT max(g.gid) FROM game g");
					$stmt->execute();	
					$r3=$stmt->fetch(PDO::FETCH_NUM);
					$gid=$r3[0]+1;

					$sql="INSERT INTO game(gid,pid,music,score) VALUES (?,?,?,?)";
					$stmt=$db->prepare($sql);
					$stmt->bindValue(1, (int)$gid,PDO::PARAM_INT);
					$stmt->bindValue(2, (int)$r1[0],PDO::PARAM_INT);

					$musicIdName = $_GET['music'];
					$musicName = split('&', $musicIdName);
					$stmt->bindValue(3, $musicName[1]);
					echo "Let's play";echo $musicName[1];
					
					$stmt->bindValue(4, (int)'0',PDO::PARAM_INT);
					$flag=$stmt->execute();
					

				}else{
					echo "接続できませんでした。";
					echo "<br>";
					echo "前ページに戻って新規登録からはじめてください。";
					echo "<div id=\"whiteOut\"></div>";
				}		

			} catch (PDOException $e) {
				echo "接続失敗";
			}


			?>
		</div>
	</header>
	<div id="main" class="play" style="padding: 20px;">
		<div id="enchant-stage"></div>
		<script type="text/javascript" src="enchant.js"></script>
		<script type="text/javascript" src="main.js"></script>
		<script>
			var hoge = <?php echo json_encode($musicName[0]); ?>;
			ID(hoge);
		</script>
		<form action="rank.php" method="get" name="score" id="score"></form>	
	</div>
</body>
</html>