var Game = function(player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
  this.player1.game = this.player2.game = this;
};

Game.prototype = {
  bestOf: 3,

  start: function() {
    this.player1.wins = 0;
    this.player2.wins = 0;
    this.round = 1;
  },

  nextRound: function() {
    this.roundPlay = {};
  },

  choosePlay: function(player, play) {
    var playerKey = this.player1 === player? "player1":"player2";
    this.roundPlay[playerKey] = play;
  },

  playRound: function() {
    var player1Play = this.roundPlay.player1;
    var player2Play = this.roundPlay.player2;
    if (player1Play === player2Play)
      return {result: 'draw'};
    var defeated = this.defeats[player1Play];

    this.round ++;
    if (defeated.indexOf(player2Play) !== -1){
      this.player1.wins++;
      return {result: 'winner', winner: this.player1};
    }
    else {
      this.player2.wins++;
      return {result: 'winner', winner: this.player2};
    }
  },

  winner: function() {
    return (this.player1.wins > this.player2.wins) ? this.player1 : this.player2;
  },

  hasEnded: function() {
    return this.player1.wins + this.player2.wins >= this.bestOf;
  },

  defeats: {
    'rock': ['lizard', 'scissors'],
    'paper': ['rock', 'spock'],
    'scissors': ['paper', 'lizard'],
    'lizard': ['spock', 'paper'],
    'spock': ['scissors', 'rock']
  }
};

var Player = function(name) {
  this.name = name;
};

Player.prototype = {
  choose: function(play) {
    this.game.choosePlay(this, play);
  }
};