import axios from "axios";
import { config } from "dotenv";

config()

const apiKey = "cb413505fb3c6f737486d9d472786b3e";

if (!apiKey) {
  throw new Error("Chave da API não configurada. Defina OPENWEATHER_API_KEY no .env.");
}

export const root = {
  getWeatherData: async ({ location }: { location: string }) => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=pt`;
      const response = await axios.get(apiUrl);

      const data = response.data;

      return {
        temperature: Math.trunc(data.main.temp),
        minTemperature: Math.trunc(data.main.temp_min),
        maxTemperature: Math.trunc(data.main.temp_max),
        humidity: data.main.humidity,
        description: data.weather[0].description,
        city: data.name,
        country: data.sys.country,
        thermalSensation: data.main.feels_like,
      };
    } catch (error) {
      console.error("Erro ao buscar dados do clima:", error);
      throw new Error("Falha ao buscar os dados do clima");
    }
  },

  getWeatherDataFromGlobe: async ({ location }: { location: string }) => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=pt`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      return {
        lat: data.coord.lat,
        lng: data.coord.lon,
        city: data.name,
        temperature: Math.trunc(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        thermalSensation: data.main.feels_like,
      };
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      throw new Error("Erro ao buscar os dados do clima global.");
    }
  },

  getWeatherForecastData: async ({ lat, lng, cnt = 7 }: { lat: number; lng: number; cnt?: number }) => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&cnt=${cnt}&appid=${apiKey}&units=metric&lang=pt`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      return {
        lat: data.city.coord.lat,
        lng: data.city.coord.lon,
        city: data.city.name,
        cnt: data.list.length,
        list: data.list.map((item: any) => ({
          dt: item.dt,
          sunrise: item.sunrise,
          sunset: item.sunset,
          temp: {
            day: Math.trunc(item.temp.day),
            min: Math.trunc(item.temp.min),
            max: Math.trunc(item.temp.max),
            night: Math.trunc(item.temp.night),
            eve: Math.trunc(item.temp.eve),
            morn: Math.trunc(item.temp.morn),
          },
          feels_like: {
            day: Math.trunc(item.feels_like.day),
            night: Math.trunc(item.feels_like.night),
            eve: Math.trunc(item.feels_like.eve),
            morn: Math.trunc(item.feels_like.morn),
          },
          pressure: item.pressure,
          humidity: item.humidity,
          weather: item.weather.map((w: any) => ({
            id: w.id,
            main: w.main,
            description: w.description,
            icon: w.icon,
          })),
          speed: item.speed,
          deg: item.deg,
          gust: item.gust,
          clouds: item.clouds,
          pop: item.pop,
          rain: item.rain || 0,
        })),
      };
    } catch (error) {
      console.error("Erro ao buscar previsão do tempo:", error);
      throw new Error("Falha ao obter a previsão do tempo");
    }
  },
};
