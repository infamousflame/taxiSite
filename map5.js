window.onload = function() {
  var service = new google.maps.DistanceMatrixService();

  service.getDistanceMatrix(
    {
    origins: [{lat: 55.93, lng: -3.118}, 'Greenwich, England'],
    destinations: ['Stockholm, Sweden', {lat: 50.087, lng: 14.421}],
    travelMode: 'DRIVING',
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
