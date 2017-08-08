var express 	= require("express");
var app 		= express();
var port 		= process.env.PORT || 8000;
var mongoose 	= require('mongoose');
var morgan 		= require('morgan');
var user 		= require('./app/models/user');
var bodyParser 	= require('body-parser');
var path 		= require('path');
var router 		= express.Router();
var appRoutes 	= require('./app/routes/api')(router);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);

//connect to Mongo DataBase
mongoose.connect('mongodb://KlaviyoAdmin:1234@ds135963.mlab.com:35963/klaviyo', function(err){
  if(err){
    console.log("not connected to Database: " + err);
  }else{  
    console.log("succesfully connected to database");
  }
});

//Single Page application - routing handeld on front end via angularjs
app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


app.listen(port, function(){
	console.log("Runnign Server on port: "+ port);
})