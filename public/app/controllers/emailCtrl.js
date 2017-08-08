angular.module("emailController", ['weatherService'])
.controller('emailCtrl',function(weather, $http, $location, $scope){
	var app = this;
	this.loading = true;
	this.errorMsg = false;
	this.successMsg = false;

	//get historical  weather data
	$http.get('http://api.wunderground.com/api/66868394bed36287/almanac/q/'+ weather.state+"/"+
	weather.city +'.json').then(function(data){
		weather.avgHot = data.data.almanac.temp_high.normal.F;
		weather.avgCold = data.data.almanac.temp_low.normal.F;
	
	//get current weather data
	$http.get('http://api.wunderground.com/api/66868394bed36287/conditions/q/'+ weather.state +"/"
		+ weather.city +'.json').then(function(data){
	 		weather.condition = data.data.current_observation.weather;
			weather.temp = data.data.current_observation.temp_f;
			weather.icon = data.data.current_observation.icon;
			
			//send email from server using data from weather service
			$http.post('/api/sendEmail', weather).then(function(data){
	 			console.log("emails sent!");
	 			console.log(weather);
	 			app.loading = false;
	 			if(data.data.success){
	 				app.successMsg = data.data.message;
	 			}else{
					app.errorMsg = data.data.message;
	 			}
			});//END - send email from server
	});//END - get Current Weather
	});//END - get Historical Weather
});