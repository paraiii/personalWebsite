import { createContext } from "react";

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

interface WeatherContextType {
  currentWeather: WeatherData | null;
  setCurrentWeather: (weather: WeatherData) => void;
  fetchWeather: (city: string) => Promise<void>;
  loading: boolean;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(
  undefined
);
