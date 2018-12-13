let gobang = {};

let chess;
let context;
let me = true;
let over = false;
//定义一个二维数组,如值为0表示此处可以落子,如为1表示次数为黑子,如为2表示此处为白子
let chessBoard = new Array();
//赢法数组(三维数组,前二维是棋盘格,后一维是赢法种数)
let wins = new Array();
//赢法种数
let count = 0;	
//赢法统计数组,为一维数组,数组中的每一个元素代表一种赢法,当该数组中的某一个元素的值等于5时,则该赢法实现,游戏结束
let myWin = new Array();
let computerWin = new Array();

gobang.init = function(ctx) {
	chess = ctx;
	context = chess.getContext("2d");

	//画出棋盘格
	drawChessBoard();
	
	//初始化棋盘,此时棋盘无子,二维数组chessBoard值全为0
	clearBoard();
	
	//初始化赢法数组
	initWins();
	//console.log(wins);
	chess.onclick = function(e) {
		if(over) {
			return;
		}
		if(!me) {
			return;
		}
		let x = e.offsetX;
		let y = e.offsetY;
		let i = Math.floor(x/30);
		let j = Math.floor(y/30);
		
		if(chessBoard[i][j] == 0) {
			oneStep(i, j, me);
			chessBoard[i][j] = 1;
			for(let k=0; k<count; k++) {
				if(wins[i][j][k]) {
					myWin[k] ++;
					computerWin[k] = 6;
					if(myWin[k] == 5) {
						window.alert("黑胜");
						over = true;
					}
				}
			}
			if(!over) {
				me = !me;
				computerAI();
			}
		}
	}
}

function computerAI() {
	let myScore = new Array();
	let computerScore = new Array();
	let max = 0;
	let u = 0, v = 0;
	
	for(let i=0; i<15; i++) {
		myScore[i] = new Array();
		computerScore[i] = new Array();
		for(let j=0; j<15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	for(let i=0; i<15; i++) {
		for(let j=0; j<15; j++) {
			if(chessBoard[i][j] == 0) {
				for(let k=0; k<count; k++) {
					if(wins[i][j][k]) {
						if(myWin[k] == 1) {
							myScore[i][j] += 200;
						}else if(myWin[k] == 2) {
							myScore[i][j] += 400;
						}else if(myWin[k] == 3) {
							myScore[i][j] += 2000;
						}else if(myWin[k] == 4) {
							myScore[i][j] += 10000;
						}
						
						if(computerWin[k] == 1) {
							computerScore[i][j] += 220;
						}else if(computerWin[k] == 2) {
							computerScore[i][j] += 420;
						}else if(computerWin[k] == 3) {
							computerScore[i][j] += 2100;
						}else if(computerWin[k] == 4) {
							computerScore[i][j] += 20000;
						}
					}
				}
				if(myScore[i][j] > max) {
					max = myScore[i][j];
					u = i;
					v = j;
				}else if(myScore[i][j] = max) {
					if(computerScore[i][j] > computerScore[u][v]) {
						u = i;
						v = j;
					}
				}
				if(computerScore[i][j] > max) {
					max = computerScore[i][j];
					u = i;
					v = j;
				}else if(computerScore[i][j] = max) {
					if(myScore[i][j] > myScore[u][v]) {
						u = i;
						v = j;
					}
				}
			}
		}
	}
	oneStep(u, v, false);
	chessBoard[u][v] = 2;
	
	for(let k=0; k<count; k++) {
		if(wins[u][v][k]) {
			computerWin[k] ++;
			myWin[k] = 6;
			if(computerWin[k] == 5) {
				window.alert("白胜");
				over = true;
			}
		}
	}
	if(!over) {
		me = !me;
	}
}

function clearBoard() {
	for(let i=0; i<15; i++) {
		chessBoard[i] = new Array();
		for(let j=0; j<15; j++) {
			chessBoard[i][j] = 0;
		}
	}
}

function initWins() {
	for(let i=0; i<15; i++) {
		wins[i] = new Array();
		for(let j=0; j<15; j++) {
			wins[i][j] = new Array();
		}
	}
	//5个棋子一排
	for(let i=0; i<15; i++) {
		for(let j=0; j<11; j++) {
			for(let k=0; k<5; k++) {
				wins[i][j+k][count] = true;
			}
			count ++;
		}
	}
	//5个棋子一列
	for(let i=0; i<11; i++) {
		for(let j=0; j<15; j++) {
			for(let k=0; k<5; k++) {
				wins[i+k][j][count] = true;
			}
			count ++;
		}
	}
	//斜上连续5个棋子
	for(let i=14; i>3; i--) {
		for(let j=0; j<11; j++) {
			for(let k=0; k<5; k++) {
				wins[i-k][j+k][count] = true;
			}
			count ++;
		}
	}
	//斜下连续5个棋子
	for(let i=0; i<11; i++) {
		for(let j=0; j<11; j++) {
			for(let k=0; k<5; k++) {
				wins[i+k][j+k][count] = true;
			}
			count ++;
		}
	}
	
	for(let i=0; i<count; i++) {
		//每一方的每一种赢法初始值都为0,当该值等于5的时候,则该方获胜
		myWin[i] = 0;
		computerWin[i] = 0;
	}
}

function drawChessBoard() {
	for(let i=0; i<15; i++) {
		context.strokeStyle = "#BFBFBF";
		//竖线
		context.moveTo(15+30*i,15);
		context.lineTo(15+30*i,435);
		//横线
		context.moveTo(15,15+30*i);
		context.lineTo(435,15+30*i);
		
		context.stroke();
	}
}

//画出棋子
function oneStep(i, j, me) {
	context.beginPath();
	context.arc(15+30*i, 15+30*j, 13, 0, 2*Math.PI);
	context.closePath();
	
	//渐变色
	let gradient = context.createRadialGradient(15+30*i, 15+30*j, 13, 15+30*i, 15+30*j, 0);
	if(me) {	//黑子
		gradient.addColorStop(0, "#0A0A0A");
		gradient.addColorStop(1, "#636766");
	}else {	//白子
		gradient.addColorStop(0, "#D1D1D1");
		gradient.addColorStop(1, "#F9F9F9");
	}
	context.fillStyle = gradient;
	context.fill();
}

export default gobang