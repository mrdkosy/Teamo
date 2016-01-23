<head>
	<meta charset="utf-8">
</head>
<body>
 <header>
 	<h1>Teamo</h1>
 </header>
 
 <h1>あなたの今回の結果</h1>

 <!--ここに結果をかいていまやったゲームの結果かいて
 このページではPHPはでーたの更新だけに使ってます。-->
 <?php
$db=new PDO("sqlite:teamo3.sql");
$stmt=$db->prepare("SELECT max(g.gid) FROM game g");
$stmt->execute();
$r1=$stmt->fetch(PDO::FETCH_NUM);
//このgidにscoreをいれて更新ー＞echo $r1[0];
//ここのscore=○○のところに出た結果の値をいれて！
$stmt=$db->prepare("UPDATE game SET score=/*○○*/ WHERE gid=4");
$flag=$stmt->execute();
if($flag){
	echo "get score";
}else{
	echo "false";
}


 ?>
	<!--<div id="enchant-stage"></div>
	<script type="text/javascript" src="enchant.js"></script>
	<script type="text/javascript" src="main.js"></script>-->
</body>
</html>