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

export const WeatherProvider: React.FC<WeatherProviderProps> = ({
  children,
}) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  // 获取用户当前位置的天气
  const getCurrentLocationWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async () => {
          // 这里可以调用真实的天气API，现在使用模拟数据
          const mockWeather: WeatherData = {
            city: "Current Location",
            temperature: Math.floor(Math.random() * 20) + 15,
            description: "Sunny",
            icon: "☀️",
            humidity: 65,
            windSpeed: 12,
            feelsLike: Math.floor(Math.random() * 20) + 15,
          };
          setCurrentWeather(mockWeather);
        },
        () => {
          // 如果无法获取位置，使用默认城市
          fetchWeather("San Francisco");
        }
      );
    } else {
      // 浏览器不支持地理位置，使用默认城市
      fetchWeather("San Francisco");
    }
  };

  const fetchWeather = async (city: string) => {
    setLoading(true);
    try {
      // 模拟API调用
      setTimeout(() => {
        const mockWeather: WeatherData = {
          city,
          temperature: Math.floor(Math.random() * 30) + 10,
          description: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][
            Math.floor(Math.random() * 4)
          ],
          icon: ["☀️", "☁️", "🌧️", "⛅"][Math.floor(Math.random() * 4)],
          humidity: Math.floor(Math.random() * 40) + 40,
          windSpeed: Math.floor(Math.random() * 20) + 5,
          feelsLike: Math.floor(Math.random() * 30) + 10,
        };
        setCurrentWeather(mockWeather);
        setLoading(false);
      }, 500);
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
