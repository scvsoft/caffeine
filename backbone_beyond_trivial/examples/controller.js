var PostView = Backbone.Marionette.ItemView.extend({
  initialize: function(params) {
    this.currentUser = params.currentUser;
  },

  template: function(data) {
    return '<h1>'+data.title+'</h1><p>'+data.content+'</p><a href="#">Like</a>';
  },

  events: {
    'click a': '_onPostLiked'
  },

  _onPostLiked: function(ev) {
    ev.preventDefault();

    var likedPosts = this.currentUser.get('likedPosts');
    if (!likedPosts.contains(this.model)) {
      likedPosts.add(this.model);
    }
  }
});

var LikesView = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.collection, 'add remove', this.render);
  },

  render: function() {
    this.$el.html('You like '+ this.collection.length +' posts.');
    return this;
  }
});

var currentUser = new Backbone.Model({ likedPosts: new Backbone.Collection([{}, {}, {}]) });
var post = new Backbone.Model({ title: "Some post title", content: "Some cool content for this post"});

var postView = new PostView({ model: post, currentUser: currentUser });
var likesView = new LikesView({ collection: currentUser.get('likedPosts') });

$(function() {
  $('body').append(postView.render().el).append(likesView.render().el);
});
































// var PostController = function(params) {
//   this.currentUser = params.currentUser;
//   this.listenTo(params.view, 'like', function(post) {
//     var likedPosts = this.currentUser.get('likedPosts');
//     if (!likedPosts.contains(post)) {
//       likedPosts.add(post);
//     }
//   });
// };
// _.extend(PostController.prototype, Backbone.Events);

//var postController = new PostController({view: postView, currentUser: currentUser});