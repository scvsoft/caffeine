var PostRowView = Backbone.Marionette.ItemView.extend({
  tagName: 'li',

  template: function(data) {
    return '<a href="#">'+data.title+'</a>';
  },

  events: {
    'click a': '_showPost'
  },

  _showPost: function(ev) {
    ev.preventDefault();
    this.trigger('show', this.model);
  }
});

var PostView = Backbone.Marionette.ItemView.extend({
  template: function(data) {
    return '<h1>'+data.title+'</h1><p>'+data.content+'</p>';
  }
});

var PostsView = Backbone.Marionette.CollectionView.extend({
  itemView: PostRowView
});

var SidebarView = Backbone.View.extend({
  render: function() {
    this.$el.html('<a href="#">Back to posts</a>');
  },

  events: {
    'click a': '_backToPosts'
  },

  _backToPosts: function(ev) {
    ev.preventDefault();
    this.trigger('backToPosts');
  }
});

var Layout = Backbone.Marionette.Layout.extend({
  regions: {
    sidebar: "#sidebar",
    content: "#content"
  },

  template: function() {
    return '<section id="sidebar"></section><section id="content"></section>';
  }
});

// Model bootstrap
var posts = new Backbone.Collection();
_(10).times(function(n) { posts.add({title: 'Post ' + n, content: 'Content for Post ' + n}); });

// Layout
var layout = new Layout();
layout.render();

// Views
var postsView = new PostsView({ collection: posts });
var sidebarView = new SidebarView();

// Views in Layout
layout.content.show(postsView);
layout.sidebar.show(sidebarView);

// Wire up events
postsView.on('itemview:show', function(view, post) {
  layout.content.show(new PostView({ model: post }));
});
sidebarView.on('backToPosts', function() {
  layout.content.show(postsView);
});

$(function() {
  $('body').append(layout.el);
});