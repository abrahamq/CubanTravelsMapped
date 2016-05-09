//year to year move between sets of trips 
//scrollbar of summaries, see which summary -> trip 
//checkbox- later= All, Political, Art,... 

  //needs to be global 
//  var data = {
//    "1950": [ {title: "trial00", summary:"summary00", month:"", start:  {lat: 23.113140, lng: -82.377351}, end: {lat: 25.763757, lng: -80.190227}},
//    {title: "trial01", summary:"summary01", month:"", start:  {lat: 23.113140, lng: -82.377351}, end: {lat: 25.763757, lng: -80.190227}}
//], 
//    "1951": [ {title: "trial1", summary:"summary1", month:"", start: {lat: 23.113140, lng: -82.377351}, end: {lat: 25.763757, lng: -80.190227}}], 
//    "1952": [ {title: "trial2", summary:"summary2", month:"", start: {lat: 23.113140, lng: -82.377351}, end: {lat: 25.763757, lng: -80.190227}}], 
//  };  

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

//	var flightPlanCoordinates = [
//	{lat: 23.113140, lng: -82.377351},
//	{lat: 25.763757, lng: -80.190227}
//	];
//	var flightPath = new google.maps.Polyline({
//		path: flightPlanCoordinates,
//    icons: [{
//      icon: lineSymbol,
//      offset: '100%'
//    }],
//		geodesic: true,
//		strokeColor: '#FF0000',
//		strokeOpacity: 1.0,
//		strokeWeight: 2 
//		});
//
//	flightPath.setMap(map);
	map.setZoom(5); 
	}
$(function(){

    var addedLines = []; 


    $( "#slider" ).slider({
      value:1950,
      min: 1950,
      max: 2016,
      step: 1,
      slide: function( event, ui ) {
        //clear the list of travels: 
        $(".list-group").empty(); 
        //clear all trips on map: 
        for(var i =0; i<addedLines.length; i++){
          addedLines[i].setMap(null); 
        } 
        
        $( "#amount" ).val( "Año: " + ui.value );
        var year = (ui.value).toString(); 
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
            heading = "Nuevas Alcancías";
          }
          $("#heading").text(heading); 


          console.log(obj); 
          var id= 0; 
          obj.forEach( function(element){
          //add the title and summary 
          $(".list-group").append("<a id="+ "'"+ id.toString() +"'"  + "href='#' class='list-group-item'>" + element.title + "</a>");
          $("#"+id.toString()).append('<p class="list-group-item-heading">'+ element.summary + '</p>');
          id = id+1; 
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
              strokeColor: '#FF0000',
              strokeOpacity: 1.0,
              strokeWeight: 2 
              });

              addedLines.push(flightPath); 
              flightPath.setMap(map);


            //$("<a href='#' class='list-group-item'>ahhhhh</a>").appendTo("#list-group");  
        }); 
        }
      }
    });
    $( "#amount" ).val( "Año: " + $( "#slider" ).slider( "value" ) );
}); 
