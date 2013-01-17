// Crockford's shim
Object.create = function (o) {
    function F() {}
    F.prototype = o;
    return new F();
};

// Optimized version: Reuse function F
Object.create = (function () {
  function F() {} // created only once
  return function (o) {
    F.prototype = o; // reused on each invocation
    return new F();
  };
})();


var proto = {
  sayHello: function() {
    return "My name is " + this.name + " and I salute you!";
  }
};

var someone = Object.create(proto);

someone.name = "Lenny";

console.log(someone.sayHello());