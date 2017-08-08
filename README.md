#Klaviyo weather app
This is a simple single page application powered by the Mean Stack. The front end is angularJS, the server is NodeJS/ExpressJS, and the database is MongoDB. The styling is done by bootstrap.

The weather data is provided by the WeatherUnderground api. All locations are fed from a json api I found on github. IThe address is: https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json

All emails are sent through Gmail.

#Running the app.
1 - clone repository
2 - CD into klaviyo
3 - run npm install 
4 - run npm start or nodemon server.js
5 - visit localhost:8000 in browser.

#before use
Go to file /app/routes/api and enter in user and pass values under the route '/sendemail'

#using the app
Upon viting the index page input an email and provide a city.You will then recieve an email with the weather for your location. All Emails are customized based on the locations current weather in comparisson to the locations historical weather.

Frontend and backend validation are used to ensure that only unique and valid emails are inputed into the database. 

