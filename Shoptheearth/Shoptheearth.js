Deals = new Mongo.Collection("Deals");

if (Meteor.isClient) {

  var MAP_ZOOM = 25;
    Meteor.startup(function() {  
      GoogleMaps.load();
    });

  Template.address.helpers({  
    geolocationError: function() {
      var error = Geolocation.error();
      return error && error.message;
  },
    mapOptions: function() {
      var latLng = Geolocation.latLng();
      // Initialize the map once we have the latLng.
      if (GoogleMaps.loaded() && latLng) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: MAP_ZOOM
        };
     }
    }
});  
  
Template.address.onCreated(function() {  
  var self = this;
  GoogleMaps.ready('address', function(map) {
    var marker;

    // Create and move the marker when latLng changes.
    self.autorun(function() {
      console.log();
      var latLng = Geolocation.latLng();
      if (! latLng)
        return;

      // If the marker doesn't yet exist, create it.
      if (! marker) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(latLng.lat, latLng.lng),
          map: map.instance
        });
      }
      // The marker already exists, so we'll just change its position.
      else {        
        marker.setPosition(latLng);
      }

      // Center and zoom the map view onto the current position.
      map.instance.setCenter(marker.getPosition());
      map.instance.setZoom(MAP_ZOOM);
    });
  });
});

  Template.address.events({
     'change #deal_image_upload' : function(){

        if (typeof (FileReader) != "undefined") {

            var deal_image_upload = document.getElementById("deal_image_upload");
            deal_image_upload.innerHTML = "";
 
            var reader = new FileReader();
            reader.onload = function (e) {
              document.getElementById("deal_image").src = e.target.result;
            }
            document.getElementById("deal_image_upload").style.display = 'initial';
            reader.readAsDataURL(document.getElementById('deal_image_upload').files[0]);
        } else {
            alert("This browser does not support FileReader.");
        }
     },
     'submit form':function(event){
        event.preventDefault();
        var title = event.target.title.value;
        var desc  = event.target.desc.value;
        var actual  = event.target.actual.value;
        var offer  = event.target.offer.value;
        var lat  = Geolocation.latLng().lat
        var lng  = Geolocation.latLng().lng;
        var image = document.getElementById('deal_image').getAttribute('src');
        Deals.insert({
          user_id:"1",
          title:title,
          description:desc,
          actual_price:actual,
          offer_price:offer,
          latitude:lat,
          longitude:lng,
          image:image
        });
     },
     'click #deal_image' : function(){
        var obj = Deals.find({"_id":"BcbicMe3aqDfM35Ae"},{fields:{"image":1,"_id":0}});

     }
  });
}

if (Meteor.isServer) {
  
}
