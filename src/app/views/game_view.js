import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

var GameView = Backbone.View.extend({
  initialize: function(options){
    _.bindAll(this, "render");
    this.model.bind('change', this.render);
    this.listenTo(this.model, 'update', this.render);
    this.collection = options.collection;
    this.gameListElement = $('#game-hist');
  },

  render: function() {
    // this.gameListElement.empty();
    this.model.board.forEach(function(row, i){
      row.forEach(function(cell, j){
        var squareID = "sq-" + i + "-" + j;
        console.log(cell);
        $("#" + squareID).html(cell);
      });
    });

    this.collection.fetch().done(function(data){
      var gameUl = $('#game-hist');
      gameUl.empty();
      data.forEach(function(game){
        console.log(game);
        var date = new Date(game.played_at);
        var formattedDate = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + " @ " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        var gameLi = $('<li class="column"></li>');
        gameLi.append(game.id + " (played " + formattedDate + " ): " + game.outcome);
        gameUl.append(gameLi);
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

    if (this.model.winner()) {
      // SEND WINNER DATA TO API
      var wonGame = {
        board: this.model.board,
        players: this.model.playerMarks,
        outcome: this.model.outcome
      };
      console.log(wonGame);
      this.collection.create(wonGame);
      alert("Congratulations! The winner is " + this.model.outcome + "!");
    } else if (!(this.model.winner()) && this.model.isFull()) {
      var tieGame = {
        board: this.model.board,
        players: this.model.playerMarks,
        outcome: this.model.outcome
      };
      this.collection.create(tieGame);
      alert("The game has ended in a tie.");
    }
  },

  startNewGame: function(e){
    // clears board and initiates new game -- sort of;
    console.log("You've started a new game");
    this.clearBoard(e);
    this.render();
  },
});

export default GameView;
