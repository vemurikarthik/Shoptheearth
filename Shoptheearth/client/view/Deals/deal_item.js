Meteor.startup(function() {  
  GoogleMaps.load();
});

Template.dealPage.helpers({
	distance : function(){
		var la = Geolocation.latLng();
        	 var distance = nearByLocation.getDistance({
                    latA: la.lat,
                    latB: Posts.findOne({_id:Router.current().params._id}).latitude,
                    lngA:  la.lng,
                    lngB: Posts.findOne({_id:Router.current().params._id}).longitude
                    })  

        	 return distance.distance;	
	}
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

        	 return distance.distance;	
        	 
         }



});