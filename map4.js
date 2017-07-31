var map;
var location1;
var location2;

var latlng1;
var latlng2;


window.onload = function() {
  initMap();
  initAutocomplete();
  initAutocomplete2();
}

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:36.824302, lng: -119.859824},
    zoom: 17
  });
}

function initAutocomplete() {
   // Create the search box and link it to the UI element.
   var input = document.getElementById('pac-input');
   var searchBox = new google.maps.places.SearchBox(input);
  //  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

   // Bias the SearchBox results towards current map's viewport.
   map.addListener('bounds_changed', function() {
     searchBox.setBounds(map.getBounds());
   });

   var markers = [];
   // Listen for the event fired when the user selects a prediction and retrieve
   // more details for that place.
   searchBox.addListener('places_changed', function() {
     var places = searchBox.getPlaces();

     if (places.length == 0) {
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
     location1 = bounds;
   });
}
function initAutocomplete2() {
   // Create the search box and link it to the UI element.
   var bounds;
   var input = document.getElementById('pac-input-2');
   var searchBox = new google.maps.places.SearchBox(input);
  //  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

   // Bias the SearchBox results towards current map's viewport.
   map.addListener('bounds_changed', function() {
     searchBox.setBounds(map.getBounds());
   });

   var markers = [];
   // Listen for the event fired when the user selects a prediction and retrieve
   // more details for that place.
   searchBox.addListener('places_changed', function() {
     var places = searchBox.getPlaces();

     // Clear out the old markers.
     markers.forEach(function(marker) {
       marker.setMap(null);
     });
     markers = [];

     // For each place, get the icon, name and location.
    bounds = new google.maps.LatLngBounds();
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
     location2 = bounds;
   });
  }

function calcDist(){
  initAutocomplete();
  initAutocomplete2();
  console.log(location1);
  console.log(location2);
  latlng1 = new google.maps.LatLng(location1.f.b, location1.b.f);
  latlng2 = new google.maps.LatLng(location2.f.b, location2.b.f);
  // console.log(google.maps.geometry.spherical.computeDistanceBetween (latlng2, latlng1)/1000);
  console.log(location1.f.b + " " + location1.b.f);
  console.log(location2.f.b + " " + location2.b.f);
  var service = new google.maps.DistanceMatrixService();

  service.getDistanceMatrix(
    {
    origins: [{lat: location1.f.b, lng: location1.b.f}],
    destinations: [{lat: location2.f.b, lng: location2.b.f}],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    drivingOptions: {
      departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
      trafficModel: 'optimistic'
    }
  }, callback);

  function callback(response, status) {
    // See Parsing the Results for
    // the basics of a callback function.
    console.log("Response: " + response + " Status: " + status)
    console.log(response)
  }
}
