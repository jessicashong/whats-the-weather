var searchBtn = document.querySelector('.searchBtn');
var cityInput = document.getElementById('cityInput');
var cityName = document.getElementById('searchedCity');
//var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput.value + '&appid=b2962e6f6214014ba6bd1dfe349385a6'

function fetchWeather (city) {
    //var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city +'&appid=b2962e6f6214014ba6bd1dfe349385a6'
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city +'&appid=b2962e6f6214014ba6bd1dfe349385a6')
    .then( function (response) {
        if (response.ok) {
            console.log(response)
            return response.json()
            .then(function (data) {
                console.log(data);
            })
        } else {
            alert('Error: ' + response.statusText);
        }
    })   
    .catch(function(error) {
        alert('Invalid city name.')
    });
}
//})
//console.log();
//searchBtn.addEventListener('click', fetchWeather(cityInput.value))
    












//var baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//var apiKey = '&appid=b2962e6f6214014ba6bd1dfe349385a6'
//function to search city formhandler

//fetch city from weather api getCity

//loop to create button after search
// function recentSearch(){
//     for (var i = 0; i < searchedCity.length; i++) {
//         document.createElement(button)
//     }
// }