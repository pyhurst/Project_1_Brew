// M.AutoInit();
// var slider = document.getElementById('test-slider');
// noUiSlider.create(slider, {
//     start: [20, 80],
//     connect: true,
//     step: 1,
//     orientation: 'horizontal', // 'horizontal' or 'vertical'
//     range: {
//         'min': 0,
//         'max': 100
//     },
//     format: wNumb({
//         decimals: 0
//     })
// });

// Initialize AOS
AOS.init();

$(document).ready(function () {
  $("select").formSelect();
  var slider = document.getElementById("slider");

  noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
      min: 0,
      max: 100,
    },
  });

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




