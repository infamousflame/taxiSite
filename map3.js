var longA;
var latA;
var longB;
var latB;

window.onload = function() {
  initAutocomplete();
  initAutocomplete2();
};

function initAutocomplete() {
       var map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: -33.8688, lng: 151.2195},
         zoom: 13,
         mapTypeId: 'roadmap'
       });

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
         longA = bounds.b.b;
         latA = bounds.f.f;
       });
     }

     function initAutocomplete2() {
            var map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: -33.8688, lng: 151.2195},
              zoom: 13,
              mapTypeId: 'roadmap'
            });

            // Create the search box and link it to the UI element.
            var input = document.getElementById('pac-input-2');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

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
              longB = bounds.b.b;
              latB = bounds.f.f;
              console.log(DistanceAlgorithm(longA,latA,longB,latB));
            });
          }

          public class DistanceAlgorithm
          {
              const double PIx = 3.141592653589793;
              const double RADIO = 6378.16;

              /// <summary>
              /// This class cannot be instantiated.
              /// </summary>
              private DistanceAlgorithm() { }

              /// <summary>
              /// Convert degrees to Radians
              /// </summary>
              /// <param name="x">Degrees</param>
              /// <returns>The equivalent in radians</returns>
              public static double Radians(double x)
              {
                  return x * PIx / 180;
              }

              /// <summary>
              /// Calculate the distance between two places.
              /// </summary>
              /// <param name="lon1"></param>
              /// <param name="lat1"></param>
              /// <param name="lon2"></param>
              /// <param name="lat2"></param>
              /// <returns></returns>
              public static double DistanceBetweenPlaces(
                  double lon1,
                  double lat1,
                  double lon2,
                  double lat2)
              {
                  double dlon =  Radians(lon2 - lon1);
                  double dlat =  Radians(lat2 - lat1);

                  double a = (Math.Sin(dlat / 2) * Math.Sin(dlat / 2)) + Math.Cos(Radians(lat1)) * Math.Cos(Radians(lat2)) * (Math.Sin(dlon / 2) * Math.Sin(dlon / 2));
                  double angle = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
                  return (angle * RADIO) * 0.62137;//distance in miles
              }

          }
