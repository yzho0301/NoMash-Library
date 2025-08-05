<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <button @click="searchByCity" class="search-button">
          Searching...
        </button>
      </div>
    </div>
    <main v-if="weatherData">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <div class="weather-info">
        <img :src="iconUrl" alt="Weather Icon" class="weather-icon" />
        <div class="temperature">
          <p>{{ temperature }} °C</p>
        </div>
      </div>
      <span>{{ weatherData.weather[0].description }}</span>
    </main>
  </div>
</template>




<script>
import axios from "axios";
const apikey = "7f05e6df62bbd80fbdf1b63dcb5515f0";
export default {
  name: "App",
  data() {
    return {
      city: "",
      weatherData: null,
    };
  },
  computed: {
    temperature() {
      return this.weatherData ? Math.floor(this.weatherData.main.temp - 273) : null;
    },
    iconUrl() {
      return this.weatherData
        ? `https://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  methods: {
    async searchByCity() {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
      await this.fetchWeatherData(url);
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
          await this.fetchWeatherData(url);
        });
      }
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather();
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}

.header {
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-input {
  padding: 5px;
  font-size: 16px;
  margin-right: 10px;
}

.search-button {
  padding: 5px 10px;
  font-size: 16px;
}

.weather-info {
  display: flex;
  align-items: center;
  justify-content: center;
}

.weather-icon {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.temperature {
  font-size: 24px;
}
</style>
