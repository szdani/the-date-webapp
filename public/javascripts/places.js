/**
 * Created by dasz on 06/11/16.
 */
var places;

/*
* Get available places from Google API.
*
* @param{Object} location {longitude: ...; latitude: ...}
* @param{number} radius Max distance from location to search.
* @param{Array of strings} type Types of locals looking for.
*
* @return{Array of Objects} places Result from Google API
* CHAIN METHOD CALLING! Calls the refreshList method - TODO fix
 */
function getPlaces(location, radius, type, map) {
    // TODO
    // refreshList(places);
    var service = new google.maps.places.PlacesService(map);
    var myLatlng = new google.maps.LatLng(location.lat,location.lng);

    var request = {
        key: "AIzaSyB3FUDnVlbWERIbQ92-v6wAkjPmvVLOJBc",
        location: location,
        radius: radius,
        type: type
    }
    service.nearbySearch(request, function(result, status){
        if (status == 'OK'){
            refreshList(result);
            for (var i = 0; i < result.length; i++){
                var place = result[i];
                console.log(JSON.stringify(place));
                /*var marker = new google.maps.Marker({
                    map: map,
                    title: place.name,
                    position: place.geometry.location
                });*/
                // TODO addNewPlace(div, place);
            }
        }else{
            console.log(result);
            console.log(status);
        }

    });
}

/*
*   Refresh the right menu at View
*
*   @param{Array of Objects} Places from Google API
 */
function refreshList(places) {
    var list = document.getElementById('right-menu-ul');
    places.forEach(function (place) {
        var entry =
            "<li class=\"list-group-item my-list-item\""+ place.id + ">"
            + "<!-- Image -->"
            + "<div class=\"col-md-8 col-lg-5\">"
            + "<img style='height: 20px; width: 20px' src='https://maps.googleapis.com/maps/api/place/photo?&photoreference="
            + place.photos[0].photo_reference+"&key=AIzaSyB3FUDnVlbWERIbQ92-v6wAkjPmvVLOJBc'/>"
            + "</div>"
            + "<!-- Information -->"
            + "<div class=\"col-md-4 col-lg-7\">"
            + "<p class=\"text-primary\">" + place.name + "</p>"
            + "<ul class=\"list-inline\">"
            +"<li><p class=\"list-group-item-text\">Pricing</p></li>"
            +"<li><p>"+ place.pricing +"</p></li>"
            +"</ul>"
            +"<ul class=\"list-inline\">"
            +"<li><p class=\"list-group-item-text\">Type</p></li>"
            +"<li><p>"+ place.type +"</p></li>"
            +"</ul>"
            +"</div>"
            +"</li>";
        list.innerHTML += entry;
		createMarker(place)
    });
}
/*
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
*/
