import React, { useState } from 'react';
import './Weather.css';
import axios from 'axios';
import Sunny from '../../Assets/sunny.png';
import Mist from '../../Assets/mist.png';
import Cloudy from '../../Assets/cloudy.png';
import Snowy from '../../Assets/snowy.png';
import Haze from '../../Assets/Haze.jpg';
import Drizzle from '../../Assets/Drizzle.png';
import clearWeather from '../../Assets/clearWeather.png';

import { FaSearchLocation } from 'react-icons/fa';
import ClearWeather from '../../Assets/clearWeather.png';
import { WiHumidity } from 'react-icons/wi';
import { TbWind, TbTemperatureMinus, TbTemperaturePlus } from 'react-icons/tb';
import { BsArrowsExpand } from 'react-icons/bs'
import { MdOutlineEmojiEmotions, MdOutlineVisibility } from 'react-icons/md';
import { TiWeatherSunny } from 'react-icons/ti'
import { GiModernCity } from 'react-icons/gi';


const Weather = () => {

    const [name, setName] = useState('');
    const [isError, setError] = useState('');

    const [weatherInfo, setWeatherInfo] = useState({
        name: '',
        celsius: '',
        humidity: '',
        speed: '',
        pressure: '',
        maximumTemperature: '',
        minimumTemperature: '',
        feels_like: '',
        sea_level: '',
        country: '',
        visibility: '',
        weather: '',
        weatherImg: clearWeather,

    });

    const handleClick = () => {

        if (name !== '') {
            const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=0597d43618dc0eb8c3a72e473ceddeb4&units=metric`

            let imgPath = ''

            axios.get(baseUrl).then((res) => {

                console.log(res.data)


                if (res.data.weather[0].main === 'Clouds') {
                    imgPath = Cloudy
                } else if (res.data.weather[0].main === 'Sunny') {
                    imgPath = Sunny
                } else if (res.data.weather[0].main === 'Mist') {
                    imgPath = Mist;
                } else if (res.data.weather[0].main === 'Haze') {
                    imgPath = Haze;
                } else if (res.data.weather[0].main === 'Drizzle') {
                    imgPath = Drizzle;
                } else if (res.data.weather[0].main === 'Snowy') {
                    imgPath = Snowy;
                } else {
                    imgPath = ClearWeather;
                }

                setWeatherInfo({
                    ...weatherInfo,
                    name: res.data.name,
                    celsius: res.data.main.temp,
                    humidity: res.data.main.humidity,
                    speed: res.data.wind.speed,
                    pressure: res.data.main.pressure,
                    maximumTemperature: res.data.main.temp_max,
                    minimumTemperature: res.data.main.temp_min,
                    feels_like: res.data.main.feels_like,
                    sea_level: res.data.main.sea_level,
                    country: res.data.sys.country,
                    visibility: res.data.visibility,
                    weather: res.data.weather[0].main,
                    weatherImg: imgPath

                })
                setError('');
            }).catch((error) => {
                if (error.response.statusText === 'Not Found') {
                    setError('Invalid City entered !');
                } else {
                    setError('');
                }
            });
        }
    }

    return (

        <>
            <div className="box">

                <div className="weatherContainer">

                    <div className="leftContent">
                        <span style={{ color: 'red', fontSize: '20px' }}>{isError}</span>

                        <div className="search">
                            <div className="searchBox">
                                <input type="text" placeholder='Enter City name' onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="searchIconContainer">
                                {<FaSearchLocation className='searchIcon' onClick={handleClick} />}
                            </div>
                        </div>

                        <div className="weatherImgContainer">
                            <img src={weatherInfo.weatherImg} className='weatherImg' alt="weatherImg" />
                        </div>

                        <div className="cityAndCelsius">
                            <div className="celsius">
                                <h1>{Math.floor(weatherInfo.celsius)}°C</h1>
                            </div>
                            <div className="cityName">
                                <h1>{weatherInfo.name}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="rightContent">


                        <div className="forecast">
                            <GiModernCity />
                            <div className='speedAndTitle'>
                                <div className="windSpeed">
                                    <h6>{weatherInfo.country}</h6>
                                </div>
                                <div className="windTitle">
                                    <h6>Country </h6>
                                </div>
                            </div>
                        </div>
                        <div className="forecast">
                            <TbWind />
                            <div className='speedAndTitle'>
                                <div className="windSpeed">
                                    <h6>{weatherInfo.speed}</h6>
                                </div>
                                <div className="windTitle">
                                    <h6>Wind Speed</h6>
                                </div>
                            </div>
                        </div>

                        <div className="forecast">
                            <WiHumidity />
                            <div className='speedAndTitle'>
                                <div className="windSpeed">
                                    <h6>{weatherInfo.humidity}</h6>
                                </div>
                                <div className="windTitle">
                                    <h6>Humidity </h6>
                                </div>
                            </div>
                        </div>

                        <div className="forecast">
                            <BsArrowsExpand />
                            <div className='speedAndTitle'>
                                <div className="windSpeed">
                                    <h6>{weatherInfo.pressure}</h6>
                                </div>
                                <div className="windTitle">
                                    <h6>Pressure </h6>
                                </div>
                            </div>
                        </div>

                        <div className="forecast">
                            <TbTemperatureMinus />
                            <div className='speedAndTitle'>
                                <div className="windSpeed">
                                    <h6>{weatherInfo.minimumTemperature}</h6>
                                </div>
                                <div className="windTitle">
                                    <h6>Min.Temp </h6>
                                </div>
                            </div>
                        </div>

                        <div className="forecast">
                            {<TbTemperaturePlus />}
                            <div className='speedAndTitle'>
                                <div className="windSpeed">
                                    <h6>{weatherInfo.maximumTemperature}</h6>
                                </div>
                                <div className="windTitle">
                                    <h6>Max.Temp </h6>
                                </div>
                            </div>
                        </div>

                        <div className="forecast">
                            <MdOutlineEmojiEmotions />
                            <div className='speedAndTitle'>
                                <div className="windSpeed">
                                    <h6>{weatherInfo.feels_like}</h6>
                                </div>
                                <div className="windTitle">
                                    <h6>Feels like </h6>
                                </div>
                            </div>
                        </div>

                        <div className="forecast">
                            <TiWeatherSunny />
                            <div className='speedAndTitle'>
                                <div className="windSpeed">
                                    <h6>{weatherInfo.weather}</h6>
                                </div>
                                <div className="windTitle">
                                    <h6>Weather</h6>
                                </div>
                            </div>
                        </div>

                        <div className="forecast">
                            <MdOutlineVisibility />
                            <div className='speedAndTitle'>
                                <div className="windSpeed">
                                    <h6>{weatherInfo.visibility}</h6>
                                </div>
                                <div className="windTitle">
                                    <h6>Visibility </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Weather
