Meteor.startup(function() {  
  GoogleMaps.load();
});


Template.postItem.events({

   
 
        
        'click #but': function() {



        
             var la = Geolocation.latLng();
        	 var distance = nearByLocation.getDistance({
                    latA: la.lat,
                    latB: Posts.findOne({_id:this._id}).lat,
                    lngA:  la.lng,
                    lngB: Posts.findOne({_id:this._id}).lng
                    })  


        	 
         }



});