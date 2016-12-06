/**
 * Created by dasz on 06/11/16.
 */

 
window.onload = function () {
    var mapHtml = document.getElementById('map');
    console.log(mapHtml);
    initMap(mapHtml);
    initSearching(map);
	
	//SZÍNES ÚTHOZ////////////////
	
	google.maps.DirectionsRenderer.prototype.setDottedPolylineOptions = function (iconSequence) {
     //need a reference to the current 'this' object
    var obj = this;
     //in case this DirectionsRenderer's directions were just set an instant ago,
     //need a slight delay before we may access the b.polylines property of this object
    window.setTimeout(function () {
        var i,
            lines = obj.b.polylines,
            len = lines.length;
        for (i = 0; i < len; i++) {
            if (lines[i].icons) {
                lines[i].setOptions(
                    {
                        icons: [iconSequence]
                    }
                );
            }
        }
    },1);
};
	////////////////////////////////////
	
	pairMarker = new google.maps.Marker({         
        });
	ownMarker = new google.maps.Marker({         
        });
	
	//var directionsDisplay = []
	//own
	directionsDisplay[0]=new google.maps.DirectionsRenderer({
    polylineOptions: {
      strokeColor: "blue"
    }});
	//pair
	directionsDisplay[1]=new google.maps.DirectionsRenderer({
	polylineOptions: {
      strokeColor: "green"
    }});
	
	routeInfowindowOwn = new google.maps.InfoWindow();
	routeInfowindowPair = new google.maps.InfoWindow();

	
    var btn = document.getElementById("searchPlaces");
	var goBtn = document.getElementById("goBtn");
	//var maxDist = parseInt(document.getElementById("maxDist"),10)
	var type

    btn.onclick = function () {
		var targetLoc=averageCoords(ownLocation,parentLocation,map);
		//infowindow = new google.maps.InfoWindow();
		type=document.getElementById("selType").value
        //findRoute(map);
        //getPlaces(targetLoc, 2000, [type], map)
		getPlaces(targetLoc, 2000, [type], map)
		//miért nem működik?
		map.setZoom(15);
		map.setCenter(targetLoc)
    }
	
	goBtn.onclick = function () {
		//var cent = new google.maps.LatLng( lat: -34.397, lng: 150.644);
		//setZoom(maxDist.value*1000,cent);
	}

}