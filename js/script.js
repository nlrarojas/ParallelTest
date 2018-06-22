var URI_API = "http://data.cityofchicago.org/resource/3v4z-xnbf.json";

$(document).ready(function() {   
    $('#table_id').DataTable({
        "ajax": {
            "url": URI_API,
            "dataSrc": ""
        },
        "aoColumns": [
            { "mData": ":@computed_region_43wa_7qmu",
              "defaultContent": "<i>Not set</i>" },
            { "mData": ":@computed_region_6mkv_f3dw",
              "defaultContent": "<i>Not set</i>" },
            { "mData": ":@computed_region_awaf_s7ux",
              "defaultContent": "<i>Not set</i>" },
            { "mData": ":@computed_region_bdys_3d7i",
              "defaultContent": "<i>Not set</i>" },
            { "mData": ":@computed_region_vrxf_vc4k",
              "defaultContent": "<i>Not set</i>" },
            { "mData": "address",
              "defaultContent": "<i>Not set</i>" },
            { "mData": "camera_id",
              "defaultContent": "<i>Not set</i>" },
            { "mData": "latitude",
              "defaultContent": "<i>Not set</i>" },            
            { "mData": "longitude",
              "defaultContent": "<i>Not set</i>" },
              { "mData": "location.coordinates",
              "render": function(data, type, full, meta){                   
                if (data){
                  let [lng, lat] = data                  
                  return "<a id=mapLink onclick=openMap("+lng+ ',' + lat+"); data-toggle=modal data-target=#exampleModalCenter>See on map</a>";
                } else {
                  return "<i>Not set</i>";
                } 
              }, 
              "defaultContent": "<i>Not set</i>" },
            { "mData": "violation_date",
              "render": function(data, type, full, meta){
                return data.split("T")[0];
              },
              "defaultContent": "<i>Not set</i>"},
            { "mData": "violations",
              "defaultContent": "<i>Not set</i>" },
            { "mData": "x_coordinate",
              "defaultContent": "<i>Not set</i>" },
            { "mData": "y_coordinate",
              "defaultContent": "<i>Not set</i>" }
        ],
        "initComplete": function( settings, json ) {
          $('#idNav').width($( document ).width());          
        }
    });    
});
 
function openMap(longitude, latitude) {
  if (latitude && longitude) {    
    
  }
}