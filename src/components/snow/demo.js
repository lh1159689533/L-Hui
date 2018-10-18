var c, ctx, wid, hei, x, y, z;

window.onload = function() {
	
	c = document.getElementById("cv");
	ctx = c.getContext("2d");
	//画布宽度
  wid = window.innerWidth;
  //画布高度
  hei = window.innerHeight - 13;
  c.width=wid;
  c.height=hei;

  x = getRandomValue(-wid, wid);
  y = getRandomValue(0, hei);
  z = getRandomValue(0, 600);
  vy = -2;

  draw(ctx);
}

function draw(context) {
	context.clearRect(0, 0, wid, hei);
	// context.lineWidth = 2;
	// context.strokeStyle = 'hsla(0, 0%, 100%, ' + (100) / 100 + ')';
	// context.translate(100, 100);
	// context.scale(1, 0.3);
	// context.beginPath();
	// context.arc(0, 0, 10, 0, Math.PI * 2, false);
	// context.stroke();
	// context.restore();

	var rate = 300 / (300 + z);
	var theta = getRandomValue(0, Math.PI * 2); + Math.ceil(-(y + hei * 0.5) / vy) * Math.PI / 500;
	theta %= Math.PI * 2;
	var offsetY = 40 * ((theta <= Math.PI / 2 || theta >= Math.PI * 3 / 2) ? -1 : 1);
	var	thresholdY = hei / 2 + hei * 0.5 * rate;
	var shadowColor = context.createRadialGradient(0, 40, 0, 0, 40, 80);
	shadowColor.addColorStop(0, 'hsl(330, 40%, ' + 30 * (0.3 + rate) + '%)');
	shadowColor.addColorStop(0.05, 'hsl(330, 40%,' + 30 * (0.3 + rate) + '%)');
	shadowColor.addColorStop(1, 'hsl(330, 20%, ' + 40 * (0.3 + rate) + '%)');

	var x1 = wid / 2 + x * rate,
			y1 = hei / 2 - y * rate;
	context.save();
	context.globalAlpha = 0;
	context.fillStyle = shadowColor;
	context.strokeStyle = 'hsl(330, 30%,' + 40 * (0.3 + rate) + '%)';
	context.translate(x1, Math.max(y1, thresholdY + thresholdY - y1));
	context.rotate(Math.PI - theta);
	context.scale(rate * -Math.sin(getRandomValue(0, Math.PI * 2)), rate);
	context.translate(0, offsetY);
	renderCherry(context);
	context.restore();


	// context.save();
	// var entityColor = context.createRadialGradient(0, 40, 0, 0, 40, 80);
	// entityColor.addColorStop(0, 'hsl(330, 70%, ' + 50 * (0.3) + '%)');
	// entityColor.addColorStop(0.05, 'hsl(330, 40%,' + 55 * (0.3) + '%)');
	// entityColor.addColorStop(1, 'hsl(330, 20%, ' + 70 * (0.3) + '%)');

	// context.fillStyle = entityColor;
	// context.strokeStyle = 'hsl(330, 40%,' + 70 * (0.3) + '%)';
	// context.translate(100, 100 + Math.abs(20 * Math.sin(0) * 1));
	// context.rotate(Math.PI * 1);
	// context.scale(1 * Math.sin(0), 0.3);
	// context.translate(0, 10);

	// renderCherry(context);
	// context.restore();
}

function renderCherry(context){
	context.beginPath();
	context.moveTo(0, 40);
	context.bezierCurveTo(-60, 20, -10, -60, 0, -20);
	context.bezierCurveTo(10, -60, 60, 20, 0, 40);
	context.fill();
	
	for(var i = -4; i < 4; i++){
		context.beginPath();
		context.moveTo(0, 40);
		context.quadraticCurveTo(i * 12, 10, i * 4, -24 + Math.abs(i) * 2);
		context.stroke();
	}
}

function getRandomValue(min, max){
	return min + (max - min) * Math.random();
}