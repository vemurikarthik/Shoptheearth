var MAP_ZOOM = 12;
    Meteor.startup(function() {  
      GoogleMaps.load();
    });

Template.locateAll.helpers({  
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
  
Template.locateAll.onCreated(function() {  
  var self = this;
  GoogleMaps.ready('locateAll', function(map) {
    var marker;
    var obj = Posts.find().fetch();
    // Create and move the marker when latLng changes.
    self.autorun(function() {
      var latLng = Geolocation.latLng();
      var id = Router.current().params._id;
      if (! latLng)
        return;
      for(var i=0; i< obj.length ;i++)
      {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(obj[i].latitude,obj[i].longitude),
          map: map.instance
        });
        var infowindow = new google.maps.InfoWindow({
          content: 'Deal: ' + obj[i].title+'<br>Location: '+obj[i].outlet
        });
        infowindow.open(map,marker);
      }
      // The marker already exists, so we'll just change its position.
      // Center and zoom the map view onto the current position.
      map.instance.setCenter(Geolocation.latLng().lat,Geolocation.latLng().lng);
      map.instance.setZoom(MAP_ZOOM);
    });
  });
})