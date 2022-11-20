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

var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ cityInput.value + '&units=imperial&appid=b2962e6f6214014ba6bd1dfe349385a6'
var nextFiveDaysUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput.value + '&units=imperial&appid=b2962e6f6214014ba6bd1dfe349385a6'

//fetch data for current weather
searchBtn.addEventListener('click', function(e) {
    fetchCurrentWeather(e);
    e.preventDefault();
}); 

function fetchCurrentWeather(e){

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ cityInput.value + '&units=imperial&appid=b2962e6f6214014ba6bd1dfe349385a6')
    .then( function (response) {
        if (response.ok) {
            return response.json()
        }})
    .then(function (data) {
        displayCurrentWeatherData(data);
    })
    .catch(function(error) {
        alert('current weather alert');
    });
    
    fetchNextFiveDays(e);
    storeInputs();
};
        

//display fetched data for current weather 
function displayCurrentWeatherData(data){
    console.log(data);
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
function fetchNextFiveDays(e){
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput.value + '&units=imperial&appid=b2962e6f6214014ba6bd1dfe349385a6')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        displayFiveDayForecast(data);
    })
    .catch(function(error) {
        console.log(error)
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
    console.log(data);
    console.log(data.list);

    for(var i = 0; i < data.list.length; i++){
        var dateText = data.list[i].dt_txt.split(' ')[1];
        if (dateText === '06:00:00'){
            //create div+ul for forecast cards
            var weatherCard = document.createElement('div');
            weatherCard.setAttribute('class', 'card col m-1 parent');
            var ul = document.createElement('ul');
            //date
            var weatherCardDate = document.createElement('h4');
            weatherCardDate.innerHTML = data.list[i].dt_txt.split(' ')[0];
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
            // console.log(dateText);
        }
    }


//store recently searched cities in local storage + create button elements
function init(){
    var storedCities = JSON.parse(localStorage.getItem('searchedCities'));
    if (storedCities !== null){
        searchedCities = storedCities;
    }
}

function storeInputs(){
    searchedCities.push(cityInput.value)
    localStorage.setItem('city', JSON.stringify(searchedCities));

    renderRecentSearches();
}

init();

function renderRecentSearches(){
    for(var i = 0; i < searchedCities.length; i++){
        var recent = searchedCities[i];
        var btn = document.createElement('button');
        btn.textContent = recent;
        btn.setAttribute('class', 'btn');
        recentSearch.appendChild(btn);
        
        btn.addEventListener('click', fetchCurrentWeather(btn.value));



    }
}


    // if (currentTime < '6') {
    //     //0-6 use index 0
    // } else if (currentTime < '9'){
    //     //7-9 use index 1
    // } else if (currentTime < '12'){
    //     //10-12 use index 2
    // } else if (currentTime < '15'){
    //     //13-15 use index 3
    // } else if (currentTime < '18'){
    //     //16-18 use index 4
    // } else {
    //     //19-21 use index 5
    // }


//loop to create button after search
// function recentSearch(){
//     for (var i = 0; i < searchedCity.length; i++) {
//         document.createElement(button)
//     }
// }