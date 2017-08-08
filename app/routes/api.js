var User = require('../models/user');
var nodemailer = require('nodemailer');

module.exports = function(router){
	router.post('/users', function(req, res){
		var user = new User();
		user.email = req.body.email;
		user.location = req.body.location;
		console.log(user);
		console.log(req.body);

		//back end validation
		if(req.body.email == null ||req.body.email == '' || req.body.location == null || req.body.location == ''){
			console.log("Missing data");
			res.json({success: false, message:"ensure username and location are provided"});
		}else{
			user.save(function(err){
				if(err){
					res.json({success: false, message:"Email already exists!"});
				}else{
					console.log("user saved to db");
					res.json({success: true, message:"email registered!"});
				}
			});
		}
	});

	router.post('/sendemail', function(req, res){
		//initilize email client
		var transporter = nodemailer.createTransport({
  			service: 'gmail',
  			auth: {
  				//change user and pass to your gmail account
			    user: '',
			    pass: ''
  			}
		});

		//Customize Email Subject Logic
		var subjectLine;
		if(req.body.temp > req.body.avgHot + 5 || req.body.condition === "sunny"){
			subjectLine ="It's nice out! Enjoy a discount on us.";
		}else if(req.body.temp < req.body.avgCold - 5 || req.body.condition === "precipitating"){
			subjectLine = "Not so nice out? That's okay, enjoy a discount on us.";
		}else{
			subjectLine = "Enjoy a discount on us.";
		}

		//customize sentence
		var secondSentence;
		if(req.body.temp > req.body.avgHot + 5 || req.body.condition === "Sunny"){
			secondSentence = "Lets make a great day even greater!";
		}else if(req.body.temp < req.body.avgCold - 5 || req.body.condition === "Raining"){
			secondSentence = "Don't let the bad weather get you down!";
		}else{
			secondSentence = "It's always a great time to shop!";
		}
		
		//creat email object
		var mailOptions = {
  			from: 'dmakover@gmail.com',
  			to: req.body.sendTo,
  			subject: subjectLine,
  			html:'<div style="text-align:center;"><img src="https://icons.wxug.com/i/c/k/'+req.body.icon +'.gif" style="display:block; margin-right:auto; margin-left:auto; height:150px; width:200px;">'	
  			+'<p style="align:center;">'+ req.body.temp+'F in ' +req.body.city+','+ req.body.state +' and '+ req.body.condition.toLowerCase() + ' skys!<br>'
  			+ secondSentence +'<br>'
  			+'Enjoy up to <strong>15% discounts</strong> on all of our items for the entire week!</p></div>'
		};

		//send email
		transporter.sendMail(mailOptions, function(error, info){
  			if (error) {
    			console.log(error);
  			} else {
    			console.log('Email sent: ' + info.response);
    			res.json({success: true, message:"We have just sent you an email for sweet hot new deals ;-)"});
  			}
		});
	});
	return router;
} 