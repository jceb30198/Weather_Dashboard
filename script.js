$(document).ready(function() {
    // DOM Variables
    const searchForm = $('#search-form');
    const searchVal = $('#search-city').val();
    const searchBtn = $('#search-btn');
    const cityList = $('#city-list');
    const currentCity = $('#current-city');
    const temperature = $('#temperature');
    const humidity = $('#humidity');
    const windSpeed = $('#wind-speed');
    const uvIndex = $('#uv-index');
    const forecast5Day = $('#forecast-5-day');

    
    // Form Submit Event
    searchForm.submit(function(e) {
        // AJAX Call with City Submitted
        cityGet(searchVal);

        
        e.preventDefault();
    })
    
    function cityGet(cityName) {
        const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=2054ebe0ce6d092ec2b8b6b1368ceeb0`;
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(res) {
            console.log(res);
        })
    }

});
