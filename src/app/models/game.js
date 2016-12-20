import Backbone from 'backbone';
import Board from 'app/models/board';
import Player from 'app/models/player';

var Game = Backbone.Model.extend({
  initialize: function(options){
    this.playerOne = new Player({mark: "X", turn: true});
    this.playerTwo = new Player({mark: "O", turn: false});
    this.board = new Board();

    // this.playerOne = new Player();
    // this.playerTwo = new Player();
    // this.board = new Board();
    //
    // this.playerOne.set("mark", "X");
    // this.playerTwo.set("mark", "O");
    // this.playerOne.set("turn", true);
  },

  toggleTurn: function() {
    this.playerOne.set({
      turn: !(this.playerOne.get('turn'))
    });

    this.playerTwo.set({
      turn: !(this.playerTwo.get('turn'))
    });
  },

  currentPlayer: function(){
    if (this.playerOne.get('turn') === true){
      return this.playerOne;
    } else if (this.playerTwo.get('turn') === true) {
      return this.playerTwo;
    }
  },

  validSquare: function(a, b) {
    var square = this.board.grid[a][b];
//    console.log("SQUARE >>> " + square);
    if(square === null) {
      return true;
    } else {
      return false;
    }
  },

  winner: function(){
    // FOR THE HORIZONTAL WIN - STILL TO DETERMINE IF WE CNA PUT THIS IN A LOOP VS HARD CODING.

    for(var i = 0; i < this.board.grid.length; i++){
      if (this.board.grid[i][0] == this.board.grid[i][1] && this.board.grid[i][0] == this.board.grid[i][2] && this.board.grid[i][0] !== null){
        return this.board.grid[i][0];
      }
    }
    // VERTICAL WIN
    for(var k = 0; k < this.board.grid[0].length; k++) {
      if (this.board.grid[0][k] == this.board.grid[1][k] && this.board.grid[0][k] == this.board.grid[2][k] && this.board.grid[0][k] !== null){
        return this.board.grid[0][k];
      }
    }

    // DIAGONAL WINS
    if (this.board.grid[0][0] == this.board.grid[1][1] && this.board.grid[0][0] == this.board.grid[2][2] && this.board.grid[1][1] !== null){
      return this.board.grid[1][1];
    }
    if (this.board.grid[0][2] == this.board.grid[1][1] && this.board.grid[0][2] == this.board.grid[2][0] && this.board.grid[1][1] !== null){
      return this.board.grid[1][1];
    }

    return null;
  },

  play: function(a,b){

    // Error Handling of input type. Technically could be in one if-statement, but separated out if clear what each is looking for.
    if (typeof a !== "number" || typeof b !== "number" ){
      throw new Error("Coordinates must be integer numbers between 0 and 2 inclusive");
    } else if (a < 0 || a > 2 || b < 0 || b > 2){
      throw new Error("Coordinates must be integer numbers between 0 and 2 inclusive");
    } else if (a % 1 !== 0 || b % 1 !== 0){
      throw new Error("Coordinates must be integer numbers between 0 and 2 inclusive");
    }

    if (this.winner()){
      return "Sorry the game has already been won.";
    } else if (this.validSquare(a,b) === false) {
      return "Sorry, the square is already played, please pick another one";
    } else if (this.winner() === null && this.validSquare(a,b)) {
      // Checking to see whose turn it is.

      this.board.grid[a][b] = this.currentPlayer().get('mark');

      if(this.winner()) {
        return "Congratulations, " + this.winner() + " has won!";
      }
      this.toggleTurn();
    }
  }
});

export default Game;
