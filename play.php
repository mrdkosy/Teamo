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
			// echo "Hello"."<br>";

	//$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    	
	//$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	//新規登録のとき
				$sql="SELECT max(p.pid) FROM player p";
				$stmt=$db->prepare($sql);
				$stmt->execute();
				$r1=$stmt->fetch(PDO::FETCH_NUM);
				$stmt=$db->prepare("SELECT max(g.gid) FROM game g");
				$stmt->execute();
				$r2=$stmt->fetch(PDO::FETCH_NUM);
				$newid=$r1[0]+1;
				$stmt=$db->prepare("INSERT INTO player(pid,name,level) VALUES (?,?,?)");
	//$flag=$stmt->execute(['6','newguest','8']);
	//real
	//$flag=$stmt->execute(newid,$_GET['newname'],'0']);
				$stmt->bindValue(1, (int)$newid,PDO::PARAM_INT);
				$stmt->bindValue(2, $_GET['newname']);
				$stmt->bindValue(3, (int)'0',PDO::PARAM_INT);
				$flag=$stmt->execute();
				if ($flag){
				// print('データの更新に成功しました<br>');
				}else{
				// print('データの更新に失敗しました<br>');
				}
				echo "YOUR ID=";echo $newid;echo "<br>";
				echo $_GET['newname'];echo "さんようこそTeamoへ";echo "<br>";
			 //echo "Let's play";echo $_GET['music'];

				$sql="INSERT INTO game(gid,pid,music,score) VALUES (?,?,?,?)";
				$stmt=$db->prepare($sql);
				$stmt->bindValue(1, (int)$newgid,PDO::PARAM_INT);
				$stmt->bindValue(2, (int)$newid,PDO::PARAM_INT);

				$musicIdName = $_GET['music'];
				$musicName = split('&', $musicIdName);
				$stmt->bindValue(3, $musicName[1]);//ここに音楽名をいれてほしい！！
				echo "Let's play";echo $musicName[1];

				$stmt->bindValue(4, (int)'0',PDO::PARAM_INT);	
				$flag=$stmt->execute();

			} catch (PDOException $e) {
			// echo "接続失敗";
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