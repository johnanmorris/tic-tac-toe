import Game from 'app/models/game';
import Board from 'app/models/board';

describe("Game", function(){
  var game;

  beforeEach(function(){
    game = new Game();
  });

  it("instantiates two new player instances", function(){
    expect(game.playerOne).toBeDefined();
    expect(game.playerTwo).toBeDefined();
  });

  it("should set Player One's mark to be X", function() {
    expect(game.playerOne.get('mark')).toEqual("X");
  });

  it("should set Player Two's mark to be O initially", function() {
    expect(game.playerTwo.get('mark')).toEqual("O");
  });

  it("should initialize Player One's turn to true", function() {
    expect(game.playerOne.get('turn')).toEqual(true);
  });

  it("should initialize Player Two's turn to false", function(){
    expect(game.playerTwo.get('turn')).toEqual(false);
  });

  it("instantiates a new instance of the Board", function() {
    expect(game.board).toBeDefined();
  });

  describe("toggleTurn", function() {
    it("should swap the boolean values of players' turns", function(){
      game.toggleTurn();
      expect(game.playerOne.get('turn')).toEqual(false);
      expect(game.playerTwo.get('turn')).toEqual(true);
    });

    it("should swap the boolean values of players' turns again", function(){
      game.toggleTurn();
      game.toggleTurn();
      expect(game.playerOne.get('turn')).toEqual(true);
      expect(game.playerTwo.get('turn')).toEqual(false);
    });
  });

  describe("currentPlayer", function(){
    it("should return the player whose turn is true", function(){
      // Player One begins
      expect(game.currentPlayer()).toEqual(game.playerOne);

      // Once the turns have been toggled, the turn will switch over to Player Two
      game.toggleTurn();
      expect(game.currentPlayer()).toEqual(game.playerTwo);

      // And then back to Player One
      game.toggleTurn();
      expect(game.currentPlayer()).toEqual(game.playerOne);

    });
  });

  // Given a symbol (X or O) we should be able to say the winner. This is being used for refactoring since similar logic is used throughout.
  describe("playerByMark", function(){
    it("should return the player associated with the mark", function(){
      expect(game.playerByMark("X")).toEqual("Player One");
      expect(game.playerByMark("O")).toEqual("Player Two");
    });

    it("should only accept the marks of the players", function(){
      expect(function(){game.playerByMark("purple");}).toThrowError("Function only accepts the marks of the players which are passed as strings");
      expect(function(){game.playerByMark(1);}).toThrowError("Function only accepts the marks of the players which are passed as strings");
      expect(function(){game.playerByMark([1,2]);}).toThrowError("Function only accepts the marks of the players which are passed as strings");
    });
  });

  describe("validSquare", function(){
    it("should return true if the square is null", function(){
      expect(game.validSquare(2,1)).toEqual(true);
    });

    it("should return false if the square is an X or O", function(){
      game.board.set({grid: [[null,"X",null],[null,null,null],[null,null,null]]});
      expect(game.validSquare(0,1)).toEqual(false);
    });
  });

  describe("winner", function(){
    it("should return the proper winner for horizontal win", function(){
      game.board.set({grid: [["X","X","X"],[null,null,null],[null,null,null]] });
      expect(game.winner()).toEqual("Player One");
    });
    it("should return the proper winner for horizontal win", function(){
      game.board.set({grid: [[null,null,null],["X","X","X"],[null,null,null]] });
      expect(game.winner()).toEqual("Player One");
    });
    it("should return the proper winner for horizontal win", function(){
      game.board.set({grid: [[null,null,null],[null,null,null],["X","X","X"]] });
      expect(game.winner()).toEqual("Player One");
    });
    it("should return the proper winner for horizontal win", function(){
      game.board.set({grid: [[null,null,null],[null,null,null],["O","O","O"]] });
      expect(game.winner()).toEqual("Player Two");
    });

    it("should return null for no winner", function(){
      // console.log(">>>>>>>>>>>>>" + game.board.grid);
      expect(game.winner()).toEqual(null);
    });

    it("should return the proper winner for a vertical win", function(){
      game.board.set({grid: [["O",null,null],["O",null,null],["O",null,null]] });
      // console.log(">>>>>>>>>>>>>" + game.board.grid);
      expect(game.winner()).toEqual("Player Two");
    });

    it("should return the proper winner for a vertical win", function(){
      game.board.set({grid: [[null,"O",null],[null,"O",null],[null,"O",null]] });
      // console.log(">>>>>>>>>>>>>" + game.board.grid);
      expect(game.winner()).toEqual("Player Two");
    });

    it("should return the proper winner for a vertical win", function(){
      game.board.set({grid: [[null,null,"X"],["O",null,"X"],[null,null,"X"]] });
      // console.log(">>>>>>>>>>>>>" + game.board.grid);
      expect(game.winner()).toEqual("Player One");
    });

    it("should return the proper winner for a left diagonal win", function(){
      game.board.set({grid: [["X",null,null],[null,"X",null],[null,null,"X"]] });
      expect(game.winner()).toEqual("Player One");
    });

    it("should return the proper winner for a right diagonal win", function(){
      game.board.set({grid: [[null,null,"O"],[null,"O",null],["O",null,null]] });
      expect(game.winner()).toEqual("Player Two");
    });

    it("should return null if the entire game ends in a draw", function(){
      game.board.set({grid: [["X", "O", "X"],["O", "X", "O"],["O", "X", "O"]]});
      expect(game.winner()).toEqual(null);
    });
  });

  describe("play", function(){
    it("the play should not go through if the game has already been won", function(){
      game.board.set({grid: [[null,null,"O"],[null,"O",null],["O",null,null]] });
      expect(game.play(1,1)).toEqual("Sorry the game has already been won.");
    });

    it("the play should not go through if the square isn't valid", function(){
      game.board.set({grid: [[null,null,"O"],[null,"O",null],["X",null,null]] });
      expect(game.play(1,1)).toEqual("Sorry, the square is already played, please pick another one");
    });

    it("should play a square if it is valid and game hasn't been won yet", function(){
      game.play(1,1);
      var square = game.board.get('grid')[1][1];
      expect(square).toEqual(game.playerOne.get('mark'));
    });

    xit("should toggle the turns once a valid play is completed", function(){
      expect(game.playerOne.turn).toEqual(true);
      game.play(1,1);
      expect(game.board.grid[1][1]).toEqual(game.playerOne.mark);
      expect(game.playerOne.turn).toEqual(false);
      expect(game.playerTwo.turn).toEqual(true);
    });

    xit("should announce when a player has won", function(){
      game.play(0,0);
      game.play(0,2);
      game.play(1,1);
      game.play(1,2);
//      game.play(2,2);
      expect(game.play(2,2)).toEqual("Congratulations, " + game.winner() + " has won!");
    });

    xit("should throw an error when a player plays a play out of range (0-2)", function(){
      expect(function(){game.play(2,3);}).toThrowError("Coordinates must be integer numbers between 0 and 2 inclusive");
      expect(function(){game.play(2,-1);}).toThrowError("Coordinates must be integer numbers between 0 and 2 inclusive");
      expect(function(){game.play(-1,2);}).toThrowError("Coordinates must be integer numbers between 0 and 2 inclusive");
      expect(function(){game.play(-1,3);}).toThrowError("Coordinates must be integer numbers between 0 and 2 inclusive");
    });

    xit("should throw an error when a player references a square with anything other then typeof number", function(){
      expect(function(){game.play(2,"purple");}).toThrowError("Coordinates must be integer numbers between 0 and 2 inclusive");
      expect(function(){game.play(true,0);}).toThrowError("Coordinates must be integer numbers between 0 and 2 inclusive");
      expect(function(){game.play([1,2]);}).toThrowError("Coordinates must be integer numbers between 0 and 2 inclusive");
      expect(function(){game.play(1.1,2);}).toThrowError("Coordinates must be integer numbers between 0 and 2 inclusive");
    });

    xit("should throw an error when a player plays a square with non-integer coordinates", function(){
      expect(function(){game.play(1.1,2);}).toThrowError("Coordinates must be integer numbers between 0 and 2 inclusive");
    });
  });
});
