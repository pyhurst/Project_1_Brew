
// Initialize AOS
AOS.init();

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
var abv_get = $('.noUi-handle-lower').attr('aria-valuenow');//lower handle
var abv_lt = $('.noUi-handle-upper').attr('aria-valuenow');//upper handle
console.log(abv_get);
console.log(abv_lt);
  //shades dropdown
var colorChoice = $('.dropdown-trigger').val();

  console.log(colorChoice);
if(colorChoice === "Pale Straw") {
  var ebc_gt = $('#color1').attr("data-min");
  var ebc_lt = $('#color1').attr("data-max");
} else if(colorChoice === "Gold") {
  var ebc_gt = $('#color2').attr("data-min");
  var ebc_lt = $('#color2').attr("data-max");
} else if(colorChoice === "Amber") {
  var ebc_gt = $('#color3').attr("data-min");
  var ebc_lt = $('#color3').attr("data-max");
} else if (colorChoice === "Deep Brown") {
  var ebc_gt = $('#color4').attr("data-min");
  var ebc_lt = $('#color4').attr("data-max");
} else if (colorChoice === "Black") {
  var ebc_gt = $('#color5').attr("data-min");
  var ebc_lt = $('#color5').attr("data-max");
}

ebc_gt = parseInt(ebc_gt);
ebc_lt = parseInt(ebc_lt);
console.log(ebc_gt);
console.log(ebc_lt);



//bitterness checkboxes
var ibu_gt;
var ibu_lt;

  +"&ebc_gt=" + ebc_gt + "&ebc_lt=" + ebc_lt
 
  var queryURL = "https://api.punkapi.com/v2/beers/?abv_gt=" + abv_get + "&abv_lt=" + abv_lt + "&ebc_gt=" + ebc_gt + "&ebc_lt=" + ebc_lt; 
  // +"&ebc_gt=" + ebc_gt
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
});














//===========================================================================
  // Renders food response from BrewDog API to page
  function renderFood() {
    var appId = '1efc5cb5';
    var appKey = 'b93713d669042a8117816b234a336ee5';
    var foodInput = 'pizza';
    var queryURL = `https://api.edamam.com/api/food-database/parser?ingr=${foodInput}&app_id=${appId}&app_key=${appKey}`;
  
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(res){
      // console.log(res);
      var $cardDiv = $('<div>');
      var $cardImg = $('<div>');
      var $cardContent = $('<div>');
      var label = $('<h4>').text(res.hints[0].food.label);
      var imgURL = res.hints[0].food.image;
      var img = $('<img>').attr('src', imgURL);

      $cardDiv.addClass('card');
      $cardImg.addClass('card-image');
      // Adds AOS animation to the card
      $cardDiv.attr('data-aos', 'fade-right');
      $cardDiv.attr('data-aos-offset', '300');
      $cardDiv.attr('data-aos-duration', '2000');
      // img.addClass('activator');
  
      // Append divs to page
      $cardDiv.append($cardImg);
      $cardDiv.append($cardContent);
      $cardImg.append(img);
      $cardContent.append(label);
      $('#food-display').append($cardDiv);
    });
  }

  renderFood();

  // Renders dessert response from BrewDog API to page
  function renderDessert() {
    var appId = '1efc5cb5';
    var appKey = 'b93713d669042a8117816b234a336ee5';
    var dessertInput = 'ice cream';
    var queryURL = `https://api.edamam.com/api/food-database/parser?ingr=${dessertInput}&app_id=${appId}&app_key=${appKey}`;
  
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(res){
      var $cardDiv = $('<div>');
      var $cardImg = $('<div>');
      var $cardContent = $('<div>');
      var label = $('<h4>').text(res.hints[0].food.label);
      var imgURL = res.hints[0].food.image;
      var img = $('<img>').attr('src', imgURL);

      $cardDiv.addClass('card');
      $cardImg.addClass('card-image');
      // Adds AOS animation to the card
      $cardDiv.attr('data-aos', 'fade-left');
      $cardDiv.attr('data-aos-offset', '300');
      $cardDiv.attr('data-aos-duration', '2000');
      // img.addClass('activator');
  
      // Append divs to page
      $cardDiv.append($cardImg);
      $cardDiv.append($cardContent);
      $cardImg.append(img);
      $cardContent.append(label);
      $('#dessert-display').append($cardDiv);
    });
  }

  renderDessert();

});







