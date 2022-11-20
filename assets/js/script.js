var searchBtn = document.querySelector('.searchBtn');
var cityInput = document.getElementById('cityInput');
var cityName = document.getElementById('searchedCity');
var cityTemp = document.getElementById('temp');
var cityWind = document.getElementById('wind');
var cityHumidity = document.getElementById('humidity');

searchBtn.addEventListener('click', (e) => {fetchCurrentWeather(e)});

function fetchCurrentWeather(e){
    e.preventDefault()
    var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ cityInput.value + '&units=imperial&appid=b2962e6f6214014ba6bd1dfe349385a6'
    var nextFiveDaysUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput.value + '&units=imperial&appid=b2962e6f6214014ba6bd1dfe349385a6'
    fetch(currentWeatherUrl)
        .then( function (response) {
            if (response.ok) {
                return response.json()}})
        .then(function (data) {
                    displayWeatherData(data);
                })
        .catch(function(error) {
            alert('Invalid city name.');
        });
      
    fetch(nextFiveDaysUrl)
        .then( function (response) {
            if (response.ok) {
                return response.json()}})
        .then(function (data) {
                    displayWeatherData(data);
                })
        .catch(function(error) {
            alert('Invalid city name.');
        });
}

function displayWeatherData(data){
    console.log(data);
    var city = data.city.name;
    var date = data.list[0].dt_txt;
    var temp = data.list[0].main.temp;
    var wind = data.list[0].wind.speed;
    var humidity = data.list[0].main.humidity;

    cityName.innerHTML = city + ' ' + date;
    cityTemp.innerHTML = 'Temperature: ' + temp + '°F';
    cityWind.innerHTML = 'Wind: ' + wind + 'mph';
    cityHumidity.innerHTML = 'Humidity: ' + humidity + '%';

}

function storeInput(){
    for (var i = 0; cityInput.length; i++){
        localStorage.setItem('city', cityInput.value);

    }
}
//})
//console.log();
//searchBtn.addEventListener('click', fetchWeather(cityInput.value))
    












//var baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//function to search city formhandler

//fetch city from weather api getCity

//loop to create button after search
// function recentSearch(){
//     for (var i = 0; i < searchedCity.length; i++) {
//         document.createElement(button)
//     }
// }