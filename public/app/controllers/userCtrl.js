angular.module("userController", ['weatherService'])
.controller('regCtrl',function(weather ,$http, $location, $scope){
	var app = this;
	$scope.cities = [];
	//get top 100 US cities to populate the select feild
	$http.get('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json').then(function(data){
		$scope.cities = data.data;
	});

	//fire function when form submited
	this.regUser = function(regData, valid){
		app.disabled = true;
		var apiData = this.regData;
		app.errorMsg = false;
		app.loading = true;
		if(valid){
			weather.sendTo = this.regData.email;
			weather.state = this.regData.location.split(':')[1];
			weather.city = this.regData.location.split(':')[0];
	
			//'transform state name into abriviation for weather api
			$http.get("https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json").then(function(data){
				for(var x = 0;x < data.data.length; x++){
					if(weather.state == data.data[x].name){
						weather.state = data.data[x].abbreviation;
					}
				}
			}).then(function(){
				//save user to db
			 	$http.post('/api/users', apiData).then(function(data){
			 		//create success message
					if(data.data.success){
						app.loading = false;
						app.successMsg = data.data.message;
						
						//redirect to registered page
						$location.path('/success');
					}else{
						//create an error message
						app.loading = false;
						app.errorMsg = data.data.message;
					}
				});
			})
		}else{
			app.disabled = false;
      		app.loading = false;
      		app.errorMsg = "Please ensure the form is filled out properly";
		}
	}
})