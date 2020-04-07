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
      // console.log(res.hints[0]);
      // console.log(res.hints[0].food.label);
      // console.log(res.hints[0].food.image);
  
      var $div = $('<div>');
      var label = $('<h4>').text(res.hints[0].food.label);
      var imgURL = res.hints[0].food.image;
      var img = $('<img>').attr('src', imgURL);
  
      $div.append(img);
      $('#food-display').append(label);
      $('#food-display').append($div);
  
    });
  }

  renderFood();




});




