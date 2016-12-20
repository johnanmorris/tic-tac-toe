import Backbone from 'backbone';

const Board = Backbone.Model.extend({
  initialize: function(options) {
    this.grid = [ [null,null,null], [null,null,null], [null,null,null]];
  },

  isFull: function(){
    for(var i = 0; i < this.grid.length; i++){
      for(var j = 0; j < this.grid[i].length; j++){
        if(this.grid[i][j] === null){
          return false;
        }
      }
      return true;
    }
  },
});

export default Board;
