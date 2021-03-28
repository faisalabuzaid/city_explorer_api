'use strict';

const PORT = process.env.PORT || 3000; // convert this to an envirment variable

// my application dependencies
const express = require('express'); // node.js framework.
const cors = require('cors'); // cross origin resources sharing

const app = express(); //initalize express app

app.use(cors()); // use cors


//create a get route for location

// localhost:3000/location client will request from this
app.get('/location', handleLocation);

app.get('/restaurants', handleRestaurant);

app.get('/weather', handleWeather)

// express will return 404 not found from its internal error handler
// 500 for internal server error: from express handler

function handleLocation(request, response) {
  // get from json file
  // return data
  const getLocation = require('./data/location.json');
  console.log(request.query); // object: { city: 'amman' }
  const city = request.query.city; // amman
  console.log('city---->', city);
  let obj = {
    name: getLocation[0].display_name,
    formatted_query: city,
    city : city,
    latitude: getLocation[0].lat,
    longitude: getLocation[0].lon
  };
    // response.send("hello there!!!!");
  response.send(obj);
}

function handleWeather(request, response) {
  const weather = require('./data/weather.json');
  const weatherData = weather.data;
  let weatherArr = [];
  weatherData.forEach(item => {
    let obj = {
      'weather': item.weather.description,
      'time' : item.valid_date,
    };
    weatherArr.push(obj);
  })

  // response.send("hello there!!!!");
  response.send(weatherArr);
}


function handleRestaurant(request, response) {
  // get from json file
  // return data
  const data = require('./data/restaurants.json');
  const restaurants = data.nearby_restaurants;
  const restaurantResponse = [];
  restaurants.forEach(item=> {
    const current = item.restaurant;
    restaurantResponse.push({
      restaurant: current.name,
      cuisines: current.cuisines,
      locality: current.location.locality
    });
  });
  response.send(restaurantResponse);
}

// run it on the port
app.listen(PORT, ()=> console.log(`App is running on Server on port: ${PORT}`))

