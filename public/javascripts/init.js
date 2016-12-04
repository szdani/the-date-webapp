/**
 * Created by dasz on 06/11/16.
 */
window.onload = function () {
    var mapHtml = document.getElementById('map');
    console.log(mapHtml);
    initMap(mapHtml);
    initSearching(map);

    var btn = document.getElementById("searchPlaces");
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

}