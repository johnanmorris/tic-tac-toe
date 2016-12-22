import Game from 'app/models/game';

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

  describe("validSquare", function(){
    it("should return true if the square is null", function(){
      expect(game.validSquare(2,1)).toEqual(true);
    });

    it("should return false if the square is an X or O", function(){
      game.board[0][1] = "X";
      expect(game.validSquare(0,1)).toEqual(false);
    });
  });

  describe("flattenBoard", function(){
    it("should flatten the board and replace nulls with spaces", function(){
      game.board[0] = [null, "X", null];
      game.board[1] = [null, "X", null];
      game.board[2] = [null, "X", null];
      game.flattenBoard();
      expect(game.board.length).toEqual(9);
      expect(game.board[0]).toEqual(" ");
    });
  });

  describe("winner", function(){
    it("should return true for horizontal win in first row and set the outcome", function(){
      game.board[0] = ["X","X","X"];
      expect(game.winner()).toEqual(true);
      expect(game.outcome).toEqual("X");
    });
    it("should return true for horizontal win in second row and set the outcome", function(){
      game.board[1] = ["X","X","X"];
      expect(game.winner()).toEqual(true);
      expect(game.outcome).toEqual("X");
    });
    it("should return true for horizontal win in third row and set the outcome", function(){
      game.board[2] = ["O","O","O"];
      expect(game.winner()).toEqual(true);
      expect(game.outcome).toEqual("O");
    });

    it("should return true for a vertical win in the first column and set the outcome", function(){
      game.board[0][0] = "O";
      game.board[0][1] = "O";
      game.board[0][2] = "O";
      expect(game.winner()).toEqual(true);
      expect(game.outcome).toEqual("O");
    });

    it("should return true for a vertical win in the second column and set the outcome", function(){
      game.board[1][0] = "O";
      game.board[1][1] = "O";
      game.board[1][2] = "O";
      expect(game.winner()).toEqual(true);
      expect(game.outcome).toEqual("O");
    });

    it("should return true for a vertical win in the third column and set the outcome", function(){
      game.board[2][0] = "X";
      game.board[2][1] = "X";
      game.board[2][2] = "X";
      expect(game.winner()).toEqual(true);
      expect(game.outcome).toEqual("X");
    });

    it("should return true for a left diagonal win and set the outcome", function(){
      game.board[0][0] = "X";
      game.board[1][1] = "X";
      game.board[2][2] = "X";
      expect(game.winner()).toEqual(true);
      expect(game.outcome).toEqual("X");
    });

    it("should return true for a right diagonal win and set the outcome", function(){
      game.board[0][2] = "O";
      game.board[1][1] = "O";
      game.board[2][0] = "O";
      expect(game.winner()).toEqual(true);
      expect(game.outcome).toEqual("O");
    });

    it("should return false if there is not yet a winner", function(){
      expect(game.winner()).toEqual(false);
      expect(game.outcome).toEqual(null);
    });

    it("should return null if the game ends in a draw and set the outcome to 'draw'", function(){
      game.board = [["X", "O", "X"],["O", "X", "O"],["O", "X", "O"]];
      expect(game.winner()).toEqual(null);
      expect(game.outcome).toEqual("draw");
    });
  });

  describe("play", function(){
    it("should play a square if it is valid and game hasn't been won yet", function(){
      game.play(1,1);
      var square = game.board[1][1];
      expect(square).toEqual(game.playerOne.get('mark'));
    });

    it("should toggle the turns once a valid play is completed", function(){
      expect(game.playerOne.get('turn')).toEqual(true);
      game.play(1,1);
      expect(game.board[1][1]).toEqual(game.playerOne.get('mark'));
      expect(game.playerOne.get('turn')).toEqual(false);
      expect(game.playerTwo.get('turn')).toEqual(true);
    });

    it("should throw an error when a player plays a play out of range (0-2)", function(){
      expect(function(){game.play(2,3);}).toThrowError("Coordinates must be integers between 0 and 2 inclusive");
      expect(function(){game.play(2,-1);}).toThrowError("Coordinates must be integers between 0 and 2 inclusive");
      expect(function(){game.play(-1,2);}).toThrowError("Coordinates must be integers between 0 and 2 inclusive");
      expect(function(){game.play(-1,3);}).toThrowError("Coordinates must be integers between 0 and 2 inclusive");
    });

    it("should throw an error when a player references a square with anything other then typeof number", function(){
      expect(function(){game.play(2,"purple");}).toThrowError("Coordinates must be integers between 0 and 2 inclusive");
      expect(function(){game.play(true,0);}).toThrowError("Coordinates must be integers between 0 and 2 inclusive");
      expect(function(){game.play([1,2]);}).toThrowError("Coordinates must be integers between 0 and 2 inclusive");
      expect(function(){game.play(1.1,2);}).toThrowError("Coordinates must be integers between 0 and 2 inclusive");
    });

    it("should throw an error when a player plays a square with non-integer coordinates", function(){
      expect(function(){game.play(1.1,2);}).toThrowError("Coordinates must be integers between 0 and 2 inclusive");
    });

    it("should thow an error when the game has already been won", function(){
      game.board = [
        [null,null,"O"],
        [null,"O",null],
        ["O",null,null]];
      expect(function(){game.play(1,1);}).toThrowError("Game has already been won.");
    });

    it("should thrown an error if the square isn't valid", function(){
      game.board = [[null,null,"O"],[null,"O",null],["X",null,null]];
      expect(function(){game.play(1,1);}).toThrowError("Invalid square");
    });


  });

  describe("isFull", function(){
    it("should return true if all values are NOT null", function(){
      game.board = [["O","X","O"],["X","O","X"],["X","O","X"]];
      expect(game.isFull()).toEqual(true);
    });

    it("should return false if any value is null", function(){
      expect(game.isFull()).toEqual(false);
    });
  });
});
