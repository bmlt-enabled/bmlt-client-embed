var baseURL = "https://bmlt.ncregion-na.org/main_server/client_interface/json/?switcher=GetSearchResults"
var getDayOfWeek = function(dayint) {
    return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayint];
};
var getTodayDayOfWeek = function() {
    return (new Date()).getDay() + 1;
};
var militaryToStandard = function(value) {
  if (value !== null && value !== undefined){ //If value is passed in
    if(value.indexOf('AM') > -1 || value.indexOf('PM') > -1){ //If time is already in standard time then don't format.
      return value;
    }
    else {
      if(value.length == 8){ //If value is the expected length for military time then process to standard time.
        var hour = value.substring ( 0,2 ); //Extract hour
        var minutes = value.substring ( 3,5 ); //Extract minutes
        var identifier = 'AM'; //Initialize AM PM identifier

        if(hour == 12){ //If hour is 12 then should set AM PM identifier to PM
          identifier = 'PM';
        }
        if(hour == 0){ //If hour is 0 then set to 12 for standard time 12 AM
          hour=12;
        }
        if(hour > 12){ //If hour is greater than 12 then convert to standard 12 hour format and set the AM PM identifier to PM
          hour = hour - 12;
          identifier='PM';
        }
        return hour + ':' + minutes + ' ' + identifier; //Return the constructed standard time
      }
      else { //If value is not the expected length than just return the value as is
        return value;
      }
    }
  }
};

var getMeetingsByCity = function(city, callback) {
  $.getJSON(baseURL + "&meeting_key=location_municipality&meeting_key_value=" + city, callback);
};

var getMeetingsByServiceBodyId = function(serviceBodyId, callback) {
  $.getJSON(baseURL + "&services=" + serviceBodyId, callback);
};

var getMeetingsByServiceBodyIdAndWeekdayId = function(serviceBodyId, weekdayId, callback) {
  $.getJSON(baseURL + "&services=" + serviceBodyId + "&weekdays=" + weekdayId, callback);
};

var getMeetingsByServiceBodyIdAndCity = function(serviceBodyId, city, callback) {
  $.getJSON(baseURL + "&services=" + serviceBodyId + "&meeting_key=location_municipality&meeting_key_value=" + city, callback);
};
