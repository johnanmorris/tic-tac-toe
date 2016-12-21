import Backbone from 'backbone';
import $ from 'jquery';

var BoardView = Backbone.View.extend({
  initialize: function(){
    console.log(this);
  },

  events: {

  },

  playSquare: function(e){
    var square = $(e.currentTarget);
    var firstVal = square.attr("id")[3];
    var secondVal = square.attr("id")[5];
    console.log(this);
    // var playMark = this.model.currentPlayer().get("mark");
    console.log("playSquare: " + firstVal + ", " + secondVal);
  },

  render: function() {
    console.log("You are rendering the board view");
    return this;
  }
});

export default BoardView;
