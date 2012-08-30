jasmine.getFixtures().fixturesPath = '/';

describe("Game UI", function() {
  var game;
  beforeEach(function() {
    var index = $(readFixtures('index.html')).filter(':not(script, link)');
    setFixtures(index);

    var OriginalGame = window.Game;
    spyOn(window, 'Game').andCallFake(function(player1, player2) {
      game = new OriginalGame(player1, player2);
      return game;
    });

    gameUI.init();
  });

  it("should have the play button disabled", function() {
    expect($('#game :submit')).toBeDisabled();
  });

  describe("when starting a game", function() {
    beforeEach(function() {
      $('#new').trigger('click');
    });

    it("should enable play button", function() {
      expect($('#game :submit')).not.toBeDisabled();
    });

    it("should set 1 in rounds input", function() {
      expect($('#round')).toHaveText(1);
    });

    it("should set 0 wins for the players", function() {
      expect($('#player1-wins')).toHaveText(0);
      expect($('#player2-wins')).toHaveText(0);
    });

    describe("when choosing rock for player 1 and scissors for player 2 and clicking play", function() {
      beforeEach(function() {
        $('[name=player1-choice]').val('rock');
        $('[name=player2-choice]').val('scissors');
        $('#game').trigger('submit');
      });

      it("should increase the round number", function() {
        expect($('#round')).toHaveText(2);
      });

      it("should set 1 win to player 1", function() {
        expect($('#player1-wins')).toHaveText(1);
      });

      it("should show 'Won' on player 1 status", function() {
        expect($('#player1-status')).toHaveText("Won");
      });

      it("should set 0 wins on player 2", function() {
        expect($('#player2-wins')).toHaveText(0);
      });

      it("should show 'Lost' on player 2 status", function() {
        expect($('#player2-status')).toHaveText("Lost");
      });
    });

    describe("when choosing rock for player 1 and player 2 and clicking play", function() {
      beforeEach(function() {
        $('[name=player1-choice]').val('rock');
        $('[name=player2-choice]').val('rock');
        $('#game').trigger('submit');
      });

      it("should not increase the round number", function() {
        expect($('#round')).toHaveText(1);
      });

      it("should set 0 wins to player 1", function() {
        expect($('#player1-wins')).toHaveText(0);
      });

      it("should show 'Draw' on player 1 status", function() {
        expect($('#player1-status')).toHaveText("Draw");
      });

      it("should set 0 wins to player 2", function() {
        expect($('#player2-wins')).toHaveText(0);
      });

      it("should show 'Draw' on player 2 status", function() {
        expect($('#player2-status')).toHaveText("Draw");
      });
    });

    describe("when the game ends and player 1 wins", function() {
      beforeEach(function() {
        spyOn(game, 'hasEnded').andReturn(true);
        spyOn(game, 'winner').andReturn(game.player1);

        $('[name=player1-choice]').val('rock');
        $('[name=player2-choice]').val('scissors');
        $('#game').trigger('submit');

      });

      it("should disable the play button", function() {
        expect($('#game :submit')).toBeDisabled();
      });

      it("should show 'Won Game' on player 1 status", function() {
        expect($('#player1-status')).toHaveText("Won Game");
      });

      it("should show 'Lost Game' on player 2 status", function() {
        expect($('#player2-status')).toHaveText("Lost Game");
      });
    });
  });
});