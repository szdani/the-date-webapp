/**
 * Created by dasz on 06/11/16.
 */
window.onload = function () {
    var mapHtml = document.getElementById('map');
    console.log(mapHtml);
    initMap(mapHtml);
    initSearching(map);

    var btn = document.getElementById("searchPlaces");
    btn.onclick = function () {
        var request = {
            origin: ownLocation,
            destination: parentLocation,
            travelMode: 'TRANSIT'}

       // findRoute(map,request);

        getPlaces(ownLocation, 2000, ['cafe','restaurant', 'shopping_mall'], map)
    }
}