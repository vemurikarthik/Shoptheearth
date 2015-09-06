var MAP_ZOOM = 15;
    Meteor.startup(function() {  
      GoogleMaps.load();
    });

Template.DealSubmit.helpers({  
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
  
Template.DealSubmit.onCreated(function() {  
  var self = this;
  GoogleMaps.ready('address', function(map) {
    var marker;

    // Create and move the marker when latLng changes.
    self.autorun(function() {
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

  Template.DealSubmit.events({
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
     }
});
