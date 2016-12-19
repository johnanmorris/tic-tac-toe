import GameView from 'app/views/application';
import Game from 'app/models/game';
import BoardView from 'app/views/board_view';

var application = new Game();

var appView = new GameView({
  el: 'main',
  model: game
});
