var PostView = Backbone.View.extend({
  initialize: function() {
    this.model.on('change', this.render, this);
  },

  render: function() {
    this.$el.html("<h1>The post " + this.model.get('title') + "</h1>");
    return this;
  }
});


var post = new Backbone.Model();
var view = new PostView({ model: post });

$(function() {
  $('body').append(view.render().el);
});

//alert