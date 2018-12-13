import { Message } from 'element-ui'

let TZFE = {};

let board = new Array();
let score = 0;
let hasConflicted = new Array();
let curAddScore = 0;	//增加的分数
let isAddScore = false;
let startx = 0;
let starty = 0;
let endx = 0;
let endy = 0;

let documentWidth = window.screen.availWidth;
let gridContainerWidth = 0.92*documentWidth;
let cellSideLength = 0.18*documentWidth;
let cellSpace = 0.04*documentWidth;

TZFE.run = function() {
	prepareForMobile();
	this.restart();
}

TZFE.restart = function() {
	//初始化棋盘格
	init();
	
	//在随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}

TZFE.U = function() {
  if(moveUp()) {
    setTimeout(() => {
      generateOneNumber()
    },210)
    setTimeout(() => {
      isgameover()
    },300)
  }
}

TZFE.D = function() {
  if(moveDown()) {
    setTimeout(() => {
      generateOneNumber()
    },210)
    setTimeout(() => {
      isgameover()
    },300)
  }
}

TZFE.L = function() {
  if(moveLeft()) {
    setTimeout(() => {
      generateOneNumber()
    },210)
    setTimeout(() => {
      isgameover()
    },300)
  }
}

TZFE.R = function() {
  if(moveRight()) {
    setTimeout(() => {
      generateOneNumber()
    },210)
    setTimeout(() => {
      isgameover()
    },300)
  }
}

function getPosTop(i,j) {
	return cellSpace+(cellSpace+cellSideLength)*i;
}

function getPosLeft(i,j) {
	return cellSpace+(cellSpace+cellSideLength)*j;
}

function getNumberBackgroundColor(number) {
	switch(number) {
		case 2:
			return "#eee4da";	break;
		case 4:
			return "#ede0c8";	break;
		case 8:
			return "#f2b179";	break;
		case 16:
			return "#f59563";	break;
		case 32:
			return "#f67c5f";	break;
		case 64:
			return "#f65e3b";	break;
		case 128:
			return "#edcf72";	break;
		case 256:
			return "#edcc61";	break;
		case 512:
			return "#9c0";	break;
		case 1024:
			return "#33b5e5";	break;
		case 2048:
			return "#09c";	break;
		case 4096:
			return "#a6c";	break;
		case 8192:
			return "#93c";	break;
	}
	
	return "black";
}

function getNumberColor(number) {
	if(number <= 4) {
		return "#776e65";
	}
	
	return "white";
}

function nospace(board) {
	for(let i=0; i<4; i++) {
		for(let j=0; j<4; j++) {
			if(board[i][j] == 0) {
				return false;
			}
		}
	}
	
	return true;
}

//判断能否向左移动
function canMoveLeft(board) {
	for(let i=0; i<4; i++) {
		for(let j=1; j<4; j++) {
			if(board[i][j] != 0) {
				if(board[i][j-1]==0 || board[i][j-1]==board[i][j]) {
					return true;
				}
			}
		}
	}
	
	return false;
}

//判断能否向下移动
function canMoveDown(board) {
	for(let j=0; j<4; j++) {
		for(let i=2; i>=0; i--) {
			if(board[i][j] != 0) {
				if(board[i+1][j]==0 || board[i+1][j]==board[i][j]) {
					return true;
				}
			}
		}
	}
	
	return false;
}

//判断能否向右移动
function canMoveRight(board) {
	for(let i=0; i<4; i++) {
		for(let j=2; j>=0; j--) {
			if(board[i][j] != 0) {
				if(board[i][j+1]==0 || board[i][j+1]==board[i][j]) {
					return true;
				}
			}
		}
	}
	
	return false;
}

//判断能否向上移动
function canMoveUp(board) {
	for(let j=0; j<4; j++) {
		for(let i=1; i<4; i++) {
			if(board[i][j] != 0) {
				if(board[i-1][j]==0 || board[i-1][j]==board[i][j]) {
					return true;
				}
			}
		}
	}
	
	return false;
}

function noBlockHorizontal(row,col1,col2,board) {
	for(let i=col1+1; i<col2; i++) {
		if(board[row][i] != 0) {
			return false;
		}
	}
	
	return true;
}

function noBlockHorizontal1(row1,row2,col,board) {
	for(let i=row1+1; i<row2; i++) {
		if(board[i][col] != 0) {
			return false;
		}
	}
	
	return true;
}

function nomove(board) {
	if(canMoveDown(board) || canMoveLeft(board) || canMoveRight(board) || canMoveUp(board)) {
		return false;
	}
	
	return true;
}

function updateScore(score) {
	$('#score').text(score);
}

function addScore(addScore) {
	$('#add').text("+"+addScore);
  setTimeout(() => {
    addScoreAnimation()
  },200)
}

function showNumberWithAnimation(i,j,randnumber) {
	let numberCell = $('#number-cell-'+i+'-'+j);
	
	numberCell.css("backgroundColor",getNumberBackgroundColor(randnumber));
	numberCell.css("color",getNumberColor(randnumber));
	numberCell.text(randnumber);
	
	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	}, 50);
}

function showMoveAnimation(fromx,fromy,tox,toy) {
	let numberCell = $('#number-cell-'+fromx+'-'+fromy);
	
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)	
	}, 200);
}

function addScoreAnimation() {
	let add = $('#add');
	add.css("display","block");
	add.animate({
		top:"220px"
	});
}

//自适应屏幕大小
function prepareForMobile() {
	if(documentWidth > 500) {
		gridContainerWidth = 400;
		cellSpace = 16;
		cellSideLength = 80;
	}
	$('#grid-container').css("width",gridContainerWidth-2);
	$('#grid-container').css("height",gridContainerWidth-2);
	$('#grid-container').css("padding",cellSpace);
	$('#grid-container').css("border-radius",0.02*gridContainerWidth);
	
	$('.grid-cell').css("width",cellSideLength);
	$('.grid-cell').css("height",cellSideLength);
	$('.grid-cell').css("border-radius",0.02*cellSideLength);
}

function updateBoardView() {
	$('.number-cell').remove();
	for(let i=0; i<4; i++) {
		for(let j=0; j<4; j++) {
			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			let theNumberCell = $('#number-cell-'+i+"-"+j);
			
			if(board[i][j] == 0) {
				theNumberCell.css("width","0px");
				theNumberCell.css("height","0px");
				theNumberCell.css("top",getPosTop(i,j)+cellSideLength/2);
				theNumberCell.css("left",getPosLeft(i,j)+cellSideLength/2);
			}else {
				theNumberCell.css("width",cellSideLength);
				theNumberCell.css("height",cellSideLength);
				theNumberCell.css("top",getPosTop(i,j));
				theNumberCell.css("left",getPosLeft(i,j));
				
				theNumberCell.css("backgroundColor",getNumberBackgroundColor(board[i][j]));
				theNumberCell.css("color",getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
			
			hasConflicted[i][j] = false;
		}
	}
	$('.number-cell').css("line-height",cellSideLength+"px");
	$('.number-cell').css("font-size",0.6*cellSideLength+"px");
	
	isAddScore = false;
	curAddScore = 0;
	let add = $('#add');
	add.css("top","240px");
	setTimeout(
		() => {
			add.css("display","none");
		}
	,200);
}

function init() {
	for(let i=0; i<4; i++) {
		for(let j=0; j<4; j++) {
			let gridCell = $('#grid-cell-'+i+"-"+j);
			gridCell.css("top",getPosTop(i,j));
			gridCell.css("left",getPosLeft(i,j));
		}
	}
	
	//对board初始化
	for(let i=0; i<4; i++) {
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for(let j=0; j<4; j++) {
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}
	
	updateBoardView();
	
	score = 0;
	curAddScore = 0;
}


function generateOneNumber() {
	if(nospace(board)) {
		return false;
	}
	
	//随机一个位置坐标
	let randx = parseInt(Math.floor(Math.random()*4));
	let randy = parseInt(Math.floor(Math.random()*4));
	
	let times = 0;
	while(times < 50) {
		if(board[randx][randy] == 0) {
			break;
		}
		randx = parseInt(Math.floor(Math.random()*4));
		randy = parseInt(Math.floor(Math.random()*4));
		
		times ++;
	}
	if(times == 50) {
		for(let i=0; i<4; i++) {
			for(let j=0; j<4; j++) {
				if(board[i][j] == 0) {
					randx = i;
					randy = j;
					times = 0;
					break;
				}
			}
			if(times == 0) {
				break;
			}
		}
	}
	
	//随机一个数字
	let randnumber = Math.random()<0.5 ? 2 : 4;
	
	board[randx][randy] = randnumber;
	showNumberWithAnimation(randx,randy,randnumber);
	
	return true;
}

document.addEventListener("touchstart",function(event) {
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});

document.addEventListener("touchend",function(event) {
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;
	
	let deltax = endx - startx;
	let deltay = endy - starty;
	
	if(Math.abs(deltax)<0.3*documentWidth && Math.abs(deltay)<0.3*documentWidth) {
		return;
	}
	//x
	if(Math.abs(deltax) > Math.abs(deltay)) {
		if(deltax > 0) {
			//moveright
			if(moveRight()) {
        setTimeout(() => {
          generateOneNumber()
        },210)
        setTimeout(() => {
          isgameover()
        },300)
			}
		}else {
			//moveleft
			if(moveLeft()) {
				setTimeout(() => {
          generateOneNumber()
        },210)
        setTimeout(() => {
          isgameover()
        },300)
			}
		}
	}else {//y
		if(deltay > 0) {
			//movedown
			if(moveDown()) {
				setTimeout(() => {
          generateOneNumber()
        },210)
        setTimeout(() => {
          isgameover()
        },300)
			}
		}else {
			//moveup
			if(moveUp()) {
				setTimeout(() => {
          generateOneNumber()
        },210)
        setTimeout(() => {
          isgameover()
        },300)
			}
		}
	}
});

function moveLeft() {
	if(!canMoveLeft(board)) {
		return false;
	}
	
	//moveLeft
	for(let i=0; i<4; i++) {
		for(let j=1; j<4; j++) {
			if(board[i][j] != 0) {
				for(let k=0; k<j; k++) {
					if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)) {
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]) {
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						
						score += board[i][k];
						updateScore(score);
						curAddScore += board[i][k];
						hasConflicted[i][k] = true;
						isAddScore = true;
						continue;
					}
				}
			}
		}
	}
	
	if(isAddScore) {
		addScore(curAddScore);
	}
  setTimeout(() => {
    updateBoardView()
  },200)
	return true;
}

function moveDown() {
	if(!canMoveDown(board)) {
		return false;
	}
	
	//movedown
	for(let j=0; j<4; j++) {
		for(let i=2; i>=0; i--) {
			if(board[i][j]!=0) {
				for(let k=3; k>i; k--) {
					if(board[k][j]==0 && noBlockHorizontal1(i,k,j,board)) {
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[k][j]==board[i][j] && noBlockHorizontal1(i,k,j,board) && !hasConflicted[k][j]) {
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						
						score += board[k][j];
						updateScore(score);
						curAddScore += board[k][j];
						hasConflicted[k][j] = true;
						isAddScore = true;
						continue;						
					}
				}
			}
		}
	}
	
	if(isAddScore) {
		addScore(curAddScore);
	}
  setTimeout(() => {
    updateBoardView()
  },200)
	return true;
}

function moveRight() {
	if(!canMoveRight(board)) {
		return false;
	}
	
	//moveright
	for(let i=0; i<4; i++) {
		for(let j=2; j>=0; j--) {
			if(board[i][j]!=0) {
				for(let k=3; k>j; k--) {
					if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)) {
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]) {
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						
						score += board[i][k];
						updateScore(score);
						curAddScore += board[i][k];
						hasConflicted[i][k] = true;
						isAddScore = true;
						continue;						
					}
				}
			}
		}
	}
	
	if(isAddScore) {
		addScore(curAddScore);
	}
  setTimeout(() => {
    updateBoardView()
  },200)
	return true;
}

function moveUp() {
	if(!canMoveUp(board)) {
		return false;
	}
	
	//movedown
	for(let j=0; j<4; j++) {
		for(let i=1; i<4; i++) {
			if(board[i][j] != 0) {
				for(let k=0; k<i; k++) {
					if(board[k][j]==0 && noBlockHorizontal1(k,i,j,board)) {
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[k][j]==board[i][j] && noBlockHorizontal1(k,i,j,board) && !hasConflicted[k][j]) {
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						
						score += board[k][j];
						updateScore(score);
						curAddScore += board[k][j];
						hasConflicted[k][j] = true;
						isAddScore = true;
						continue;						
					}
				}
			}
		}
	}
	
	if(isAddScore) {
		addScore(curAddScore);
	}
  setTimeout(() => {
    updateBoardView()
  },200)
	return true;
}

function isgameover() {
	if(nospace(board) && nomove(board)) {
		gameover();
	}
}

function gameover() {
  let maxboard = maxBoard();
  console.log("max:", maxboard);
  let say = endWord(maxboard);
	Message({
    showClose: true,
    message: say,
    type: 'success',
    duration: 0,
    iconClass: 'el-icon-message'
  });
}

function maxBoard() {
  let max = 0;
  for (let i=0; i<4; i++) {
    for (let j=0; j<4; j++) {
      if (board[i][j] > max) {
        max = board[i][j];
      }
    }
  }

  return max;
}

function endWord(maxboard) {
  let say = "";
  if (maxboard < 256) {
    say = "256呵呵一笑,并对你说:我你都见不到,见2048就别想了";
  } else if (maxboard < 512) {
    say = "大家都觉得256有点怪怪的,有种被打脸的感觉,但原因谁也不知道";
  } else if (maxboard < 1024) {
    say = "512对上次256的无礼表示很抱歉,并鼓励你继续前行";
  } else if (maxboard < 2048) {
    say = "见到你时1024有点惊讶,毕竟能见到他的人不多";
  } else if (maxboard < 4096) {
    say = "你跪在地上老泪横流,你所有的付出都是为了此刻,而2048则在一旁眺望着远方";
  } else {
    say = "4096跪在地上老泪纵横,他alone这么久终于见到活人了,而此时的你内心毫无波澜";
  }

  return say;
}

export default TZFE;