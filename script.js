
$(document).ready(function () {
  $("select").formSelect();
  var slider = document.getElementById("slider");

  noUiSlider.create(slider, {
    start: [5, 25],
    connect: true,
    range: {
      min: 0.5,
      max: 55,
    },
  });
console.log(slider);



$('.btn').on('click', function(event){
  event.preventDefault();


  //alcohol slider
  var abv_get = $('.noUi-handle').attr('aria-valuemin').val();
  // var abv_lt = $('.noUi-handle').attr('aria-valuemax').val();


  //shades dropdown
  var ebc_gt;
  var ebc_lt;


  //bitterness checkboxes
  var ibu_gt;
  var ibu_lt;


 
  var queryURL = "https://api.punkapi.com/v2/beers/?abv_gt="+abv_get; 

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var beerPic = $("<img>");
    beerPic.attr("src", response[0].image_url);
    beerPic.attr("alt", "beer");
    $("#beer-pic").append(beerPic);
    beerPic.attr("style", "height: 200px");

  });

})


});







