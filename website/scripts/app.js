'use strict';

let API = 'http://localhost:3000';

function setEventListeners() {
  $('#search-form').on('submit', fetchCityData);
}

function fetchCityData(event) {

  event.preventDefault();

  let searchQuery = $('#input-search').val().toLowerCase();

  $("#map").hide();
  $("#title").hide();
  $(".columns section").hide();

  const ajaxSettings = {
    method: 'get',
    dataType: 'json',
    data: { city: searchQuery }
  };

  $.ajax(`${API}/location`, ajaxSettings)
    .then(location => {
      console.log("response of location : ", location)
      showTitle(location);
      displayMap(location);
      getRestaurants(location);
      getWeather(location);
    })
    .catch(error => {
      console.error(error);
    });
}

function displayMap(location) {
  let template = $("#image-template").html();
  let markup = Mustache.render(template, location);
  $("#map").html(markup)
  $("#map").show();
}

function showTitle(location) {
  let template = $("#title-template").html();
  let markup = Mustache.render(template, location);
  $("#title").html(markup)
  $("#title").show();
}

function getRestaurants(location) {

  const ajaxSettings = {
    method: 'get',
    dataType: 'json',
    data: location
  };

  $.ajax(`${API}/restaurants`, ajaxSettings)
    .then(result => {
      let $container = $('#restaurants');
      let $list = $('#restaurant-results');
      let template = $('#restaurant-results-template').html();
      result.forEach(entry => {
        let markup = Mustache.render(template, entry);
        $list.append(markup);
      });
      $container.show();
    })
    .catch(error => {
      console.error(error);
    });
}

function getWeather(location) {

  const ajaxSettings = {
    method: 'get',
    dataType: 'json',
    data: location
  };

  $.ajax(`${API}/weather`, ajaxSettings)
    .then(result => {
      let $container = $('#weather');
      let $list = $('#weather-results');
      let template = $('#weather-results-template').html();
      result.forEach(entry => {
        let markup = Mustache.render(template, entry);
        $list.append(markup);
      });
      $container.show();
    })
    .catch(error => {
      console.error(error);
    });
}

$('document').ready(function () {
  setEventListeners();
});
