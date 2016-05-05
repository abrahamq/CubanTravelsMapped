$(

//  var data = { 1950: "test",
//    1951: "test1"
// }; 



  function() {
    $( "#slider" ).slider({
      value:1950,
      min: 1950,
      max: 2016,
      step: 1,
      slide: function( event, ui ) {
        $( "#amount" ).val( "Year: " + ui.value );
      }
     });
    $( "#amount" ).val( "Year: " + $( "#slider" ).slider( "value" ) );
  };
);
