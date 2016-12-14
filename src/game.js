import Board from "board";
import Player from "player";

var Game = function() {
  // TODO: Test if playerOne, playerTwo are instances of Player
  // Test if board is instance of Board
  // these are tested indirectly
  this.playerOne = new Player();
  this.playerTwo = new Player();
  this.board = new Board();

  this.playerOne.mark = "X";
  this.playerTwo.mark = "O";
  this.playerOne.turn = true;
};

Game.prototype.toggleTurn = function() {
  this.playerOne.turn = !(this.playerOne.turn);
  this.playerTwo.turn = !(this.playerTwo.turn);
};

Game.prototype.validSquare = function(a, b) {
  if(this.board.grid[a][b] === null) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.winner = function(){
  // FOR THE HORIZONTAL WIN - STILL TO DETERMINE IF WE CNA PUT THIS IN A LOOP VS HARD CODING.
  for(var i = 0; i < this.board.grid.length; i++){
    if (this.board.grid[i][0] == this.board.grid[i][1] && this.board.grid[i][0] == this.board.grid[i][2]){
      if (this.board.grid[i][0] == this.playerOne.mark){
        return "Player One";
      } else if (this.board.grid[i][0] == this.playerTwo.mark){
        return "Player Two";
      }
    }
  }
  // VERTICAL WIN
  for(var k = 0; k < this.board.grid[0].length; k++) {
    if (this.board.grid[0][k] == this.board.grid[1][k] && this.board.grid[0][k] == this.board.grid[2][k]){
      if (this.board.grid[0][k] == this.playerOne.mark){
        return "Player One";
      } else if (this.board.grid[0][k] == this.playerTwo.mark){
        return "Player Two";
      }
    }
  }

  // DIAGONAL WINS
  if (this.board.grid[0][0] == this.board.grid[1][1] && this.board.grid[0][0] == this.board.grid[2][2]){
    if (this.board.grid[0][0] == this.playerOne.mark){
      return "Player One";
    } else if (this.board.grid[0][0] == this.playerTwo.mark){
      return "Player Two";
    }
  }
  if (this.board.grid[0][2] == this.board.grid[1][1] && this.board.grid[0][2] == this.board.grid[2][0]){
    if (this.board.grid[0][2] == this.playerOne.mark){
      return "Player One";
    } else if (this.board.grid[0][2] == this.playerTwo.mark){
      return "Player Two";
    }
  }

  return null;
};

Game.prototype.play = function(a,b){

  // Error Handling of input type
  if (typeof a !== "number" || typeof b !== "number" ){
    throw new Error("coordinates must be integer numbers between 0-2");
  } else if (a < 0 || a > 2 || b < 0 || b > 2){
    throw new Error("This is not a valid square");
  } if (a % 1 !== 0 || b % 1 !== 0){
    throw new Error("Coordinates of Squares must be whole numbers between 0 and 2");
  }

  if (this.winner()){
    return "Sorry the game has already been won.";
  } else if (this.validSquare(a,b) === false) {
    return "Sorry, the square is already played, please pick another one";
  } else if (this.winner() === null && this.validSquare(a,b)) {
    // Checking to see whose turn it is.
    if (this.playerOne.turn){
      this.board.grid[a][b] = this.playerOne.mark;
    } else if (this.playerTwo.turn) {
      this.board.grid[a][b] = this.playerTwo.mark;
    }
    if(this.winner()) {
      return "Congratulations, " + this.winner() + " has won!";
    }
    this.toggleTurn();
  }
  //
  // console.log("BOARD");
  // console.log(this.board.grid[0]);
  // console.log(this.board.grid[1]);
  // console.log(this.board.grid[2]);
};

export default Game;