function createPoint(x, y) {
  return {x: x, y: y};
}

var createSegment = function(pointA, pointB) {

  function distance(axis) {
    return Math.abs(this.a[axis] - this.b[axis]);
  }

  return {
    a: pointA,
    b: pointB,
    getSize: function() {
      var x = distance.call(this, 'x');
      var y = distance.call(this, 'y');
      return Math.sqrt(x * x + y * y);
    }
  }
};

var pointA = createPoint(1, 1);
var pointB = createPoint(5, 3);

var segment = createSegment(pointA, pointB);

console.log(segment.getSize());