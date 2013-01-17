module.exports = {
  MiddleEarthCreature: MiddleEarthCreature,
  Hobbit: Hobbit,
  Elf: Elf,
  Human: Human
};

var elfic = {
  say: function(what) {
    if (what === "hello")
      return "Êl síla erin lû e-govaned vîn.";
  }
};

var hobbit = {
  say: function(what) {
    if (what === "hello")
      return "Hello, fellow!";
  }
};

var human = {
  say: function(what) {
    if (what === "hello")
      return "Hi!";
  }
};

function MiddleEarthCreature(language, size) {
  this.language = language;
  this.size = size;
}

MiddleEarthCreature.prototype = {
  sayHello: function() {
    return this.name + ", a " + this.size + " creature says: " + this.language.say("hello");
  }
};

function Hobbit(name) {
  this.name = name;
}

Hobbit.prototype = new MiddleEarthCreature(hobbit, 'middle');
Hobbit.prototype.smoke = function() {
  return "Oh, what a nice pipe-weed";
};

function Elf(name) {
  this.name = name;
}

Elf.prototype = new MiddleEarthCreature(elfic, 'tall');
Elf.prototype.playFlute = function() {
  return "Tururururuuuu";
};

function Human(name) {
  this.name = name;
}

Human.prototype = new MiddleEarthCreature(human, 'tall');
Human.prototype.drinkWine = function() {
  return "Nice cup!";
};

var bilbo = new Hobbit("Bilbo");
console.log(bilbo.sayHello());
console.log(bilbo.smoke());

var galadriel = new Elf("Galadriel");
console.log(galadriel.sayHello());
console.log(galadriel.playFlute());

var aragorn = new Human("Aragorn");
console.log(aragorn.sayHello());
console.log(aragorn.drinkWine());