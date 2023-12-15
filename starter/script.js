
var listgroupEl = $("#history");
var searchbuttonEl = $("#search-button");
var searchInputEl = $("#search-input");
var tempEl = $(".temp span");
var windEl = $(".wind span");
var humidityEl = $(".humidity span");
var citiesEl = $(".cities");
var iconEl = $("#icon");
var cityListEl = $(".btn-secondary");


function fetchData(city) {
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",&appid=31b8eceab3ceb4bbb4396db8c8a750f8";
  // var queryURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=31b8eceab3ceb4bbb4396db8c8a750f8";
  fetch(queryURL)
  .then(function (response) {
    return response.json();
   }).then(function (data) {
   
    var cities = [];
    if (localStorage.getItem("cities")) {
      cities = JSON.parse(localStorage.getItem("cities"));
    }
    cities.push(city)
    localStorage.setItem("cities", JSON.stringify(cities));

    var cityList = $('<button type="button" class="btn btn-secondary btn-lg btn-block"></button>');
    
    cityList.attr("citydata", city);
    cityList.text(city)
    listgroupEl.prepend(cityList);

  
    // listgroupEl.prepend("<div>" + city + "</div>");

    $(searchInputEl).val("");
   // Day 1 information 
   var presentDate = dayjs().format("DD/MM/YYYY");
    var cloud = data.list[0].clouds.all
    var wind = data.list[0].wind.speed
    var temp = data.list[0].main.temp
    var humidity = data.list[0].main.humidity
    var cities = data.city.name
    var day = data.list[0].dt_txt
    var icon = data.list[0].weather[0].icon
    var iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png";
    // console.log(cloud,wind,temp,humidity,cities,day,icon,iconUrl,presentDate);

    tempEl.text((temp - 273.15).toFixed(2) + " °C");
    iconEl.attr("src",iconUrl);
    windEl.text(wind  + " KPH");
    humidityEl.text(humidity  + " %");
    citiesEl.text(cities +  " (" + presentDate + ")");
  
    $("#forecast .row").empty();
    var currentDate = new Date(day);
    console.log(currentDate);
    var index = 0

    for (let i = 0; i < data.list.length; i++) {
      var nextDay = new Date(data.list[i].dt_txt);
      if (currentDate.getDate() === nextDay.getDate()){
        currentDate.setDate(currentDate.getDate() + 1)
        console.log(nextDay,nextDay.getUTCMonth(),data)

    var cloud = data.list[i].clouds.all
    var wind = data.list[i].wind.speed
    var temp = data.list[i].main.temp
    var humidity = data.list[i].main.humidity
    var icon = data.list[i].weather[0].icon
    var iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png";
    var day = data.list[i].dt_txt
    // console.log(iconUrl);

      var colElement = $("<div>");
      var cardElement = $("<div>");
      var cardBodyElement = $("<div>");
      var headerElement = $("<h5>");
      var iconElement = $("<img>");
      var windElement = $("<p>");
      var tempElement = $("<p>");
      var humidityElement = $("<p>");
      colElement.addClass("col");
      cardElement.addClass("card");
      cardBodyElement.addClass("card-body");
      headerElement .addClass("card-title");
      iconElement.addClass("fas fa-cloud");
      windElement.addClass("card-text");
      tempElement.addClass("card-text");
      humidityElement.addClass("card-text");

      headerElement.text(nextDay.getDate() + "/" + (nextDay.getMonth()+1) + "/" + nextDay.getFullYear());
      windElement.text("Wind : " + wind + " KPH");
      iconElement.attr("src",iconUrl);
      tempElement.text( "Temp : " + (temp - 273.15).toFixed(2) + " °C");
      humidityElement.text("Humidity:" + humidity + " %");

      cardBodyElement.append(headerElement,iconElement,tempElement,windElement,humidityElement)
      cardElement.append(cardBodyElement);
      colElement.append(cardElement);
      $("#forecast .row").append(colElement);


      if (index === 4) { break; }
      index++;
      // console.log(index)

      
      }
          }
    })
}

$("#search-button").on("click", function(event) {
    event.preventDefault();
     
    var city = $(searchInputEl).val().trim();
    if (!city) {
      return;
    }
    fetchData(city);
  });

  

    function addTask(text){
      // console.log(listgroupEl);
      if (text) {
        listgroupEl.append('<button type="button" class="btn btn-secondary btn-lg btn-block">' + text + '</button>');
        $("#history button:last-child").on("click", function(event) {
          // event.preventDefault();
          var city = $(this).text();
          console.log(city);
          fetchData(city);
        })
      }   
    }
    var cities = localStorage.getItem("cities") ? JSON.parse(localStorage.getItem("cities")) : [];
        cities.forEach(addTask);
        // console.log(cities);
        // $("#history").on("click", function(event) {
        //   event.preventDefault();
        // });


         


     