//year to year move between sets of trips 
//scrollbar of summaries, see which summary -> trip 
//checkbox- later= All, Political, Art,... 


  var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map-container'), {
      center: {lat: 23.397, lng: -82.38},
      zoom: 8
      });


  // Define a symbol using a predefined path (an arrow)
  // supplied by the Google Maps JavaScript API.
  var lineSymbol = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
  };

	map.setZoom(5); 

  //first add all the lines in black 
  var keys = Object.keys(data); 
  console.log(keys); 
  keys.forEach( function(elem){
    data[elem].forEach(function(element){
      var flightPlanCoordinates = [
        {lat: element.start.lat, lng: element.start.lng},
        {lat: element.end.lat, lng: element.end.lng}
      ];
      var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        icons: [{
          icon: lineSymbol,
          offset: '100%'
        }],
        geodesic: true,
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 1 
      });

      flightPath.setMap(map);

    }); 
  }); 


	}
$(function(){

    var addedLines = []; 

    var idToArrow = {}; 

    var id= 0; 



    $( "#slider" ).slider({
      value:1950,
      min: 1950,
      max: 2016,
      step: 5,
      slide: function( event, ui ) {
        //clear the list of travels: 
        $(".list-group").empty(); 
        //clear all trips on map: 
        for(var i =0; i<addedLines.length; i++){
          addedLines[i].setMap(null); 
        } 
        
        $( "#amount" ).val( "Año: " + ui.value );
        for(var j =0; j< 5; j++){
        var year = (ui.value+j).toString(); 
        var obj = data[year]; 
        if(obj !== undefined){
          //add the heading:
          heading = ""; 
          if(year < 1959){
            heading = "Pre-Revolución"; 
          } else if ( year < 1961){
            heading = "La Nueva Sociedad";
          } else if ( year < 1989){
            heading = "El Tiempo Soviético ";
          } else if ( year < 2000){
            heading = "El Periodo Especial";
          } else if ( year < 2008){
            heading = "Nuevas Alacias";
          } else if ( year < 2016){
            heading = "Normalización";
          }



          $("#heading").text(heading); 


          obj.forEach( function(element){
          //add the title and summary 
          $(".list-group").append("<a id="+ "'"+ id.toString() +"'"  + "href='#' class='list-group-item'>" + element.title + "</a>");
          $("#"+id.toString()).append('<p class="list-group-item-heading">'+ element.summary + '</p>');

          //if there's an image, then load it 
          if(element.image !== undefined){
            $("#"+id.toString()).append('<img class="img-responsive"src="'+ element.image + '" alt="" >'); //width="350" height="150"
          } 



          //add the trip to map; 

          var lineSymbol = {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
          };

          var flightPlanCoordinates = [
          {lat: element.start.lat, lng: element.start.lng},
          {lat: element.end.lat, lng: element.end.lng}
          ];
          var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            icons: [{
              icon: lineSymbol,
              offset: '100%'
              }],
              geodesic: true,
              strokeColor: '#0066ff',
              strokeOpacity: 1.0,
              strokeWeight: 3 
              });

              addedLines.push(flightPath); 
              idToArrow[id] = flightPath; 
              flightPath.setMap(map);
              $("#"+id.toString()).hover(function(){ //handlerIn
                flightPath.setOptions({strokeColor:'#FF0000'});
              }, function(){ //handlerOut
                flightPath.setOptions({strokeColor:'#0066ff'});
              }); 
              id = id+1; 
        }); 
        }
      }
      }
    });
    $( "#amount" ).val( "Año: " + $( "#slider" ).slider( "value" ) );
}); 
