$(document).ready(function() {
    // DOM Variables
    const searchForm = $('#search-form');
    const searchBtn = $('#search-btn');
    const cityList = $('#city-list');
    const currentCity = $('#current-city');
    const weatherImg = $('#weather-img');
    const temperature = $('#temperature');
    const feelsLike = $('#feels-like');
    const humidity = $('#humidity');
    const windSpeed = $('#wind-speed');
    const forecast5Day = $('#forecast-5-day');
    
    // Form Submit Event
    searchForm.submit(function(e) {
        // AJAX Call with City Submitted
        const searchVal = $('#search-city').val();
        cityGet(searchVal);
        console.log(searchVal);

        // City List and Local Storage
        storeCity(searchVal);

        e.preventDefault();
    })
    
    function cityGet(cityName) {
        // Current Weather
        const currentURL =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=2054ebe0ce6d092ec2b8b6b1368ceeb0`;
        $.ajax({
            url: currentURL,
            method: 'GET'
        }).then(function(res) {
            const currentDate = new Date();
        
            // Switch Case for Weather Image
            switch(res.weather[0].main) {
                case 'Clear': 
                    weatherImg.attr('src', 'http://openweathermap.org/img/wn/01d.png');
                    weatherImg.attr('style', 'height: 60px; width: 60px');
                    weatherImg.addClass('bg-primary');
                    break;
                case 'Rain':
                    weatherImg.attr('src', 'http://openweathermap.org/img/wn/10d.png');
                    weatherImg.attr('style', 'height: 60px; width: 60px');
                    weatherImg.addClass('bg-primary');
                    break;
                case 'Drizzle':
                    weatherImg.attr('src', 'http://openweathermap.org/img/wn/09d.png');
                    weatherImg.attr('style', 'height: 60px; width: 60px');
                    weatherImg.addClass('bg-primary');
                    break;
                case 'Snow':
                    weatherImg.attr('src', 'http://openweathermap.org/img/wn/13d.png');
                    weatherImg.attr('style', 'height: 60px; width: 60px');
                    weatherImg.addClass('bg-primary');
                    break;
                case 'Thunderstorm':
                    weatherImg.attr('src', 'http://openweathermap.org/img/wn/11d.png');
                    weatherImg.attr('style', 'height: 60px; width: 60px');
                    weatherImg.addClass('bg-primary');
                    break;
                case 'Clouds':
                    weatherImg.attr('src', 'http://openweathermap.org/img/wn/02d.png');
                    weatherImg.attr('style', 'height: 60px; width: 60px');
                    weatherImg.addClass('bg-primary');
                    break;
            }

            // Displaying Data
            currentCity.text(`${res.name} (${formatDate(currentDate)})`);
            temperature.text(`Temperature: ${res.main.temp}°F`);
            feelsLike.text(`Feels Like: ${res.main.feels_like}°F`);
            humidity.text(`Humidity: ${res.main.humidity}%`);
            windSpeed.text(`Wind Speed: ${res.wind.speed} mph`)
        })

        // 5 Day Forecast
        const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=2054ebe0ce6d092ec2b8b6b1368ceeb0`;
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(res) {
            const list = res.list;
            for(let i = 0; i < list.length; i += 8) {
                const currentDate = new Date(list[i].dt_txt);
                
                const divEl = $('<div class="card text-white bg-primary mx-auto mb-10 p-2" style="width: 135px; height: 175px;">');
                const divHead = $('<h5>').text(formatDate(currentDate));

                divEl.append(divHead);
                forecast5Day.append(divEl);
                console.log();
            }
        })
    }
    
    // Local Storage and List Array
    function storeCity(cityName) {
        const liEl = $('<li class="list-group-item btn">');
        liEl.text(cityName);
        cityList.prepend(liEl);
    }
});

// Formats the Date Inputted
function formatDate(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    
    return `${month}/${day}/${year}`;
  }