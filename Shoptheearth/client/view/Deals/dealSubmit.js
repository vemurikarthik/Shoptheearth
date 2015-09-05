Template.DealSubmit.events(
    
    { 
        
        'submit form': function(e) {
        e.preventDefault();
        var post = {
        title: $(e.target).find('[name=tilte]').val(),
        organiser: $(e.target).find('[name=organiser]').val(), 
        location: $(e.target).find('[name=meetup]').val(),
        time: $(e.target).find('[name=time]').val(),
        details: $(e.target).find('[name=details]').val(),
            price: $(e.target).find('[name=price]').val(),
            color:$(e.target).find('[name=color]').val()
            
                              }
            
        post._id = Posts.insert(post);
        Router.go('postPage', post);
  }
     
});