function Car(model, wheels, maxSpeed) {
  this.model = model;
  this.wheels = wheels;
  this.maxSpeed = maxSpeed;
  this.velocity = 0;

  this.accelerate = function() {
    this.velocity += 10;
  },

  this.brake = function() {
    this.velocity -= 10;
  }
}

var car = new Car('mini', 4, 240);

console.log(car);