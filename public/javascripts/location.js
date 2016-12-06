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

function averageCoords(loc1,loc2,map){
	
	var geocoder = new google.maps.Geocoder
	
	 var loc = {lat: (loc1.lat()+loc2.lat())/2, lng: (loc1.lng()+loc2.lng())/2};
	 //var loc = {lat: loc1.lat(), lng: loc1.lng()	};
	  geocoder.geocode({'location': loc}, function(results, status) {
		if (status === 'OK') {
		  if (results[1]) {
			//map.setZoom(11);
			/*var marker = new google.maps.Marker({
			  icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
			  position: loc,
			  map: map
			});*/
			//infowindow.setContent(results[1].formatted_address);
			//infowindow.open(map, marker);
		  } else {
			window.alert('No results found');
		  }
		} else {
		  window.alert('Geocoder failed due to: ' + status);
		}
	  });
	
	return loc
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
		pairMarker.setMap(null)
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
        pairMarker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29),
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
			,icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        });
        parentLocation = place.geometry.location;
        pairMarker.setPosition(place.geometry.location);
        pairMarker.setVisible(true);
    })

    autocompleteOwnLoc.addListener('place_changed', function() {
        //infowindow.close();
        ownMarker.setMap(null)
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
        ownMarker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29),
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
			,icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
		});
        ownLocation = place.geometry.location;
        ownMarker.setPosition(place.geometry.location);
        ownMarker.setVisible(true);
	})

}
function findRoute(map, request,directionsDisplay,strokeCol,fillCol,infowindow1) {
	
    /*
	if (directionsDisplay != null) {
        directionsDisplay.setMap(null);
        directionsDisplay = null;
    }
	*/
	var directionsService = new google.maps.DirectionsService();
    //var directionsDisplay = new google.maps.DirectionsRenderer();
	
	
	
    directionsDisplay.setMap(map);
	directionsDisplay.setOptions( { suppressMarkers: true } );

    /*var request = {
        origin: ownLocation,
        destination: parentLocation,
        travelMode: 'TRANSIT'
    }*/
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
			infowindow1.close;
			
			var step=Math.floor(result.routes[0].legs[0].steps.length/2);
			//step=0;
			var p=Math.floor(result.routes[0].legs[0].steps[step].path.length/2);
			
			infowindow1.setContent(result.routes[0].legs[0].distance.text + "<br>" + result.routes[0].legs[0].duration.text)
			infowindow1.setPosition(result.routes[0].legs[0].steps[step].path[p]);
			infowindow1.open(map)
			var iconSequence = {
                    icon: {
                        fillColor: fillCol, //or hexadecimal color such as: '#FF0000'
                        fillOpacity: 0.8,
                        scale: 3,
                        strokeColor: strokeCol,
                        strokeWeight: 1,
                        strokeOpacity: 0.8,
                        path: google.maps.SymbolPath.CIRCLE
                    },
                    repeat: '10px'
                };
                directionsDisplay.setDottedPolylineOptions(iconSequence);
            //console.log(result);
        }
    });
}
