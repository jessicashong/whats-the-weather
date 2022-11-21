var searchBtn = document.querySelector('.searchBtn');
var recentSearch = document.querySelector('.recent-searches');
var fiveDayCards = document.querySelector('.five-day');
var cityInput = document.getElementById('cityInput');
var cityName = document.getElementById('searchedCity');
var cityIcon = document.getElementById('weatherIcon');
var cityTemp = document.getElementById('temp');
var cityWind = document.getElementById('wind');
var cityHumidity = document.getElementById('humidity');

var searchedCities = [];

var apiKey = '611e842f65edc9f927a5742c2690e577';
var currentWeatherUrlBase = 'https://api.openweathermap.org/data/2.5/weather?q=';
var nextFiveDaysUrlBase = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var parameters = '&units=imperial&appid=';
//fetch data for current weather
searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    fetchCurrentWeather();
    fetchNextFiveDays();
    if (!searchedCities.includes(cityInput.value)){
        storeInputs();
        renderRecentSearches();
    }
    cityInput.value = '';
}); 

function fetchCurrentWeather(){
    fetch(currentWeatherUrlBase + cityInput.value + parameters + apiKey)
    .then( function (response) {
        if (response.ok) {
            return response.json()
        }})
    .then(function (data) {
        displayCurrentWeatherData(data);
    })
    .catch(function(error) {
        console.error(error);
        alert('current weather alert');
    });
};
        
//display fetched data for current weather 
function displayCurrentWeatherData(data){
    var currentDate = moment();
    var icon = data.weather[0].icon;
    var city = data.name;
    var temp = data.main.temp;
    var wind = data.wind.speed;
    var humidity = data.main.humidity;

    cityName.innerHTML = city + ' (' + currentDate.format('L') + ') '; 
    cityIcon.setAttribute('src', 'http://openweathermap.org/img/w/' + icon + '.png');
    cityTemp.innerHTML = 'Temperature: ' + temp + '°F';
    cityWind.innerHTML = 'Wind: ' + wind + ' mph';
    cityHumidity.innerHTML = 'Humidity: ' + humidity + '%';
}

//fetch next 5-day forecast
function fetchNextFiveDays(){
    fetch(nextFiveDaysUrlBase + cityInput.value + parameters + apiKey)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        displayFiveDayForecast(data);
    })
    .catch(function(error) {
        console.error(error);
        alert('five day forecast alert');
    });
}

//display fethced data for 5-day forecast
function displayFiveDayForecast(data){
    var parent = document.querySelector('.five-day');
    if (parent !== null){
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    for(var i = 0; i < data.list.length; i++){
        var dateText = data.list[i].dt_txt.split(' ')[1];
        if (dateText === '06:00:00'){
            //create div+ul for forecast cards
            var weatherCard = document.createElement('div');
            weatherCard.setAttribute('class', 'card col m-1 parent');
            var ul = document.createElement('ul');
            //date
            var weatherCardDate = document.createElement('h4');
            weatherCardDate.innerHTML = moment(data.list[i].dt_txt.split(' ')[0]).format('l');
            //forecast icon
            var icon = document.createElement('img');
            icon.setAttribute('src', 'http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png');
            //temp, wind speed, humidity
            var temp = document.createElement('li');
            temp.innerHTML = 'Temp: ' + data.list[i].main.temp + '°F';
            var windSpeed = document.createElement('li');
            windSpeed.innerHTML = 'Wind: ' + data.list[i].wind.speed + ' mph';
            var humidity = document.createElement('li');
            humidity.innerHTML = 'Humidity: ' + data.list[i].main.humidity + '%';
        
            //append all to div
            fiveDayCards.append(weatherCard);
            weatherCard.append(ul);
            ul.append(weatherCardDate);
            ul.append(icon);
            ul.append(temp);
            ul.append(windSpeed);
            ul.append(humidity);
            }
        }
    }

//store recently searched cities in local storage + create button elements
function storeInputs(){
    searchedCities.push(cityInput.value)
    localStorage.setItem('city', JSON.stringify(searchedCities));
}

function renderRecentSearches(){
    var btn = document.createElement('button');
    var recent = searchedCities[searchedCities.length -1];
    btn.textContent = recent;
    btn.setAttribute('data-index', searchedCities.length);
    btn.setAttribute('class', 'recent-btn');
    recentSearch.appendChild(btn);
    
    btn.addEventListener('click', function(e){
        e.preventDefault();
        cityInput.value = recent;
        
        fetchCurrentWeather();
        fetchNextFiveDays();

        cityInput.value = '';
    })
}