import Board from 'app/models/board';

describe("Board", function() {
  var board;
  beforeEach(function(){
    board = new Board();
  });

  it("it must have a variable that is an array", function(){
    expect(board.get('grid')[0]).toEqual([null,null,null]);
    expect(board.get('grid')[1]).toEqual([null,null,null]);
    expect(board.get('grid')[2]).toEqual([null,null,null]);
  });

  it("the grid should not be longer than 3", function(){
    expect(board.get('grid')[3]).not.toBeDefined();
  });

  // TO BE DONE WHEN WE HAVE A WAY TO FILL THE BOARD
  describe("isFull", function(){
    it("should return true if all values are NOT null", function(){
      board.set({grid: [["O","X","O"],["X","O","X"],["X","O","X"]]});
      expect(board.isFull()).toEqual(true);
    });

    it("should return false if any value is null", function(){
      expect(board.isFull()).toEqual(false);
    });
  });
});
