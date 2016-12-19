import Backbone from 'backbone';

const Player = Backbone.Model.extend({
  defaults: {
    turn: false,
    mark: null
  }
});

export default Player;
