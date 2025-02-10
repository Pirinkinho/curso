
                          
{
    "coord": {
       "lon": 7.367,
       "lat": 45.133
    },
    "weather": [
       {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
       }
    ],
    "base": "stations",
    "main": {
       "temp": 284.2,
       "feels_like": 282.93,
       "temp_min": 283.06,
       "temp_max": 286.82,
       "pressure": 1021,
       "humidity": 60,
       "sea_level": 1021,
       "grnd_level": 910
    },
    "visibility": 10000,
    "wind": {
       "speed": 4.09,
       "deg": 121,
       "gust": 3.47
    },
    "rain": {
       "1h": 2.73
    },
    "clouds": {
       "all": 83
    },
    "dt": 1726660758,
    "sys": {
       "type": 1,
       "id": 6736,
       "country": "IT",
       "sunrise": 1726636384,
       "sunset": 1726680975
    },
    "timezone": 7200,
    "id": 3165523,
    "name": "Province of Turin",
    "cod": 200
 }                    
                        
 

//  JSON format API response fields

// coord
// coord.lon Longitude of the location
// coord.lat Latitude of the location
// weather (more info Weather condition codes)
// weather.id Weather condition id
// weather.main Group of weather parameters (Rain, Snow, Clouds etc.)
// weather.description Weather condition within the group. Please find more here. You can get the output in your language. Learn more
// weather.icon Weather icon id
// base Internal parameter
// main
// main.temp Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
// main.feels_like Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
// main.pressure Atmospheric pressure on the sea level, hPa
// main.humidity Humidity, %
// main.temp_min Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas). Please find more info here. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
// main.temp_max Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas). Please find more info here. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
// main.sea_level Atmospheric pressure on the sea level, hPa
// main.grnd_level Atmospheric pressure on the ground level, hPa
// visibility Visibility, meter. The maximum value of the visibility is 10 km
// wind
// wind.speed Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
// wind.deg Wind direction, degrees (meteorological)
// wind.gust Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
// clouds
// clouds.all Cloudiness, %
// rain
// 1h(where available)Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
// snow
// 1h(where available) Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
// dt Time of data calculation, unix, UTC
// sys
// sys.type Internal parameter
// sys.id Internal parameter
// sys.message Internal parameter
// sys.country Country code (GB, JP etc.)
// sys.sunrise Sunrise time, unix, UTC
// sys.sunset Sunset time, unix, UTC
// timezone Shift in seconds from UTC
// id City ID. Please note that built-in geocoder functionality has been deprecated. Learn more here
// name City name. Please note that built-in geocoder functionality has been deprecated. Learn more here
// cod Internal parameter

// para la irradiación solar para paneles solares:
const url = `https://api.openweathermap.org/energy/1.0/solar/data?lat={lat}&lon={lon}&date={date}&lang=es&appid={apikey}`
