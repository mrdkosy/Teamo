<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
</head>
<body>
 <header>
 	<h1>Teamo</h1>
 </header>
 
 <h1>ランキング</h1>

 <?php
$db=new PDO("sqlite:teamo3.sql");
$db->query('SET NAMES utf8');
$stmt=$db->prepare("SELECT　p.name, FROM player p, game g WHERE p.pid=g.pid ORDER BY g.score desc");
echo"1";
$stmt->execute();
echo "a";

/*while($r1=$stmt->fetch(PDO::FETCH_ASS0C)){
	echo $r1['name'];
	echo $r1['music'];
	echo $r1['score'];
	echo "<br>";
}*/

 ?>
	
</body>
</html>