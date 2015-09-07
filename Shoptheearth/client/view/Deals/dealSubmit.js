Template.DealSubmit.events(
    
    { 
        'submit form': function(e) {
        e.preventDefault();
        var title = event.target.title.value;
        var outlet = event.target.outlet.value;
        var desc  = event.target.desc.value;
        var actual  = event.target.actual.value;
        var offer  = event.target.offer.value;
        var lat  = event.target.lat.value;
        var lng  = event.target.lng.value
        var image = document.getElementById('deal_image').getAttribute('src');
        var userid = Meteor.userId();

        var post = {      
              user_id:userid,
              title:title,
              outlet:outlet,
              description:desc,
              actual_price:actual,
              offer_price:offer,
              latitude:lat,
              longitude:lng,
              image:image
         };

        post._id = Posts.insert(post);
        Router.go('dealPage', post);
  }
     
});