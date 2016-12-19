import Backbone from 'backbone';

const Board = Backbone.Model.extend({
  defaults: {
    grid: [ [null,null,null], [null,null,null], [null,null,null]],
  },

  isFull: function(){
    for(var i = 0; i < this.get("grid").length; i++){
      for(var j = 0; j < this.get("grid")[i].length; j++){
        if(this.get("grid")[i][j] === null){
          return false;
        }
      }
      return true;
    }
  },
});

export default Board;
