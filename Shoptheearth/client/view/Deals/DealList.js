

Template.postsList.helpers({ 
    posts: function() {
    	return Posts.find(); 
    	}			
});

Template.myPostsList.helpers({
	posts: function() {
    	return Posts.find({user_id:Meteor.userId()}); 
    	},
});