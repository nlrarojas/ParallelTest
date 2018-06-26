var latitude = 41.870729;
var longitude = -87.628315;

var radiusMapDistanceValue;

$(document).ready(function (){
    updateSlider(Number($('#distanceRange').val()));
});

//Control del mapa de búsquedas de la página principal. 
function initSearchingMap() {    
    var map = new google.maps.Map(document.getElementById('searchingMap'), {
    center: {lat: latitude, lng: longitude},
    zoom: 8
    });
    infoWindow = new google.maps.InfoWindow({map: map});
    var marker = new google.maps.Marker({
        position: {lat: latitude, lng: longitude},
        map: map,
        title: 'Infraction made here'
    });
    var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: {lat: latitude, lng: longitude}, 
        radius: radiusMapDistanceValue * 1000
    });
    google.maps.event.addListener(map, 'click', function(e) {
        marker.setPosition(e.latLng);                
        cityCircle.setCenter(e.latLng);
        latitude = e.latLng.lat();
        longitude = e.latLng.lng();
    });        
    google.maps.event.addListener(cityCircle, 'click', function(ev) {
        marker.setPosition(ev.latLng);                
        cityCircle.setCenter(ev.latLng);
        latitude = ev.latLng.lat();
        longitude = ev.latLng.lng();
    });
}

//Actualiza el valor del radio cada vez que se mueve el slider de distancia. 
function updateSlider(slideAmount) {
    radiusMapDistanceValue = Number(slideAmount);
    initSearchingMap();
    $('#lblDistance').text("Distance radius: " + slideAmount + " km");    
}

//Esta función busca todas las infracciones cometidas en un punto dentro de un radio dado. 
function executeQuery() {    
    //Obtiene la distancia máxima dentro de la cual puede estar la infracción
    var distance = (radiusMapDistanceValue * 1000) / 2;
    var JSONResult = [];
    
    //Obtiene los datos del API. 
    $.getJSON(URI_API, function(data){
        
    }).done(function (data){
        //Para cada registro valida la distancia dentro del radio. 
        for (var i = 0; i < Object.keys(data).length; i++) {
            var distanceBetweenLocations = getDistance({lat: data[i].latitude, lng: data[i].longitude}, {lat: latitude, lng: longitude});
            if (distanceBetweenLocations < distance) {                
                JSONResult.push(data[i]);                                
            }                                    
        }             
        //Se añaden los nuevos datos a la tabla.            
        table.clear();
        table.rows.add(JSONResult);
        table.draw();
        $('#resultQuantity').text("Number of results: " + JSONResult.length);
        window.scrollTo(0,document.body.scrollHeight);
    }).fail(function (data){

    });
}

//Calculo de la distancia
var rad = function(x) {
    return x * Math.PI / 180;
};
  
//Esta función calcula la distancia entre dos puntos dados. 
var getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter    
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};