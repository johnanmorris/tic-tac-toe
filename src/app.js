import $ from 'jquery';

import GameView from 'app/views/game_view';
import Game from 'app/models/game';
import GameCollection from 'app/collections/game_collection';

$(document).ready(function() {
  var game = new Game();
  var gameCollection = new GameCollection();

  var gameView = new GameView({
    el: 'main',
    model: game,
    collection: gameCollection
  });

  gameView.render();
});
