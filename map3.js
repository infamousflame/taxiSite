var longA;
var latA;
var longB;
var latB;
var searchBox;
var searchBox2;

var input = document.getElementById('pac-input');
var input2 = document.getElementById('pac-input-2');

var map;

window.onload = function() {
  initMap();
  searchBox = new google.maps.places.SearchBox(input);
  searchBox2 = new google.maps.places.SearchBox(input2);
}

function initMap(){
   map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:36.824302, lng: -119.859824},
    zoom: 13,
    mapTypeId: 'roadmap'
  });
}
function initAutocomplete() {
       // Create the search box and link it to the UI element.
       searchBox = new google.maps.places.SearchBox(input);
       searchBox2 = new google.maps.places.SearchBox(input2);
      //  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

       // Bias the SearchBox results towards current map's viewport.
       map.addListener('bounds_changed', function() {
         searchBox.setBounds(map.getBounds());
         searchBox2.setBounds(map.getBounds());
       });

       var markers = [];
       // Listen for the event fired when the user selects a prediction and retrieve
       // more details for that place.
       searchBox.addListener('places_changed', function() {
         var places = searchBox.getPlaces();
         var places2 = searchBox2.getPlaces();

         if (places.length == 0) {
           return;
         }

         if(places2.length == 0){
           return;
         }

         // Clear out the old markers.
         markers.forEach(function(marker) {
           marker.setMap(null);
         });
         markers = [];

         // For each place, get the icon, name and location.
         var bounds = new google.maps.LatLngBounds();
         places.forEach(function(place) {
           if (!place.geometry) {
             console.log("Returned place contains no geometry");
             return;
           }
           var icon = {
             url: place.icon,
             size: new google.maps.Size(71, 71),
             origin: new google.maps.Point(0, 0),
             anchor: new google.maps.Point(17, 34),
             scaledSize: new google.maps.Size(25, 25)
           };

           // Create a marker for each place.
           markers.push(new google.maps.Marker({
             map: map,
             icon: icon,
             title: place.name,
             position: place.geometry.location
           }));

           if (place.geometry.viewport) {
             // Only geocodes have viewport.
             bounds.union(place.geometry.viewport);
           } else {
             bounds.extend(place.geometry.location);
           }
         });

         var bounds2 = new google.maps.LatLngBounds();
         places2.forEach(function(place) {
           if (!place.geometry) {
             console.log("Returned place contains no geometry");
             return;
           }
           var icon = {
             url: place.icon,
             size: new google.maps.Size(71, 71),
             origin: new google.maps.Point(0, 0),
             anchor: new google.maps.Point(17, 34),
             scaledSize: new google.maps.Size(25, 25)
           };

           // Create a marker for each place.
           markers.push(new google.maps.Marker({
             map: map,
             icon: icon,
             title: place.name,
             position: place.geometry.location
           }));

           if (place.geometry.viewport) {
             // Only geocodes have viewport.
             bounds2.union(place.geometry.viewport);
           } else {
             bounds2.extend(place.geometry.location);
           }
         });


         //  console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(bounds.b.b, bounds.f.f), new google.maps.LatLng(bounds2.b.b, bounds2.f.f)));
       });

      if(bounds != undefined && bounds2 != undefined){
        
      }
    }
function getDistance(){
  console.log("hello");
}
