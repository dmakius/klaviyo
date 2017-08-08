angular.module('weatherService', [])
.service("weather", function(){
	this.sendTo    = "";
  	this.city      = "";
	this.state     = "";
	this.avgHot    = "";
	this.avgCold   = "";
	this.temp      = "";
	this.condition = ""; 
	this.icon	   = "";

});
