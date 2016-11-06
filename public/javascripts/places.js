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
function getPlaces(location, radius, type) {
    // TODO
    // refreshList(places);
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
    });
}
window.onload = function () {
    var places = [
        {
            id: 0,
            name: "Míves 2.0",
            type: "Kávízó",
            pricing: "$$$"
        }
        ,{
            id: 1,
            name: "Cintányéros",
            type: "Söröző",
            pricing: "$$$$"
        },
        {
            id: 2,
            name: "Olasz Pizza",
            type: "Étterem",
            pricing: "$$"
        },
        {
            id: 3,
            name: "Frei Coffe",
            type: "Kávézó",
            pricing: "$$$$"
        }];
    refreshList(places);

    var mapHtml = document.getElementById('map');
    console.log(mapHtml);
    initMap(mapHtml);
}


