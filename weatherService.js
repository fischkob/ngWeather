var app = angular.module('weatherApp');
app.service('wApi', [ '$http', function($http) {
        var token = 'a48e1ddcfc000649245c87ced3c47122';
        
        function getForecast(input) {
            // Define API request for 3 day forecast. Limited to german cities
            if(isNaN(Number(input))) {
            // Check if input is not a number else use the zip code request
                var request = {
                    method: 'GET',
                    url: 'http://api.openweathermap.org/data/2.5/forecast/daily',
                    params: {
                        q: input+',de',                                 // Defines type of API request (cityname)
                        mode: 'json',                                   // Encoding mode
                        units: 'metric',                                // For degree celcius. Imperial for fahrenheit
                        cnt: '3',                                       // How many days
                        appid: token                                    // API key
                    }
                }
            } else {
                // Needs zip code validation. Something like /[0-9]{5}/.test()            
                var request = {
                    method: 'GET',
                    url: 'http://api.openweathermap.org/data/2.5/forecast/daily',
                    params: {
                        zip: input+',de',
                        mode: 'json',
                        units: 'metric',
                        cnt: '3',
                        appid: token
                    }
                }                
            }
            return doRequest(request);
        }
        
        function getCurrentWeather(input) {
            // Define API request for the current weather. Limited to german cities 
            if(isNaN(Number(input))) {
                var request = {
                    method: 'GET',
                    url: 'http://api.openweathermap.org/data/2.5/weather',
                    params: {
                        q: input+',de',
                        mode: 'json',
                        units: 'metric',
                        appid: token
                    }
                }
            } else {
                var request = {
                    method: 'GET',
                    url: 'http://api.openweathermap.org/data/2.5/weather',
                    params: {
                        zip: input+',de',
                        mode: 'json',
                        units: 'metric',
                        appid: token
                    }
                }
            }
            return doRequest(request);  
        }
        // Send the above generated request and return the response
        function doRequest(request) {
            return $http(request)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    return response.data;
                })
        }
        // Make objects accessible
        return {
            getForecast: getForecast,
            getCurrentWeather: getCurrentWeather 
        };
   
    }]);