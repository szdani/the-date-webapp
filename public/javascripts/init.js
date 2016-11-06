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
        findRoute(map);
        getPlaces(ownLocation, 2000, ['cafe','restaurant', 'shopping_mall'], map)
    }

}