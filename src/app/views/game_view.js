import Backbone from 'backbone';
import BoardView from 'app/views/board_view';

var ApplicationView = Backbone.View.extend({
  initialize: function(){
    this.render();
  },

  events: {
    'click #new-game': 'startNewGame'
  },

  clearBoard: function(e){
    console.log("Board cleared");
  },

  startNewGame: function(e){
    // clears board and initiates new game
    console.log("You've started a new game");
    this.clearBoard(e);
  },

  render: function() {
    var board = new BoardView( {
      el: '#board'
    });
    return this;
  }
});

export default ApplicationView;
