/**
 * Created by dasz on 06/11/16.
 */

/*
* Get Own location from HTML form
 */
var ownLocation;
var parentLocation;

function getOwnLocation(){

}

function initSearching(map) {
    var inputPairLoc = /** @type {!HTMLInputElement} */(
        document.getElementById("pairLoc"));
    var inputOwnLoc = /** @type {!HTMLInputElement} */(
        document.getElementById("ownLoc"));

    var autocompletePairLoc = new google.maps.places.Autocomplete(inputPairLoc);
    autocompletePairLoc.bindTo('bounds', map);
    var autocompleteOwnLoc = new google.maps.places.Autocomplete(inputOwnLoc);
    autocompleteOwnLoc.bindTo('bounds', map);

    console.log("initSearching");
    autocompletePairLoc.addListener('place_changed', function() {
        //infowindow.close();
        //marker.setVisible(false);
        var place = autocompletePairLoc.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
        // Add marker
        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29),
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        });
        parentLocation = place.geometry.location;
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    })

    autocompleteOwnLoc.addListener('place_changed', function() {
        //infowindow.close();
        //marker.setVisible(false);
        var place = autocompleteOwnLoc.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
        // If the place has a geometry, then present it on a map.
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
        // Add marker
        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29),
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        });
        ownLocation = place.geometry.location;
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    })

}
function findRoute(map) {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    var request = {
        origin: ownLocation,
        destination: parentLocation,
        travelMode: 'TRANSIT'
    }
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
        }
    });
}
