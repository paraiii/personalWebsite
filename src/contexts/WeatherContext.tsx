import { fetchWeatherApi } from "openmeteo";
import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";
import { WeatherContext } from "./WeatherContextDef";

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

interface WeatherProviderProps {
  children: ReactNode;
}

// 天气代码映射函数
const getWeatherInfo = (weatherCode: number) => {
  const weatherMap: { [key: number]: { description: string; icon: string } } = {
    0: { description: "Clear sky", icon: "☀️" },
    1: { description: "Mainly clear", icon: "🌤️" },
    2: { description: "Partly cloudy", icon: "⛅" },
    3: { description: "Overcast", icon: "☁️" },
    45: { description: "Foggy", icon: "🌫️" },
    48: { description: "Depositing rime fog", icon: "🌫️" },
    51: { description: "Light drizzle", icon: "🌦️" },
    53: { description: "Moderate drizzle", icon: "🌧️" },
    55: { description: "Dense drizzle", icon: "🌧️" },
    56: { description: "Light freezing drizzle", icon: "🌨️" },
    57: { description: "Dense freezing drizzle", icon: "🌨️" },
    61: { description: "Slight rain", icon: "🌧️" },
    63: { description: "Moderate rain", icon: "🌧️" },
    65: { description: "Heavy rain", icon: "🌧️" },
    66: { description: "Light freezing rain", icon: "🌨️" },
    67: { description: "Heavy freezing rain", icon: "🌨️" },
    71: { description: "Slight snow", icon: "🌨️" },
    73: { description: "Moderate snow", icon: "🌨️" },
    75: { description: "Heavy snow", icon: "🌨️" },
    77: { description: "Snow grains", icon: "🌨️" },
    80: { description: "Slight rain showers", icon: "🌦️" },
    81: { description: "Moderate rain showers", icon: "🌧️" },
    82: { description: "Violent rain showers", icon: "🌧️" },
    85: { description: "Slight snow showers", icon: "🌨️" },
    86: { description: "Heavy snow showers", icon: "🌨️" },
    95: { description: "Thunderstorm", icon: "⛈️" },
    96: { description: "Thunderstorm with slight hail", icon: "⛈️" },
    99: { description: "Thunderstorm with heavy hail", icon: "⛈️" },
  };

  return weatherMap[weatherCode] || { description: "Unknown", icon: "❓" };
};

export const WeatherProvider: React.FC<WeatherProviderProps> = ({
  children,
}) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const apiKey = "AIzaSyC4AlLxLfKvqxJJJsasbs4foMLXozci-5Y";

  // Get current city through coordinates
  const reverseGeocode = async (lat: number, lon: number) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`
    );
    const data = await response.json();
    const result = data?.results?.[0];
    if (!result?.address_components) {
      return "Unknown";
    }
    const city =
      result.address_components.find(
        (address: { types: string[] }) =>
          address.types.includes("locality") &&
          address.types.includes("political")
      )?.long_name || "Unknown";
    console.log("city", city);

    return city;
  };

  // Get current location's weather
  const getCurrentLocationWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const city = await reverseGeocode(latitude, longitude);
        await fetchWeatherByCoords(latitude, longitude, city);
      });
    } else {
      // 浏览器不支持 geolocation，也用 IP fallback
      fetchWeather("melbourne");
    }
  };

  // 通过坐标获取天气
  const fetchWeatherByCoords = async (
    latitude: number,
    longitude: number,
    cityName?: string
  ) => {
    setLoading(true);
    try {
      const params = {
        latitude: latitude,
        longitude: longitude,
        hourly: [
          "temperature_2m",
          "relative_humidity_2m",
          "weather_code",
          "wind_speed_10m",
          "apparent_temperature",
        ],
        timezone: "auto",
      };

      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];

      const hourly = response.hourly()!;
      const currentHour = new Date().getHours();

      // 获取当前小时的天气数据
      const temperature = hourly.variables(0)!.valuesArray()![currentHour];
      const humidity = hourly.variables(1)!.valuesArray()![currentHour];
      const weatherCode = hourly.variables(2)!.valuesArray()![currentHour];
      const windSpeed = hourly.variables(3)!.valuesArray()![currentHour];
      const feelsLike = hourly.variables(4)!.valuesArray()![currentHour];

      const weatherInfo = getWeatherInfo(weatherCode);

      const weatherData: WeatherData = {
        city: cityName || "Current Location",
        temperature: Math.round(temperature),
        description: weatherInfo.description,
        icon: weatherInfo.icon,
        humidity: Math.round(humidity),
        windSpeed: Math.round(windSpeed),
        feelsLike: Math.round(feelsLike),
      };

      setCurrentWeather(weatherData);
      setLoading(false);
      console.log("Real weather data:", weatherData);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
      setLoading(false);
    }
  };

  // 通过城市名称搜索获取坐标
  const searchCityCoordinates = async (cityName: string) => {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          cityName
        )}&count=1&language=en&format=json`
      );
      const data = await response.json();
      console.log("data", data);

      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        console.log("result", result);
        return {
          lat: result.latitude,
          lon: result.longitude,
          name: result.name,
          country: result.country,
        };
      }
      return null;
    } catch (error) {
      console.error("Failed to search city coordinates:", error);
      return null;
    }
  };

  const fetchWeather = async (city: string) => {
    setLoading(true);
    try {
      // 首先尝试从预定义的城市列表中查找
      const cityCoords: { [key: string]: { lat: number; lon: number } } = {
        Melbourne: { lat: -37.814, lon: 144.9633 },
        Sydney: { lat: -33.8688, lon: 151.2093 },
        Brisbane: { lat: -27.4698, lon: 153.0251 },
        Perth: { lat: -31.9505, lon: 115.8605 },
        Adelaide: { lat: -34.9285, lon: 138.6007 },
        Canberra: { lat: -35.2809, lon: 149.13 },
        Darwin: { lat: -12.4634, lon: 130.8456 },
        Hobart: { lat: -42.8821, lon: 147.3272 },
      };

      let coords = cityCoords[city];
      let cityDisplayName = city;

      // 如果城市不在预定义列表中，通过 API 搜索
      if (!coords) {
        const searchResult = await searchCityCoordinates(city);
        if (searchResult) {
          coords = { lat: searchResult.lat, lon: searchResult.lon };
          cityDisplayName = `${searchResult.name}, ${searchResult.country}`;
        } else {
          // 如果搜索失败，使用默认坐标
          coords = { lat: -37.814, lon: 144.9633 };
          cityDisplayName = "Melbourne";
        }
      }

      await fetchWeatherByCoords(coords.lat, coords.lon, cityDisplayName);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // 初始化时获取当前位置天气
    getCurrentLocationWeather();
  }, []);

  const value = {
    currentWeather,
    setCurrentWeather,
    fetchWeather,
    loading,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
