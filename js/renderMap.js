//Se define el tamaño del mapa
var width = 900;
var height = 600;

//Se ubica y centra el mapa en chicago
var center = [-87.6847, 41.8550], scale = 65000;

//Se añaden las funciones de zoom y desplazamiento
var mapzoom = d3.mapzoom().center(center).scale(scale);

//Elemento donde será mostrado el mapa
document.getElementById("divViolationsMap").style.height = "height";
var svg = d3.select("#divViolationsMap").append("svg").attr("width", width).attr("height", height).call(mapzoom);
var frame = svg.append("g");

//Se añade el mapa de openstreetmap
mapzoom.addTileLayer(frame, "tile.openstreetmap.fr/hot/", "ab");

//Se carga el mapa. 
var projection = mapzoom.projection();

//Variable del sistema
var URI_API = "http://data.cityofchicago.org/resource/3v4z-xnbf.json";
var maxNumberOfViolations = 0;
var circlesInit;

$('document').ready(function () {    
    var JSONResult = [];
    $.getJSON(URI_API, function(data){
        
    }).done(function (data){
        //Se obtienen los datos que tiene atributos de coordenadas del API
        for (var i = 0; i < Object.keys(data).length; i++) {            
            if (!isNaN(data[i].longitude)) {
                data[i].coord = [data[i].longitude, data[i].latitude];
                JSONResult.push(data[i]);
            }
            if (data[i].violations > maxNumberOfViolations) {
                maxNumberOfViolations = data[i].violations;
            }
        }               
        //Se dibujan los circulos según el tamaño de las violaciones del lugar.
        circlesInit = svg.append("g").selectAll("circle").data(JSONResult).enter().append("circle")
            .attr("r", function(d) { return (d.violations / maxNumberOfViolations) * 1.5 * (scale/10000); })
            .attr("stroke","black").attr("fill", "red");
      
        circlesInit.append("title").attr("dx", function(d){return -20}).text(function(d) { return "Number of infractions: " + d.violations});

        mapzoom.addLayer(function() {
            circlesInit.attr("transform", function(d) { return "translate(" + projection(d.coord) + ")" });
        });             
    }).fail(function (data){

    });
    
});

//Este funcion es ejecutada cuando se seleccione el botón de buscar. 
//Devuelve los lugares donde han ocurrido violaciones dentro del rango mínimo y máximo dado. 
function executeQuery() {    
    var slider = document.getElementById('slider');
    var minNumberOfInfractions = Math.round(slider.noUiSlider.get()[0]);
    var maxNumberOfInfractions = Math.round(slider.noUiSlider.get()[1]);
    var JSONResult = [];
    svg.selectAll('circle').remove('circle');

    $.getJSON(URI_API, function(data){
        
    }).done(function (data){
        data.forEach(element => {
            if (!isNaN(element.longitude)) {s
                if (Number(element.violations) > minNumberOfInfractions && Number(element.violations) < maxNumberOfInfractions) {
                    element.coord = [element.longitude, element.latitude];
                    JSONResult.push(element);                
                }            
            }
        });
        console.log(JSONResult.length);
        var circlesInit = svg.append("g").selectAll("circle").data(JSONResult).enter().append("circle")
            .attr("r", function(d) { return (d.violations / maxNumberOfViolations) * 1.5 * (scale/10000); })
            .attr("stroke","black").attr("fill", "red");
    
        circlesInit.append("title").attr("dx", function(d){return -20}).text(function(d) { return "Number of infractions: " + d.violations});

        mapzoom.addLayer(function() {
            circlesInit.attr("transform", function(d) { return "translate(" + projection(d.coord) + ")" });
        }); 
    }).fail(function (data){

    }); 
}