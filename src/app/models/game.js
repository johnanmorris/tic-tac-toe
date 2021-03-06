import Backbone from 'backbone';
import Player from 'app/models/player';

var Game = Backbone.Model.extend({
  urlRoot: 'http://localhost:3000/api/v1/games/',

  initialize: function(options){
    this.playerOne = new Player({mark: "X", turn: true});
    this.playerTwo = new Player({mark: "O", turn: false});
    this.board = [ [null,null,null], [null,null,null], [null,null,null]];
    this.outcome = null;
    this.playerMarks = [this.playerOne.get('mark'), this.playerTwo.get('mark')];
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
    var square = this.board[a][b];
    if(square === null) {
      return true;
    } else {
      return false;
    }
  },

  isFull: function(){
    for(var i = 0; i < this.board.length; i++){
      for(var j = 0; j < this.board[i].length; j++){
        if(this.board[i][j] === null){
          return false;
        }
      }
    }
    return true;
  },

  flattenBoard: function(){
    this.board = [].concat.apply([], this.board);
    for(var i = 0; i < this.board.length; i++) {
      if (this.board[i] === null) {
        this.board[i] = " ";
      }
    }
  },

  winner: function(){
    // FOR THE HORIZONTAL WIN
    for(var i = 0; i < this.board.length; i++){
      if (this.board[i][0] == this.board[i][1] && this.board[i][0] == this.board[i][2] && this.board[i][0] !== null){
        this.outcome = this.board[i][0];
        this.flattenBoard();
        return true;
      }
    }

    // VERTICAL WIN
    for(var k = 0; k < this.board[0].length; k++) {
      if (this.board[0][k] == this.board[1][k] && this.board[0][k] == this.board[2][k] && this.board[0][k] !== null){
        this.outcome = this.board[0][k];
        this.flattenBoard();
        return true;
      }
    }

    // DIAGONAL WINS
    if (this.board[0][0] == this.board[1][1] && this.board[0][0] == this.board[2][2] && this.board[1][1] !== null){
      this.outcome = this.board[1][1];
      this.flattenBoard();
      return true;
    }

    if (this.board[0][2] == this.board[1][1] && this.board[0][2] == this.board[2][0] && this.board[1][1] !== null){
      this.outcome = this.board[1][1];
      this.flattenBoard();
      return true;
    }

    else if (this.isFull() === true) {
      this.outcome = 'draw';
      this.flattenBoard();
      return null;
    }
    else {
      return false;
    }
  },

  play: function(a,b){
    if (typeof a !== "number" || typeof b !== "number" ){
      throw new Error("Coordinates must be integers between 0 and 2 inclusive");
    } else if (a < 0 || a > 2 || b < 0 || b > 2){
      throw new Error("Coordinates must be integers between 0 and 2 inclusive");
    } else if (a % 1 !== 0 || b % 1 !== 0){
      throw new Error("Coordinates must be integers between 0 and 2 inclusive");
    } else if (this.winner()) {
      throw new Error("Game has already been won.");
    } else if (!(this.validSquare(a, b))) {
      throw new Error("Invalid square");
    } else {
      this.board[a][b] = this.currentPlayer().get('mark');
      this.toggleTurn();
      this.trigger('change');
    }
  }
});

export default Game;
