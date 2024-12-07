let cityInput = document.getElementById('city_input'),
searchBtn = document.getElementById('searchBtn'),
locationBtn = document.getElementById('locationBtn'),
api_key = 'bc64ef4766e1811ac40b54abef83e72b';
currentWeatherCard = document.querySelectorAll('.weather-left .card')[0];
fiveDaysForecastCard = document.querySelector('.day-forecast');
aqiCard = document.querySelectorAll('.highlights .card')[0];
sunriseCard = document.querySelectorAll('.highlights .card')[1];
humidityVal = document.getElementById('humidityVal'),
pressureVal = document.getElementById('pressureVal'),
visibilityVal = document.getElementById('visibilityVal'),
windSpeedVal = document.getElementById('windSpeedVal'),
feelsVal = document.getElementById('feelsVal'),
hourlyForecastCard = document.querySelector('.hourly-forecast'), 
aqiList = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];

function getWeatherDetails(name, lat, lon, country, state){
    let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
    WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
    AIR_POLUTION_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`,

    days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    fetch(AIR_POLUTION_API_URL).then(res => res.json()).then(data => {
        let {co, no, no2, o3, so2, pm2_5, pm10, nh3} = data.list[0].components;
        aqiCard.innerHTML = `
        <div class="card-head">
            <p>Air Quality Index</p>
            <p class="air-index aqi-${data.list[0].main.aqi}">${aqiList[data.list[0].
                main.aqi - 1]}</p>
        </div>
        <div class="air-indices">
            <i class="fa-solid fa-wind fa-3x"></i>
            <div class="item">
                <p>PM2.5</p>
                <h2>${pm2_5}</h2>
            </div>
            <div class="item">
                <p>PM10</p>
                <h2>${pm10}</h2>
            </div>
            <div class="item">
                <p>SO2</p>
                <h2>${so2}</h2>
            </div>
            <div class="item">
                <p>CO</p>
                <h2>${co}</h2>
            </div>
                <div class="item">
                    <p>NO</p>
                    <h2>${no}</h2>
                </div>
                <div class="item">
                    <p>NO2</p>
                    <h2>${no2}</h2>
                </div>
                <div class="item">
                    <p>NH3</p>
                    <h2>${nh3}</h2>
                </div>
                <div class="item">
                    <p>O3</p>
                    <h2>${o3}</h2>
                </div>
        </div>
        `;
    }).catch(() => {
        alert('Failed to fetch Air Quality Index');
    });

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        let date = new Date();
        currentWeatherCard.innerHTML = `
        <div class="current-weather">
         <div class="details">
             <p>Now</p>
             <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
             <p>${data.weather[0].description}</p>
         </div>
         <div class="weather-icon">
             <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
              alt="">
         </div>
          </div>
          <hr>
          <div class="card-footer">
              <p><i class="fa-regular fa-calendar"></i> ${days[date.getDay()]}, ${date.
                  getDate()}, ${months[date.getMonth()]} ${date.getFullYear()}</p>
              <p><i class="fa-solid fa-location-dot"></i> ${name}, ${country}</p>
          </div>
          `;
          let {sunrise, sunset} = data.sys,
          {timezone, visibility} = data,
          {humidity, pressure, feels_like} = data.main,
          {speed} = data.wind,
          sRiseTime = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('hh:mm A'),
          sSetTime = moment.utc(sunset, 'X').add(timezone, 'seconds').format('hh:mm A');
          sunriseCard.innerHTML = `
          <div class="card-head">
                            <p>Sunrise & Sunset</p>
           </div>
           <div class="sunrise-sunset">
               <div class="item">
                   <div class="icon">
                       <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 32 32" fill="white" height="100" weight="100"><g><path d="M18.92,22a6.952,6.952,0,0,0-.433-1.619l4.4-2.559-1.006-1.728-4.4,2.56a7.04,7.04,0,0,0-1.139-1.137l2.553-4.39-1.729-1.006L14.61,16.51A6.95,6.95,0,0,0,13,16.08V11H11v5.08a6.914,6.914,0,0,0-1.6.425l-2.55-4.384L5.126,13.127l2.548,4.381a7.028,7.028,0,0,0-1.147,1.14L2.14,16.094,1.134,17.822l4.382,2.551A6.972,6.972,0,0,0,5.08,22H0v2H24V22ZM7.1,22a5,5,0,0,1,9.8,0Z"/><path d="M15.293,5.293l1.414-1.414L13.414.586a2,2,0,0,0-2.828,0L7.293,3.879,8.707,5.293,11,3V9h2V3Z"/></g></svg>
                   </div>
                   <div>
                       <p>Sunrise</p>
                       <h2>${sRiseTime}</h2>
                   </div>
               </div>
               <div class="item">
                   <div class="icon">
                       <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 32 32" fill="white" height="100" weight="100"><g><path d="M18.92,22a6.952,6.952,0,0,0-.433-1.619l4.4-2.559-1.006-1.728-4.4,2.56a7.046,7.046,0,0,0-1.14-1.137l2.553-4.39-1.729-1.005L14.61,16.51A6.95,6.95,0,0,0,13,16.08V11H11v5.08a6.914,6.914,0,0,0-1.6.425l-2.55-4.383L5.126,13.127l2.548,4.381a7.028,7.028,0,0,0-1.147,1.14L2.14,16.094,1.134,17.822l4.382,2.551A6.924,6.924,0,0,0,5.08,22H0v2H24V22ZM7.1,22a5,5,0,0,1,9.8,0Z"/><path d="M8.707,3.707,7.293,5.121l3.293,3.293a2,2,0,0,0,2.828,0l3.293-3.293L15.293,3.707,13,6V0H11V6Z"/></g></svg>

                   </div>
                   <div>
                       <p>Sunset</p>
                       <h2>${sSetTime}</h2>
                   </div>
               </div>
           </div>
        `;
        humidityVal.innerHTML = `${humidity}%`;
        pressureVal.innerHTML = `${pressure}hPa`;
        visibilityVal.innerHTML = `${visibility / 1000}km`;
        windSpeedVal.innerHTML = `${speed}m/s`;
        feelsVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`;
    }).catch(() =>{
        alert('Failed to fetch current weather');
    });

    fetch(FORECAST_API_URL).then(res => res.json()).then(data => {
        let hourlyForecast = data.list;
        hourlyForecastCard.innerHTML = '';
        for(i = 0; i <= 7; i++){
            let hrForecastDate = new Date(hourlyForecast[i].dt_txt);
            let hr = hrForecastDate.getHours();
            let a = 'PM';
            if(hr < 12) a = 'AM';
            if(hr == 0) hr = hr - 12;
            hourlyForecastCard.innerHTML += `
            <div class="card">
                <p>${hr} ${a}</p>
                <img src="https://openweathermap.org/img/wn/${hourlyForecast[i].
                weather[0].icon}.png" alt="">
                <p>${(hourlyForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
            </div>
            `;
        }
        let uniqueForecastDays = [];
        let fiveDaysForecast = data.list.filter(forecast => {
            let forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)){
                return uniqueForecastDays.push(forecastDate);
            }
        });
        fiveDaysForecastCard.innerHTML = '';
        for(i = 1; i < fiveDaysForecast.length; i++){
            let date = new Date(fiveDaysForecast[i].dt_txt);
            fiveDaysForecastCard.innerHTML += `
                <div class="forecast-item">
                            <div class="icon-wrapper">
                                <img src="http://openweathermap.org/img/wn/${fiveDaysForecast[i].
                                    weather[0].icon}.png" alt="">
                                 <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;
                                 C</span>
                            </div>
                            <p>${date.getDate()} ${months[date.getMonth()]}</p>
                            <p>${days[date.getDay()]}</p>
                        </div>
            `;
        }
    }).catch(() => {
        alert('Failed to fetch weather forecast');
    });
}

function getCityCoordinates(){
    let cityName = cityInput.value.trim();
    cityInput.value= '';
    if(!cityName) return;
    let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        let {name, lat, lon, country, state} = data[0];
        getWeatherDetails(name, lat, lon, country, state);
    }).catch(() => {
        alert(`Failed to fetch coordinates of ${cityName}`);
    });
}

function getUserCoordinates(){
    navigator.geolocation.getCurrentPosition(position => {
        let {latitude, longitude} = position.coords;
        let REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;
        fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
            let {name, country, state} = data[0];
            getWeatherDetails(name, latitude, longitude, country, state);
        }).catch(() => {
            alert('Failed to fetch user coordinates');
        });
    }, error => {
        if(error.code === error.PERMISSION_DENIED){
            alert('Geolocation permission denied. Please reset location permission to grant access again');
        }
    });
}

searchBtn.addEventListener('click', getCityCoordinates);
locationBtn.addEventListener('click', getUserCoordinates);
cityInput.addEventListener('keyup', e => e.key === 'Enter' && getCityCoordinates());
window.addEventListener('load', getUserCoordinates);