var View = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  events: {
    'change input[type="text"]': '_textChanged'
  },

  render: function() {
    var data = this.model.toJSON();

    var template = '<input type="text" value="<%= text %>"/><span><%= text %></span>';
    this.$el.html(_.template(template, data));
    return this;
  },

  _textChanged: function(ev) {
    var value = ev.target.value;
    this.model.set('text', value);
  }
});

var model = new Backbone.Model({text: "some text"});
var view = new View({ model: model });

$(function() {
  $('body').append(view.render().el);
});










































// rivets.configure({
//   adapter: {
//     subscribe: function(obj, keypath, callback) {
//       obj.on('change:' + keypath, callback);
//     },
//     unsubscribe: function(obj, keypath, callback) {
//       obj.off('change:' + keypath, callback);
//     },
//     read: function(obj, keypath) {
//       return obj.get(keypath);
//     },
//     publish: function(obj, keypath, value) {
//       obj.set(keypath, value);
//     }
//   }
// });