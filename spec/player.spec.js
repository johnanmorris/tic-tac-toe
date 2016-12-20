import Player from 'app/models/player';

describe("Player", function() {
  var player;
  beforeEach(function(){
    player = new Player();
  });

  it("must be able to create a new instance of player", function(){
    // To be determined: test Type of / object defined
    expect(player).not.toBe(null);
    expect(player).toBeTruthy();

  });

  // I don't think I need these for Backbone anymore

  // it("should have a turn variable defaulted to false", function(){
  //   expect(player.get('turn')).toBeDefined();
  //   expect(player.get('turn')).toBe(false);
  // });
  //
  // it("should have a mark variable", function() {
  //   expect(player.get('mark')).toBeDefined();
  //   expect(player.get('mark')).toBe(null);
  // });
});
