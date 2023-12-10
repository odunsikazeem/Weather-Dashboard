
var listgroupEl = $("#history");
var searchbuttonEl = $("#search-button");
var searchInputEl = $("#search-input");
var tempEl = $(".temp span");
var windEl = $(".wind span");
var humidityEl = $(".humidity span");
var citiesEl = $(".cities");

$("#search-button").on("click", function(event) {
    event.preventDefault();
  
    var city = $(searchInputEl).val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",&appid=31b8eceab3ceb4bbb4396db8c8a750f8";
    // var queryURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=31b8eceab3ceb4bbb4396db8c8a750f8";
    fetch(queryURL)
    .then(function (response) {
      return response.json();
  }).then(function (data) {
      console.log(data);
      // var cities = localStorage.getItem("cities")?
      // JSON.parse(localStorage.getItem("cities")) : [];
      var cities = [];
      if (localStorage.getItem("cities")) {
        cities = JSON.parse(localStorage.getItem("cities"));
      }
      cities.push(city)
      localStorage.setItem("cities", JSON.stringify(cities));

      listgroupEl.prepend("<div>" + city + "</div>");
      $(searchInputEl).val("");
     // Day 1 information 
      var cloud = data.list[0].clouds.all
      var wind = data.list[0].wind.speed
      var temp = data.list[0].main.temp
      var humidity = data.list[0].main.humidity
      var cities = data.city.name
      var day = data.list[0].dt_txt
      console.log(cloud,wind,temp,humidity,cities,day);

      tempEl.text((temp - 273.15).toFixed(2) + " °C");
      windEl.text(wind  + " KPH");
      humidityEl.text(humidity  + " %");
      citiesEl.text(cities);
    
      $("#forecast .row").empty();
      var currentDate = new Date(day);
      console.log(currentDate);
      var index = 0

      for (let i = 0; i < data.list.length; i++) {
        var nextDay = new Date(data.list[i].dt_txt);
        if (currentDate.getDate() === nextDay.getDate()){
          currentDate.setDate(currentDate.getDate() + 1)
          console.log(nextDay.getDate(),data)

      var cloud = data.list[i].clouds.all
      var wind = data.list[i].wind.speed
      var temp = data.list[i].main.temp
      var humidity = data.list[i].main.humidity
      var day = data.list[i].dt_txt

        var colElement = $("<div>");
        var cardElement = $("<div>");
        var cardBodyElement = $("<div>");
        var headerElement = $("<h5>");
        var iconElement = $("i");
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

        headerElement.text(nextDay.getDate() + "/" + nextDay.getMonth() + "/" + nextDay.getFullYear());
        windElement.text("Wind : " + wind);
        tempElement.text( "Temp : " + temp);
        humidityElement.text("Humidity:" + humidity);

        cardBodyElement.append(headerElement,iconElement,windElement,tempElement,humidityElement)
        cardElement.append(cardBodyElement);
        colElement.append(cardElement);
        $("#forecast .row").append(colElement);


        if (index === 4) { break; }
        index++;
        console.log(index)

        
        }
            }
      })
  
  });

    function addTask(text){
      // console.log(listgroupEl);
      listgroupEl.append("<div>");  
    }
    var cities = localStorage.getItem("cities")?JSON.parse(localStorage.getItem("cities")) : [];
        cities.forEach(addTask);
        // console.log(cities);
        $("#history").on("click", function(event) {
          event.preventDefault();});
        

     