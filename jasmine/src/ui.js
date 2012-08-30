var gameUI = {
  init: function() {
    var player1 = new Player('Sheldon');
    var player2 = new Player('Leonard');
    var game = new Game(player1, player2);

    $('#new').click(startGame);

    $('#game').submit(function(ev) {
      ev.preventDefault();

      game.nextRound();

      player1.choose($('[name=player1-choice]').val());
      player2.choose($('[name=player2-choice]').val());

      var roundResult = game.playRound();

      if (roundResult.result === 'winner') {
        $('#round').text(game.round);
        if (player1 === roundResult.winner) {
          $('#player1-status').text('Won');
          $('#player1-wins').text(player1.wins);
          $('#player2-status').text('Lost');
        } else {
          $('#player1-status').text('Lost');
          $('#player2-status').text('Won');
          $('#player2-wins').text(player2.wins);
        }
      } else {
        $('#player1-status, #player2-status').text('Draw');
      }

      if (game.hasEnded()) {
        $('#game :submit').prop('disabled', true);
        if (player1 === game.winner()) {
          $('#player1-status').text('Won Game');
          $('#player2-status').text('Lost Game');
        } else {
          $('#player1-status').text('Lost Game');
          $('#player2-status').text('Won Game');
        }
      }

    });

    function startGame() {
      game.start();
      $('#game :submit').prop('disabled', false);
      $('#player1-wins, #player2-wins').text(0);
      $('#player1-status, #player2-status').text('-');
      $('#round').text(game.round);
    }
  }
};