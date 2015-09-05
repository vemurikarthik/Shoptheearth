Template.DealSubmit.events(
    
    { 
        
        'submit form': function(e) {
        e.preventDefault();
        var post = {
        title: $(e.target).find('[name=title]').val(),
        outlet: $(e.target).find('[name=outlet]').val(), 
        Description: $(e.target).find('[name=desc]').val(),
        actual: $(e.target).find('[name=actual]').val(),
        offer: $(e.target).find('[name=offer]').val(),
        lat: $(e.target).find('[name=lat]').val(),
        lng: $(e.target).find('[name=log]').val(),
        userId:Meteor.userId()


     }
            
        post._id = Posts.insert(post);
        Router.go('dealPage', post);
  }
     
});