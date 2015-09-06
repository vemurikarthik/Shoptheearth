

Router.configure({ layoutTemplate: 'layout'
});


Router.map(function() { 



	this.route('home', {path: '/'});
	this.route('postsList', {path: '/postlist'});
	this.route('myPostsList', {path: '/mypostlist'});
	this.route('DealSubmit', {path: '/dealSubmit'});
	   this.route('dealPage', {path: '/posts/:_id',data: function() { 
    		return Posts.findOne(this.params._id); }
   });


});



