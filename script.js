$(document).ready(function() {

    //Variables
    var search = $("#search");
    var history = $("#history");
    var cityName = $("#city");
    var nameOfCity = "";
    var temp = $("#temp");
    var humidity = $("#humid");
    var wind = $("#wind");
    var UV = $("#uv");
    var forecast = $(".day-forecast");
    var apiKey = "2054ebe0ce6d092ec2b8b6b1368ceeb0";
    
    // Current Weather queryURL
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + nameOfCity + "&appid=" + apiKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    })

});
