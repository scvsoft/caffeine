describe("Game", function() {
  var game;
  beforeEach(function() {
    game = new Game({}, {});
  });

  describe("#start", function() {
    it("should reset players wins to 0", function() {
      game.start();

      expect(game.player1.wins).toEqual(0);
      expect(game.player2.wins).toEqual(0);
    });
  });

  describe("a game round", function() {

    beforeEach(function() {
      game.start();
      game.nextRound();
    });

    describe("when player1 plays 'rock' and player2 plays 'scissors'", function() {
      beforeEach(function() {
        game.choosePlay(game.player1, 'rock');
        game.choosePlay(game.player2, 'scissors');
      });

      it("should set player1 as winner, because rock crushes scissors", function() {
        var result = game.playRound();
        expect(result.result).toEqual('winner');
        expect(result.winner).toBe(game.player1);
      });
    });

    scenarios([
      {player1: 'lizard', player2: 'scissors', winner: 'player2', because: 'scissors decapitates lizard'},
      {player1: 'rock', player2: 'scissors', winner: 'player1'},
      {player1: 'rock', player2: 'rock', result: 'draw'},
      {player1: 'spock', player2: 'lizard', winner: 'player2', because: 'lizard poisons spock'}
    ]);

    function scenarios(scenarios) {
      scenarios.forEach(function(scenario) {
        var describeMsg = "when player1 plays '"+scenario.player1+"' and player2 plays '"+scenario.player2+"'";
        describe(describeMsg, function() {
          beforeEach(function() {
            game.choosePlay(game.player1, scenario.player1);
            game.choosePlay(game.player2, scenario.player2);
          });

          if (scenario.winner) {
            var itMsg = "should set "+scenario.winner+" as winner";
            if (scenario.because)
              itMsg += ", because " + scenario.because;
            it(itMsg, function() {
              var result = game.playRound();
              expect(result.result).toEqual('winner');
              expect(result.winner).toBe(game[scenario.winner]);
            });
          }
          else {
            it("should set a draw", function() {
              var result = game.playRound();
              expect(result.result).toEqual('draw');
            });
          }
        });
      });
    }

  });

  describe("the game ending", function() {
    describe("when player 1 wins 3 times", function() {
      beforeEach(function() {
        game.start();

        for (var i = 0; i < 3; i++) {
          game.nextRound();
          game.choosePlay(game.player1, 'rock');
          game.choosePlay(game.player2, 'scissors');
          game.playRound();
        }
      });

      it("should be ended", function() {
        expect(game.hasEnded()).toBe(true);
      });

      it("should set player 1 as winner", function() {
        expect(game.winner()).toBe(game.player1);
      });
    });

    describe("when player 1 wins 1 time and player 2 wins 2 times", function() {
      beforeEach(function() {
        game.start();

        for (var i = 0; i < 2; i++) {
          game.nextRound();
          game.choosePlay(game.player1, 'spock');
          game.choosePlay(game.player2, 'lizard');
          game.playRound();
        }

        game.nextRound();
        game.choosePlay(game.player1, 'paper');
        game.choosePlay(game.player2, 'rock');
        game.playRound();
      });

      it("should be ended", function() {
        expect(game.hasEnded()).toBe(true);
      });

      it("should set player 2 as winner", function() {
        expect(game.winner()).toBe(game.player2);
      });
    });
  });
});