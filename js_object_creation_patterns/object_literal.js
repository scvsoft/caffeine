// Example
var point = {x: 10, y: 20};

// With functions
var configuration = {
  allowResize: true,
  resize: function(width, height) {
    if (this.allowResize) {
      this.width = width;
      this.height: height;
    }
  }
};