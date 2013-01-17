exports.Car = Car;

function Car(model, wheels, maxSpeed) {
  this.model = model;
  this.wheels = wheels;
  this.maxSpeed = maxSpeed;
  this.velocity = 0;
}

// Assigning properties to prototype object
Car.prototype.accelerate = function() {
  this.velocity += 10;
};
Car.prototype.brake = function() {
  this.velocity -= 10;
};

// Replacing prototype object with new one
Car.prototype = {
  accelerate: function() {
    this.velocity += 10;
  },
  brake: function() {
    this.velocity -= 10;
  }
};