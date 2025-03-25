import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Temperature {
    day: Float
    min: Float
    max: Float
    night: Float
    eve: Float
    morn: Float
  }

  type FeelsLike {
    day: Float
    night: Float
    eve: Float
    morn: Float
  }

  type WeatherDescription {
    id: Int
    main: String
    description: String
    icon: String
  }

  type ForecastDay {
    dt: Int
    sunrise: Int
    sunset: Int
    temp: Temperature
    feels_like: FeelsLike
    pressure: Int
    humidity: Int
    weather: [WeatherDescription]
    speed: Float
    deg: Int
    gust: Float
    clouds: Int
    pop: Float
    rain: Float
  }

  type WeatherForecast {
    lat: Float
    lng: Float
    city: String
    cnt: Int
    list: [ForecastDay]
  }

  type Weather {
    temperature: Float
    minTemperature: Float
    maxTemperature: Float
    humidity: Int
    description: String
    city: String
    country: String
    thermalSensation: Float
  }

  type WeatherGlobe {
    lat: Float
    lng: Float
    city: String
    temperature: Float
    description: String
    icon: String
    thermalSensation: Float
  }

  type Query {
    getWeatherData(location: String!): Weather
    getWeatherDataFromGlobe(location: String!): WeatherGlobe
    getWeatherForecastData(lat: Float!, lng: Float!, cnt: Int): WeatherForecast
  }
`);

export default schema;
