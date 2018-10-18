let snow = {};

const snowNum = 300;
	//画布宽度
const wid = window.innerWidth;
  //画布高度
const hei = window.innerHeight - 13;

let snows = [];
let isPause = false;

snow.init = function(c) {
	let ctx = c.getContext("2d");
	c.width=wid;
  c.height=hei;
	setInterval(
		function() {
			snowAdd();
			snowDraw(ctx);
		}
		,
		50
	);
}

snow.pause = function() {
	isPause = !isPause;
	console.log("isPause:"+isPause);
}

function snowDraw(ctx) {
	ctx.clearRect(0, 0, wid, hei);
	ctx.fillStyle = "#f8f8f9";
	ctx.beginPath();
	
	for (var i=0; i<snowNum; i++) {
		var snow = snows[i];
		ctx.moveTo(snow.x, snow.y);
		ctx.arc(snow.x, snow.y, snow.r, 0, 2*Math.PI);
	}
	ctx.fill();
	snowMove();
	ctx.closePath();
}

function snowAdd() {
	for (var i=0; i<snowNum; i++) {
		snows.push({
			x: Math.random() * wid,
			y: Math.random() * hei,
			r: Math.random() * 5 + 1
		})
	}
}

function snowMove() {
	if (isPause) {
		return;
	}
	for (var i=0; i<snowNum; i++) {
		var curSnow = snows[i];
		curSnow.x -= Math.random();
		if (curSnow.x < 0) {
			curSnow.x = wid;
		}
		curSnow.y += Math.random() * 3 + 1;
		if (curSnow.y > hei) {
			curSnow.y = 0;
		}
	}
}

export default snow