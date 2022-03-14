let rows = 6;
let cols = 7; 
var board = [];
let spotR;
let players;
let mousePX;
let openCol;
let turnCount = 1; // we'll keep track of who's turn it is using the modulus function and this variable
let winner;
let requiredToWin = 4;

players = ['red', 'yellow']



function drawBoard() {

  spotR = width / 10;
  for (let i = 0; i < cols; i++){
    x = width/cols;
    line(x*i, 0, x*i, height); 
         
  }
  for (let i = 0; i < rows; i++){
    y = height/rows;
    line(0, y*i, width, y*i);   
    for (let j = 0; j < cols; j++){
      if (board[i][j] != ''){
        fill(board[i][j]);
      } else {
        fill(255);
      }
      ellipse(x * j + x / 2, y * i + y / 2,  spotR);


    }   
  }
}

function establishBoard(){
  for (let i = 0; i < rows; i++){
    board[i] = [];
    for (let j = 0; j < cols; j++){
      board[i][j] = ''

    }
  }
}



function getMove(j){
  
    
    let minRow = 0
    for (let i = 0; i < rows; i++){
      if (minRow + 1 != rows){
        if (board[minRow + 1][j] == ''){
          minRow++;
        }
      }
    }  
    board[minRow][j] = players[turn];
}

function GameOver(){
  
  // Horizontal 
  winner = false;
  for (let i = 0; i < rows; i++){
    for (let j = 0; j < cols - requiredToWin + 1; j++){ 
      if (!board[i][j] == ''){
        if (board[i][j] == board[i][j + 1] && board[i][j + 1] == board[i][j + 2] && board[i][j + 2] == board[i][j + 3]){
          winner = true;
        }
      }
    }
  }


  // vertical 

  for (let i = 0; i < rows - requiredToWin + 1; i++){
    for (let j = 0; j < cols; j++){
      if (board[i][j] != ''){
        if (board[i][j] == board[i + 1][j] && board[i + 1][j] == board[i + 2][j] && board[i + 2][j] == board[i + 3][j]){
          winner = true;
        }
      }
    }
  }

  // Diagonal
  // Bottom left to top right first
  
  for (let i = requiredToWin - 1; i < rows; i++){
    for (let j = 0; j < cols - requiredToWin + 1; j++){
      if (board[i][j] != ''){
        if (board[i][j] == board[i - 1][j + 1] && board[i - 1][j + 1] == board[i - 2][j + 2] && board[i - 2][j + 2] == board[i - 3][j + 3]){
          winner = true;
        }
      }
    }
  }


  // Top left to bottom right

  for (let i = 0; i < requiredToWin - 1; i++){
    for (let j = 0; j < cols - requiredToWin + 1; j++){
      if (board[i][j] != ''){
        if (board[i][j] == board[i + 1][j + 1] && board[i + 1][j + 1] == board[i + 2][j + 2] && board[i + 2][j + 2] == board[i + 3][j + 3]){
          winner = true;
        }
      }
    }
  }


  return winner
}




function setup() {
  ellipseMode(CENTER)
  createCanvas(700, 700);
  x = width/cols;
  y = height/rows;
  establishBoard();
  mousePX = createP();
  mousePY = createP();

}

function draw() {
  background(220)
  drawBoard();
  turn = turnCount % 2

  if (GameOver()){
    noLoop();
    // turn changes on click, so we have to change it one more time before showing winner
    turnCount++;
    turn = turnCount % 2;    
    mousePX.html('Winner is ' + players[turn])

  } else {
    mousePX.html('Current Turn: ' + players[turn]);
  }


}


function mouseClicked(){
  x = width/cols;
  y = height/rows;
  i = floor(mouseX / x);
  j = floor(mouseY / y);
  openCol = false;
  for (let z = 0; z < rows; z++){
    if (board[z][i] == ''){
      openCol = true;
    }
  }
  if (openCol){
    getMove(i, j);
    turnCount++;
  }
}


