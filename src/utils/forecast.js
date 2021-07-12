const request = require("request");
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=880fa836f3cead2c80b0b4359d0640af&query=${latitude},${longitude}`;
    request({ url, json: true }, (err, { body } = {}) => {
        if (err) {
            callback("Unable to connect to weather service!");
        } else if (body.error) {
            callback("Unable to find location!");
        } else {
            callback(
                undefined,
                `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out `
            );
        }
    });
};

module.exports = forecast;
