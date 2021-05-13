$(document).ready(function () {
    // DOM Variables
    const searchForm = $('#search-form');
    const cityList = $('#city-list');
    const currentCity = $('#current-city');
    const temperature = $('#temperature');
    const feelsLike = $('#feels-like');
    const humidity = $('#humidity');
    const windSpeed = $('#wind-speed');
    const forecast5Day = $('#forecast-5-day');

    loadPage();

    // Form Submit Event
    searchForm.submit(function(e) {
        // AJAX Call with City Submitted and added to the list
        const liEl = $('<li class="list-group-item btn">');
        const searchVal = $('#search-city').val();

        // List Append
        liEl.text(searchVal);
        cityList.prepend(liEl);
        
        // Display Function
        cityGet(searchVal);
        console.log(searchVal);

        // City List and Local Storage
        storeCity(searchVal);

        e.preventDefault();
    })

    // List Item Click Event
    cityList.click(function(e) {
        cityGet(e.target.textContent);
        console.log(e.target.textContent);
        e.preventDefault();
    })

    function cityGet(cityName) {
        // Current Weather
        const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=2054ebe0ce6d092ec2b8b6b1368ceeb0`;
        $.ajax({
            url: currentURL,
            method: 'GET'
        }).then(function (res) {
            const currentDate = new Date();
            const weatherImg = $('#weather-img');

            // Switch Case for Weather Image
            switch (res.weather[0].main) {
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
        const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=2054ebe0ce6d092ec2b8b6b1368ceeb0`;
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (res) {
            const list = res.list;
            // Clears the forecast display
            forecast5Day.empty();

            for (let i = 0; i < list.length; i += 8) {
                const currentDate = new Date(list[i].dt_txt);

                // Elements for DIV Forecasts
                const divEl = $('<div class="card text-white bg-primary mx-auto mb-10 p-2" style="width: 135px; height: 175px;">');
                const divHead = $('<h5>').text(formatDate(currentDate));
                const divImg = $('<img>');
                const divTemp = $('<div>').text(`Temp: ${list[i].main.temp}°F`);
                const divHumidity = $('<div>').text(`Humidity: ${list[i].main.humidity}%`);

                // Images for DIV
                switch (list[i].weather[0].main) {
                    case 'Clear':
                        divImg.attr('src', 'http://openweathermap.org/img/wn/01d.png');
                        divImg.attr('style', 'height: 60px; width: 60px');
                        break;
                    case 'Rain':
                        divImg.attr('src', 'http://openweathermap.org/img/wn/10d.png');
                        divImg.attr('style', 'height: 60px; width: 60px');
                        break;
                    case 'Drizzle':
                        divImg.attr('src', 'http://openweathermap.org/img/wn/09d.png');
                        divImg.attr('style', 'height: 60px; width: 60px');
                        break;
                    case 'Snow':
                        divImg.attr('src', 'http://openweathermap.org/img/wn/13d.png');
                        divImg.attr('style', 'height: 60px; width: 60px');
                        break;
                    case 'Thunderstorm':
                        divImg.attr('src', 'http://openweathermap.org/img/wn/11d.png');
                        divImg.attr('style', 'height: 60px; width: 60px');
                        break;
                    case 'Clouds':
                        divImg.attr('src', 'http://openweathermap.org/img/wn/02d.png');
                        divImg.attr('style', 'height: 60px; width: 60px');
                        break;
                }

                // Appending the items to the div and then appending the div to the 5Day forecast ID
                divEl.append(divHead);
                divEl.append(divImg);
                divEl.append(divTemp);
                divEl.append(divHumidity);
                forecast5Day.append(divEl);
            }
        })
    }
    
    // Formats the Date Inputted
    function formatDate(date) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
    
        return `${month}/${day}/${year}`;
    };

    // Local Storage and List Array
    function storeCity(cityName) {
        let cityStore;

        // Check if Array exists
        if(localStorage.getItem('cities') === null) {
            cityStore = [];
        } else{
            cityStore = JSON.parse(localStorage.getItem('cities', cityStore));
        }

        // Push city data
        cityStore.push(cityName);

        // Push to localstorage
        localStorage.setItem('cities', JSON.stringify(cityStore));
    }

    // Loads page with all the previously searched cities
    function loadPage() {
        let cityStore;
        if(localStorage.getItem('cities') === null) {
            cityStore = [];
        }
        else {
            cityStore = JSON.parse(localStorage.getItem('cities'));
        }

        cityStore.forEach(function(cityName) {
            const liEl = $('<li class="list-group-item btn">');
            // List Append
            liEl.text(cityName);
            cityList.prepend(liEl);
        });
    }
});

