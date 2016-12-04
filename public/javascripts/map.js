/**
 * Created by Daniel Attila Szabo on 06/11/16.
 */
var map;
var infowindow
/*
* Initializes the Google Map at the webpage.
*
* @param{Object} mapHTML The div element, what will contain the map.
 */
function initMap(mapHtml) {
    console.log("Google Map initializing..");
    map = new google.maps.Map(mapHtml, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
	infowindow = new google.maps.InfoWindow();
}

/*
 * Add a Marker to the map at a specific location.
 *
 * @param{Object} position {longitude: ...; latitude: ...}
 * @param{Object} map
 */
function addMarker(position) {
    var myLatLng = {lat: position.longitude, lng: position.latitude};

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map
    });

}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
		map: map,
		position: place.geometry.location
	  
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}


