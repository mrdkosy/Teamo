var count = 0;
var nowNUM = 15;
var tree = new Image();
tree.src = "./images/f_branch536.png";
var sakuraNUM = 5; //花びら画像の数
var fubuki = 50; //飛ばす花びらの数
var sakura = new Array(sakuraNUM);
for(var i=0; i<sakuraNUM; i++){
	sakura[i] = new Image();
	sakura[i].src ="./images/sakura"+i+".png"
}
var sakuraPositionX = new Array(fubuki);
var sakuraPositionY = new Array(fubuki);
var sakuraSpeedX = new Array(fubuki);
var sakuraSpeedY = new Array(fubuki);
var sakuraSizeX = new Array(fubuki);
var sakuraMaxX = new Array(fubuki);
var sakuraSizeY = new Array(fubuki);
var sakuraMaxY = new Array(fubuki);
var sakuraY = [0.59, 0.91, 0.91, 1, 1];

function loop(){
	for(var i=0; i<fubuki; i++){
		sakuraMaxX[i] = Math.random()*20+30;
		sakuraMaxY[i] = sakuraMaxX[i]*sakuraY[i%sakuraNUM];
		sakuraSizeX[i] = 0;
		sakuraSizeY[i] = 0;
		sakuraPositionX[i] = Math.random()*300+200;
		sakuraPositionY[i] = Math.random()*150+300;
		sakuraSpeedX[i] = Math.random()*0.9+0.05;
		sakuraSpeedY[i] = Math.random()*0.6+0.01;
	}

}

function init(){
	canvas = document.getElementById("canvas");
	if ( canvas.getContext ){
		context = canvas.getContext("2d");
		setInterval( draw , 10 );
	}
	loop();
}
function draw(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(tree, -35, 30, 700, 700);
	context.fillStyle = "rgba(255, 255, 255, .65)";

	context.save();
	//伸縮x, 傾斜y, 傾斜x, 伸縮y, 移動x, 移動y
	// var theta = (sakuraPositionX[0]%360)*(Math.PI / 180);
	// var a = Math.cos(theta);
	// var b = -1*Math.sin(theta);
	// var c = Math.sin(theta);
	// var d = Math.cos(theta);
	// context.setTransform(a, b, c, d, 0, 0);
	// context.transform(1-sakuraPositionX[0]*0.003, sakuraPositionX[0]*0.003, 1, sakuraPositionY[0]*0.008,sakuraPositionX[0], sakuraPositionY[0]);
	// context.drawImage(sakura[4], 100, 100, 100, 100);
	context.restore();

	var del = 60;
	for(var i=0; i<nowNUM; i++){
		context.drawImage(sakura[i%sakuraNUM], sakuraPositionX[i], sakuraPositionY[i], sakuraSizeX[i], sakuraSizeY[i]);
		sakuraPositionX[i] += sakuraSpeedX[i];
		sakuraPositionY[i] += sakuraSpeedY[i];
		sakuraSizeX[i] += (sakuraMaxX[i]-sakuraSizeX[i])/del;
		sakuraSizeY[i] += (sakuraMaxY[i]-sakuraSizeY[i])/del;
	}

	count++;
	if(count%60 == 0){
		nowNUM++;
		if(nowNUM > fubuki){
			nowNUM = 15;
			loop();
		}
	}

	context.fillRect(0, 0, canvas.width, canvas.height);
}