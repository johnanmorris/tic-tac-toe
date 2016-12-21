import Backbone from 'backbone';
import $ from 'jquery';
// import BoardView from 'app/views/board_view';

var GameView = Backbone.View.extend({
  initialize: function(options){
    this.render();
  },

  render: function() {
    var boardArray = this.model.board;
    console.log(boardArray);
    boardArray.forEach(function(row, i){
      row.forEach(function(cell, j){
        var square = "#sq-" + i + "-" + j;
        // console.log($(square));
        // console.log($(cell));
        // $(square).append($(cell));
        // console.log(square);
        // console.log(cell);
      });
    });
    this.delegateEvents();
    console.log("render!");
    return this;
  },

  events: {
    'click #new-game': 'startNewGame',
    'click .square': 'playSquare'
  },

  clearBoard: function(e){
    console.log("Board cleared");
  },

  playSquare: function(e){
    var clicked = $(e.currentTarget);
    var firstVal = clicked.attr("id")[3];
    var secondVal = clicked.attr("id")[5];
    var playMark = this.model.currentPlayer().get("mark");

    this.model.play(parseInt(firstVal),parseInt(secondVal));
    console.log("played " + playMark + " at " + firstVal + ", " + secondVal);
  },

  startNewGame: function(e){
    // clears board and initiates new game
    console.log("You've started a new game");
    this.clearBoard(e);
  },

});

export default GameView;
