var app = angular.module('weatherApp');

app.controller('wCtrl', function($scope, wApi) {
        // Setting up vars
        $scope.showCurrent = false;
        $scope.showForecast = false;
        $scope.currentWeather = {};
        $scope.forecast = {};
        $scope.forecast.tomorrow = {};
        $scope.forecast.dayAfter = {};
        // Function executed by button
        $scope.getWeather = function() {
            // Call weather service for the current weather
            wApi.getCurrentWeather($scope.wInput).then(function(response){
                $scope.showCurrent = true;
                $scope.currentWeather.temp  = "Temperatur: "+response.main.temp+" °C";
                $scope.currentWeather.wind  = "Wind: "+response.wind.speed+" km/h";
                $scope.currentWeather.press = "Luftdruck: "+response.main.pressure+" hPa";
                $scope.currentWeather.main  = response.weather[0].main;
                
                // Setting the background image based on current weather conditions
                // only 2 conditions defined and one general purpose because i am lazy
                console.log(response.weather[0]);
                console.log($scope.currentWeather.main);
                if($scope.currentWeather.main != "") {
                    $scope.background = "img/rain.jpg";
                }
                if($scope.currentWeather.main == "Clear") {
                    $scope.background = "img/clear.jpg";
                }
                if($scope.currentWeather.main == "Clouds") {
                    $scope.background = "img/cloudy.jpg";
                }
            });
            // Call weather service for the 3 day forecast
            wApi.getForecast($scope.wInput).then(function(response){
                $scope.showForecast = true;
                // Setting ouput for tomorrows forecast
                $scope.forecast.tomorrow.temp  = "Temperatur: "+response.list[1].temp.day+" °C";
                $scope.forecast.tomorrow.wind  = "Wind: "+response.list[1].speed+" km/h";
                $scope.forecast.tomorrow.press = "Luftdruck: "+response.list[1].pressure+" hPa";
                $scope.forecast.tomorrow.id    = response.list[1].weather[0].id;
                $scope.forecast.tomorrow.icon    = response.list[1].weather[0].icon;
                                
                // Setting outlook and flavor text for tomorrow based on
                // https://openweathermap.org/weather-conditions
                if($scope.forecast.tomorrow.id > 200 && $scope.forecast.tomorrow.id < 700) {
                    $scope.forecast.tomorrow.outlook = "Einstufung: Regen";
                    $scope.forecast.tomorrow.flavor = "Nimm lieber einen Regenschirm mit!";
                } else if ($scope.forecast.tomorrow.id > 800 && $scope.forecast.tomorrow.ide < 900) {
                    $scope.forecast.tomorrow.outlook = "Einstufung: Bewölkt";
                    $scope.forecast.tomorrow.flavor = "Nur graue Grütze am Himmel.";
                } else {
                    $scope.forecast.tomorrow.outlook = "Einstufung: Sonnig";
                    $scope.forecast.tomorrow.flavor = "Pack deine Sonnenbrille ein!";
                }
                
                // Setting ouput for day after tomorrows forecast
                $scope.forecast.dayAfter.temp  = "Temperatur: "+response.list[2].temp.day+" °C";
                $scope.forecast.dayAfter.wind  = "Wind: "+response.list[2].speed+" km/h";
                $scope.forecast.dayAfter.press = "Luftdruck: "+response.list[2].pressure+" hPa";
                $scope.forecast.dayAfter.id    = response.list[2].weather[0].id;
                $scope.forecast.dayAfter.icon    = response.list[2].weather[0].icon;
                
                // Setting outlook and flavor text for day after tomorrow                
                if($scope.forecast.dayAfter.id > 200 && $scope.forecast.dayAfter.id < 700) {
                    $scope.forecast.dayAfter.outlook = "Einstufung: Regen";
                    $scope.forecast.dayAfter.flavor = "Nimm lieber einen Regenschirm mit!";
                } else if ($scope.forecast.dayAfter.id > 800 && $scope.forecast.dayAfter.id < 900) {
                    $scope.forecast.dayAfter.outlook = "Einstufung: Bewölkt";
                    $scope.forecast.dayAfter.flavor = "Nur graue Grütze am Himmel.";
                } else {
                    $scope.forecast.dayAfter.outlook = "Einstufung: Sonnig";
                    $scope.forecast.dayAfter.flavor = "Pack deine Sonnenbrille ein!";
                }
            });
        }
    });