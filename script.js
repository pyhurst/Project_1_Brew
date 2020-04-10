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

  $(".noUi-handle").on("mouseup", function () {
    var sliderMin = $(".noUi-handle-lower").attr("aria-valuenow");
    var sliderMax = $(".noUi-handle-upper").attr("aria-valuenow");
    var percentOnpage = $("#percent-range");
    percentOnpage.text(sliderMin + "%" + " min and " + sliderMax + "% max.");
  });

  document.addEventListener("mouseup", handle);
  function handle() {
    var sliderMin = $(".noUi-handle-lower").attr("aria-valuenow");
    var sliderMax = $(".noUi-handle-upper").attr("aria-valuenow");
    var percentOnpage = $("#percent-range");
    percentOnpage.text(sliderMin + "%" + " min and " + sliderMax + "% max.");
  }

  // Bitterness checkboxes
  var ibuArr = [];
  $("#light").on("click", function () {
    // event.preventDefault();
    // console.log($(this)[0].checked);
    if ($(this)[0].checked) {
      // console.log('checked');
      ibuArr.push(0, 20);
    } else {
      // console.log('unchecked');
      ibuArr.splice(ibuArr.indexOf(20), 1);
      ibuArr.splice(ibuArr.indexOf(0), 1);
    }
  });
  $("#medium").on("click", function () {
    // event.preventDefault();
    if ($(this)[0].checked) {
      ibuArr.push(21, 40);
    } else {
      ibuArr.splice(ibuArr.indexOf(21), 1);
      ibuArr.splice(ibuArr.indexOf(40), 1);
    }
  });
  $("#strong").on("click", function () {
    // event.preventDefault();
    if ($(this)[0].checked) {
      ibuArr.push(41, 200);
    } else {
      ibuArr.splice(ibuArr.indexOf(41), 1);
      ibuArr.splice(ibuArr.indexOf(200), 1);
    }
  });

  // Dropdown Color Change
  $(".input-field").change(dropdownColor);
  function dropdownColor() {
    // console.log($('#selection').val());
    if ($("#selection").val() == 1) {
      // console.log('pale straw');
      $("#color-display").attr(
        "style",
        "width: 50px; height: 50px; background-color: rgb(252, 234, 111);"
      );
    } else if ($("#selection").val() == 2) {
      // console.log('gold');
      $("#color-display").attr(
        "style",
        "width: 50px; height: 50px; background-color: rgb(232, 163, 2);"
      );
    } else if ($("#selection").val() == 3) {
      // console.log('amber');
      $("#color-display").attr(
        "style",
        "width: 50px; height: 50px; background-color: rgb(191, 80, 0);"
      );
    } else if ($("#selection").val() == 4) {
      // console.log('deep brown');
      $("#color-display").attr(
        "style",
        "width: 50px; height: 50px; background-color: rgb(115, 57, 16);"
      );
    } else {
      // console.log('black');
      $("#color-display").attr(
        "style",
        "width: 50px; height: 50px; background-color: rgb(38, 16, 1);"
      );
    }
  }

  $(".btn").on("click", function (event) {
    event.preventDefault();
    $("#beer-pic").empty();
    $("#food-display").empty();
    $("#dessert-display").empty();
    $("#beer-pic").attr("style", "text-align: end");
    //alcohol slider
    var abv_get = $(".noUi-handle-lower").attr("aria-valuenow"); //lower handle
    var abv_lt = $(".noUi-handle-upper").attr("aria-valuenow"); //upper handle
    abv_get = parseInt(abv_get);
    abv_lt = parseInt(abv_lt);
    // console.log(abv_get);
    // console.log(abv_lt);
    //shades dropdown
    var colorChoice = $(".dropdown-trigger").val();

    console.log(colorChoice);
    if (colorChoice === "Pale Straw") {
      var ebc_gt = $("#color1").attr("data-min");
      var ebc_lt = $("#color1").attr("data-max");
    } else if (colorChoice === "Gold") {
      var ebc_gt = $("#color2").attr("data-min");
      var ebc_lt = $("#color2").attr("data-max");
    } else if (colorChoice === "Amber") {
      var ebc_gt = $("#color3").attr("data-min");
      var ebc_lt = $("#color3").attr("data-max");
    } else if (colorChoice === "Deep Brown") {
      var ebc_gt = $("#color4").attr("data-min");
      var ebc_lt = $("#color4").attr("data-max");
    } else if (colorChoice === "Black") {
      var ebc_gt = $("#color5").attr("data-min");
      var ebc_lt = $("#color5").attr("data-max");
    }

    ebc_gt = parseInt(ebc_gt);
    ebc_lt = parseInt(ebc_lt);
    console.log(ebc_gt);
    console.log(ebc_lt);

    // bitterness checkboxes
    function sortArr(a, b) {
      return a - b;
    }
    ibuArr.sort(sortArr);

    var ibu_gt = ibuArr[0];
    var ibu_lt = ibuArr[ibuArr.length - 1];

    $("#error-text").text("");
    if (colorChoice === "Choose your beer shade") {
      console.log("This is working");
      $("#error-text").text("Please select all fields.");
      console.log(ibu_gt);
      console.log(ibu_lt);
    } else if (ibu_gt === undefined || ibu_lt === undefined) {
      $("#error-text").text("Please select all fields.");
    }

    // BrewDog API
    var queryURL =
      "https://api.punkapi.com/v2/beers/?abv_gt=" +
      abv_get +
      "&abv_lt=" +
      abv_lt +
      "&ebc_gt=" +
      ebc_gt +
      "&ebc_lt=" +
      ebc_lt +
      "&ibu_lt=" +
      ibu_lt +
      "&ibu-gt=" +
      ibu_gt;

    $.ajax({
      url: queryURL,
      method: "GET",
    })
      .then(function (response) {
        // console.log(response);
        // console.log(response.length);

        // Render 5 beers if response array is greater than 5 or else list all
        if (response.length > 5) {
          for (i = 0; i < 5; i++) {
            renderBeer(response);
          }
        } else if (response.length === 0) {
          console.log("sad cheers");
          var sadBeer = $("<img>");
          sadBeer.attr("src", "images/final-sad-beer.jpg");
          sadBeer.attr("alt", "sad-beer-image");
          sadBeer.attr("style", "width: 40%");
          $("#beer-pic").append(sadBeer);
          var responseText = $("<h3>");
          responseText.text("No beers found. Please broaden your search!");
          $("#beer-pic").append(responseText);
        } else {
          for (i = 0; i < response.length; i++) {
            renderBeer(response);
          }
        }
        // renderBeer(response);

        var foodPair = response[0].food_pairing[0];
        var dessertPair = response[0].food_pairing[2];

        return renderFood(foodPair), renderDessert(dessertPair);
      })
      .catch(function (error) {
        console.log("sorry we failed");
        console.log(error.status);
      });
  });

  function renderBeer(response) {
    var beerDiv = $("#beer-pic");
    var $div = $("<div>");
    var beerPic = $("<img>");
    var name = $("<h4>").text("Name: " + response[i].name);
    var tagLine = $("<h6>").text("Tag Line: " + response[i].tagline);
    var abv = $("<h6>").text("Alcohol Content: " + response[i].abv + "%");
    var description = $("<p>").text("Description: " + response[i].description);

    // beerPic.attr("src", response[i].image_url);
    // console.log(typeof(response[i].image_url));
    // beerPic.attr("src", response[i].image_url);
    if (typeof response[i].image_url === "string") {
      beerPic.attr("src", response[i].image_url);
    } else {
      beerPic.attr("src", "./images/brew-logo.png");
    }
    beerPic.attr("alt", "beer");
    beerPic.attr("style", "height: 200px;");
    // beerDiv.attr('style', "display: flex;");
    $div.attr("data-aos", "flip-up");

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
    var appId = "1efc5cb5";
    var appKey = "b93713d669042a8117816b234a336ee5";
    var foodInput = foodPair;
    var queryURL = `https://api.edamam.com/api/food-database/parser?ingr=${foodInput}&app_id=${appId}&app_key=${appKey}`;

    $.ajax({
      url: queryURL,
      method: "GET",
    })
      .then(function (res) {
        console.log(res);
        var $cardDiv = $("<div>");
        var $cardImg = $("<div>");
        var $cardContent = $("<div>").addClass("card-content");
        var label = $("<span>").text(res.hints[0].food.label).addClass("activator"); //add id later
        var imgURL = res.hints[0].food.image;
        var img = $("<img>").attr("src", imgURL);
        var icon = $("<i>").addClass("material-icons right").text("nutrition facts");
        var cardReveal = $("<div>").addClass("card-reveal");
        var revealLabel = $("<span>").addClass("card-title");
        var revealIcon = $("<i>").addClass("material-icons right").text("close");
        var nutritionInfo = $("<p>").text("Nutritional Info:");
        var nutritionCard = $("<div>");

        var calories = res.hints[0].food.nutrients.ENERC_KAL;
        var protein = res.hints[0].food.nutrients.PROCNT;
        var fiber = res.hints[0].food.nutrients.FIBTG;
        var carbs = res.hints[0].food.nutrients.CHOCDF;
        var fats = res.hints[0].food.nutrients.FAT;


        $cardDiv.addClass("card");
        console.log(imgURL);
        if (typeof imgURL === "string") {
          var $cardImg = $("<div>");
          var imgURL = res.hints[0].food.image;
          var img = $("<img>").attr("src", imgURL);
          $cardDiv.append($cardImg);
        } else {
          var $cardImg = $("<div>");
          var googleImg = $("<img>");
          var googleLink = $('<a>');
          var googleDiv = $('<div>');
          googleLink.text(" See Google");
          googleLink.attr('href', 'https://www.google.com');
          googleImg.attr("src", "./images/google-it.jpg");
          googleImg.attr("href", "https://wwww.google.com");

          $cardImg.append(googleImg);
          $cardDiv.append($cardImg);
          googleDiv.append(googleLink);
          $cardContent.append(googleDiv);
        }
        $cardImg.addClass("card-image");
        // Adds AOS animation to the card
        $cardDiv.attr("data-aos", "fade-right");
        $cardDiv.attr("data-aos-offset", "300");
        $cardDiv.attr("data-aos-duration", "2000");
        label.attr("id", "card-name"); 

        img.addClass('activator');

        // Append divs to page
        label.append(icon);
        $cardDiv.append($cardImg);
        $cardDiv.append($cardContent);
        $cardImg.append(img);
        $cardContent.append(label);
        $cardDiv.append(cardReveal);
        cardReveal.append(revealLabel);
        revealLabel.append(revealIcon);
        cardReveal.append(nutritionInfo);
        nutritionInfo.append(nutritionCard);
        nutritionCard.append("calories: " + calories + " KCAL, protein: " + protein + "g, fiber: " + fiber + "g, carbs: " + carbs + "g, " + "fats: " + fats);

        $("#food-display").append($cardDiv);
      })
      .catch(function () {
        console.log("sorry no food for you!");
      });
  }

  // Renders dessert response from BrewDog API to page
  function renderDessert(dessertPair) {
    var appId = "1efc5cb5";
    var appKey = "b93713d669042a8117816b234a336ee5";
    var dessertInput = dessertPair;
    var queryURL = `https://api.edamam.com/api/food-database/parser?ingr=${dessertInput}&app_id=${appId}&app_key=${appKey}`;

    $.ajax({
      url: queryURL,
      method: "GET",
    })
      .then(function (res) {
        var $cardDiv = $("<div>");
        var $cardImg = $("<div>");
        var $cardContent = $("<div>").addClass("card-content");
        var label = $("<span>").text(res.hints[0].food.label).addClass("activator"); //add id later
        var imgURL = res.hints[0].food.image;
        var img = $("<img>").attr("src", imgURL);
        var icon = $("<i>").addClass("material-icons right").text("nutrition facts");
        var cardReveal = $("<div>").addClass("card-reveal");
        var revealLabel = $("<span>").addClass("card-title");
        var revealIcon = $("<i>").addClass("material-icons right").text("close");
        var nutritionInfo = $("<p>").text("Nutritional Info:");
        var nutritionCard = $("<div>");

        var calories = res.hints[0].food.nutrients.ENERC_KAL;
        var protein = res.hints[0].food.nutrients.PROCNT;
        var fiber = res.hints[0].food.nutrients.FIBTG;
        var carbs = res.hints[0].food.nutrients.CHOCDF;
        var fats = res.hints[0].food.nutrients.FAT;


        $cardDiv.addClass("card");
        console.log(imgURL);

        if (typeof imgURL === "string") {
          var $cardImg = $("<div>");
          var imgURL = res.hints[0].food.image;
          var img = $("<img>").attr("src", imgURL);
          $cardDiv.append($cardImg);
        } else {
          var $cardImg = $("<div>");
          var googleImg = $("<img>");
          var googleLink = $('<a>');
          var googleDiv = $('<div>');
          googleLink.text(" See Google");
          googleLink.attr('href', 'https://www.google.com');
          googleImg.attr("src", "./images/google-it.jpg");
          googleImg.attr("href", "https://wwww.google.com");

          $cardImg.append(googleImg);
          $cardDiv.append($cardImg);
          googleDiv.append(googleLink);
          $cardContent.append(googleDiv);
        }

        $cardImg.addClass("card-image");
        // Adds AOS animation to the card
        $cardDiv.attr("data-aos", "fade-right");
        $cardDiv.attr("data-aos-offset", "300");
        $cardDiv.attr("data-aos-duration", "2000");
        label.attr("id", "card-name"); 

        img.addClass('activator');

        // Append divs to page
        label.append(icon);
        $cardDiv.append($cardImg);
        // $cardDiv.append($cardImg);
        $cardDiv.append($cardContent);
        $cardImg.append(img);
        $cardContent.append(label);
        $cardDiv.append(cardReveal);
        cardReveal.append(revealLabel);
        revealLabel.append(revealIcon);
        cardReveal.append(nutritionInfo);
        nutritionInfo.append(nutritionCard);
        nutritionCard.append("calories: " + calories + " KCAL, protein: " + protein + "g, fiber: " + fiber + "g, carbs: " + carbs + "g, " + "fats: " + fats);
        $("#dessert-display").append($cardDiv);
      })
      .catch(function () {
        console.log("Sorry no food for you!");
      });
  }
});
