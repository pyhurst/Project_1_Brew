
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

$('.noUi-handle').on("mouseup", function () { 
//   // var slider = $("#slider");
  var sliderMin = $('.noUi-handle-lower').attr('aria-valuenow');
  var sliderMax = $('.noUi-handle-upper').attr('aria-valuenow');
  var percentOnpage = $("#percent-range");
  // console.log(sliderMin);
  // console.log(sliderMax);
  percentOnpage.text(sliderMin + "%" + " min and " + sliderMax + "% max.");
})

// Bitterness checkboxes
var ibuArr = [];
$('#light').on('click', function(){
  // event.preventDefault();
  // console.log($(this)[0].checked);
  if($(this)[0].checked){
    // console.log('checked');
    ibuArr.push(0, 20);
  } else {
    // console.log('unchecked');
    ibuArr.splice(ibuArr.indexOf(20), 1);
    ibuArr.splice(ibuArr.indexOf(0), 1);
  }
});
$('#medium').on('click', function(){
  // event.preventDefault();
  if($(this)[0].checked){
    ibuArr.push(21, 40);
  } else {
    ibuArr.splice(ibuArr.indexOf(21), 1);
    ibuArr.splice(ibuArr.indexOf(40), 1);
  }
});
$('#strong').on('click', function(){
  // event.preventDefault();
  if($(this)[0].checked){
    ibuArr.push(41, 200);
  } else {
    ibuArr.splice(ibuArr.indexOf(41), 1);
    ibuArr.splice(ibuArr.indexOf(200), 1);
  }
});

// Dropdown Color Change
$('.input-field').change(dropdownColor);
function dropdownColor() {
// console.log($('#selection').val());
if($('#selection').val() == 1){
  // console.log('pale straw');
  $('#color-display').attr('style', 'width: 50px; height: 50px; background-color: blue;');
} else if ($('#selection').val() == 2){
  // console.log('gold');
  $('#color-display').attr('style', 'width: 50px; height: 50px; background-color: gold;');
} else if ($('#selection').val() == 3){
  // console.log('amber');
  $('#color-display').attr('style', 'width: 50px; height: 50px; background-color: red;');
} else if ($('#selection').val() == 4){
  // console.log('deep brown');
  $('#color-display').attr('style', 'width: 50px; height: 50px; background-color: brown;');
} else {
  // console.log('black');
  $('#color-display').attr('style', 'width: 50px; height: 50px; background-color: green;');
}
}

$('.btn').on('click', function(event){
  event.preventDefault();
  $('#beer-pic').empty();
  $('#food-display').empty();
  $('#dessert-display').empty();
  //alcohol slider
  var abv_get = $('.noUi-handle-lower').attr('aria-valuenow');//lower handle
  var abv_lt = $('.noUi-handle-upper').attr('aria-valuenow');//upper handle
  abv_get = parseInt(abv_get);
  abv_lt = parseInt(abv_lt);
  // console.log(abv_get);
  // console.log(abv_lt);
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



// bitterness checkboxes
  function sortArr(a,b) {
    return a - b;
  }
  ibuArr.sort(sortArr);

  var ibu_gt = ibuArr[0];
  var ibu_lt = ibuArr[ibuArr.length - 1];

  $('#error-text').text("");
  if (colorChoice === "Choose your beer shade") {
    console.log("This is working");
    $('#error-text').text("Please select all fields.")
    console.log(ibu_gt);
    console.log(ibu_lt);
  } else if (((ibu_gt) === undefined) || ((ibu_lt) === undefined)) {
    $('#error-text').text("Please select all fields.");
  }









  // BrewDog API
  var queryURL = "https://api.punkapi.com/v2/beers/?abv_gt=" + abv_get + "&abv_lt=" + abv_lt + "&ebc_gt=" + ebc_gt + "&ebc_lt=" + ebc_lt + "&ibu_lt=" + ibu_lt + "&ibu-gt=" + ibu_gt; 

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // console.log(response);
    // console.log(response.length);

    // Render 5 beers if response array is greater than 5 or else list all
    if(response.length > 5) {
      for(i = 0; i < 5; i++) {
        renderBeer(response);
      }
    // } else if(response.length === 0) {
    //   console.log("sad cheers");
    //   var sadBeer = $('<img>');
    //   sadBeer.attr('src', '')
    //   sadBeer.attr('alt', 'sad-beer-image');
    //   $('#beer-pic').append(sadBeer);





    // }
    else {
      for(i = 0; i < response.length; i++) {
        renderBeer(response);
      }
    }
    // renderBeer(response);

    var foodPair = response[0].food_pairing[0];
    var dessertPair = response[0].food_pairing[2];

    return renderFood(foodPair), renderDessert(dessertPair);
  }).catch(function(error){

    console.log('sorry we failed');
    console.log(error.status);
  });
});

function renderBeer(response) {
  var beerDiv = $("#beer-pic");
  var $div = $('<div>');
  var beerPic = $("<img>");
  var name = $('<h4>').text("Name: " + response[i].name);
  var tagLine = $('<h6>').text("Tag Line: " + response[i].tagline);
  var abv = $('<h6>').text("Alcohol Content: " + response[i].abv + '%');
  var description = $('<p>').text("Description: " + response[i].description);

  beerPic.attr("src", response[i].image_url);
  beerPic.attr("alt", "beer");
  beerPic.attr("style", "height: 200px;");
  // beerDiv.attr('style', "display: flex;");
  $div.attr('data-aos', 'flip-up');

  beerDiv.append($div);
  $div.append(beerPic);
  $div.append(name);
  name.append(tagLine);
  tagLine.append(abv);
  abv.append(description);
}

//===========================================================================
  // Renders food response from BrewDog API to page
  function renderFood(foodPair) {
    var appId = '1efc5cb5';
    var appKey = 'b93713d669042a8117816b234a336ee5';
    var foodInput = foodPair;
    var queryURL = `https://api.edamam.com/api/food-database/parser?ingr=${foodInput}&app_id=${appId}&app_key=${appKey}`;
  
    $.ajax({
      url: queryURL,
      method: 'GET',
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
    }).catch(function(){
      console.log('sorry no food for you!');
    });
  }

  // Renders dessert response from BrewDog API to page
  function renderDessert(dessertPair) {
    var appId = '1efc5cb5';
    var appKey = 'b93713d669042a8117816b234a336ee5';
    var dessertInput = dessertPair;
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
    }).catch(function(){
      console.log('Sorry no food for you!');
    });
  }
});







