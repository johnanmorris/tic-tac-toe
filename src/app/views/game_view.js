import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

var GameView = Backbone.View.extend({
  initialize: function(options){
    _.bindAll(this, "render");
    this.model.bind('change', this.render);
  },

  render: function() {
    this.model.board.forEach(function(row, i){
      row.forEach(function(cell, j){
        var squareID = "sq-" + i + "-" + j;
        console.log(cell);
        $("#" + squareID).html(cell);
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
    this.model.board = [[null, null, null], [null, null, null], [null, null, null]];
    console.log("Board cleared");
  },

  playSquare: function(e){
    var clicked = $(e.currentTarget);
    var squareID = clicked.attr("id");
    var firstVal = clicked.attr("id")[3];
    var secondVal = clicked.attr("id")[5];
    var playMark = this.model.currentPlayer().get("mark");
    console.log(squareID);
    this.model.play(parseInt(firstVal),parseInt(secondVal));

    console.log(this.model.board[0]);
    console.log(this.model.board[1]);
    console.log(this.model.board[2]);

    console.log("played " + playMark + " at " + firstVal + ", " + secondVal);
  },

  startNewGame: function(e){
    // clears board and initiates new game
    console.log("You've started a new game");
    this.clearBoard(e);
    this.render();
  },

  displayWinner: function() {
    if (this.model.winner()) {

    }
  }

});

export default GameView;
