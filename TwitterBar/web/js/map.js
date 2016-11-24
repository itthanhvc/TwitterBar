/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function initMap() {
    var _default = {lat: -34.397, lng: 150.644};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: _default
    });
    var marker = new google.maps.Marker({
        position: _default,
        map: map
    });
   // var infoWindow = new google.maps.InfoWindow({map: map});
    map.addListener('click', function(e) {
        placeInfoWindowTrends(e.latLng, map);
    });
    marker.addListener('click', function(e){
        placeInfoWindowTrends(marker.getPosition(), map);
    })
    
         // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
         var pos = {
           lat: position.coords.latitude,
           lng: position.coords.longitude
         };
        
        //infoWindow.setPosition(pos);
        //infoWindow.setContent('Location found.');
        map.setCenter(pos);
        marker.setPosition(pos);
    }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
    });
    } else {
    // Browser doesn't support Geolocation
         handleLocationError(false, infoWindow, map.getCenter());
    }
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                         'Error: The Geolocation service failed.' :
                         'Error: Your browser doesn\'t support geolocation.');
}

function placeInfoWindowTrends(latlng, map){
    alert("hello");
   $.ajax("GetTrendServlet", {
       "type":"POST",
       "dataType": "JSON",
       "data": "{\"woeid\":\"2295414\"}"
   }).done(function(contentString){
       var string = "";
       $.each(contentString, function(i,trend){
           string += "<div><a href=\""+trend.trendLink+"\">"+trend.trendName+"</a></div>";
       });
        var infoWindow = new google.maps.InfoWindow({map: map});
        infoWindow.setContent(string);
        infoWindow.setPosition(latlng);
        //infoWindow.open();
   });
  
}
