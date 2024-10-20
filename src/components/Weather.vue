<script>
export default {
  data() {
    return {
      latitude: import.meta.env.VITE_LATITUDE,
      longitude: import.meta.env.VITE_LONGITUDE,
      timezone: import.meta.env.VITE_TIMEZONE,

      // API responses
      temperature_current: null,
      precipitation: null,
      wind_speed_10m: null,
      precipitation_sum: [],
      time: [],
      temperature_max: [],
      weather_code: 51,


      weatherDescriptions: {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Drizzle: Light intensity',
        53: 'Drizzle: Moderate intensity',
        55: 'Drizzle: Dense intensity',
        56: 'Freezing Drizzle: Light intensity',
        57: 'Freezing Drizzle: Dense intensity',
        61: 'Rain: Slight intensity',
        63: 'Rain: Moderate intensity',
        65: 'Rain: Heavy intensity',
        66: 'Freezing Rain: Light intensity',
        67: 'Freezing Rain: Heavy intensity',
        71: 'Snow fall: Slight intensity',
        73: 'Snow fall: Moderate intensity',
        75: 'Snow fall: Heavy intensity',
        77: 'Snow grains',
        80: 'Rain showers: Slight intensity',
        81: 'Rain showers: Moderate intensity',
        82: 'Rain showers: Violent intensity',
        85: 'Snow showers: Slight intensity',
        86: 'Snow showers: Heavy intensity',
        95: 'Thunderstorm: Slight or moderate',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
      }
    };
  },
  mounted() {
    console.log("Latitude:", this.latitude, "Longitude:", this.longitude);

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${this.latitude}&longitude=${this.longitude}&current_weather=true&daily=precipitation_sum,temperature_2m_max&timezone=${this.timezone}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Access the correct data from the API response
        this.temperature_current = data.current_weather.temperature;
        this.wind_speed_10m = data.current_weather.windspeed;
        this.precipitation_sum = data.daily.precipitation_sum;
        this.time = data.daily.time;
        this.temperature_max = data.daily.temperature_2m_max;
        this.weather_code = data.current_weather.weathercode;
      })
      .catch(error => console.error('Fetch error:', error));
  },
  computed: {
    dailyPrecipitation() {
      // Map the dates and precipitation sums to day names
      return this.time.map((date, index) => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayName = daysOfWeek[new Date(date).getDay()];

        return {
          day: dayName,
          precipitation: this.precipitation_sum[index] || 0,
          temperature_max: this.temperature_max[index] || 'N/A',
        };
      });
    },
  },
  methods: {
    getWeatherDescription(code) {
      return this.weatherDescriptions[code] || 'Unknown weather condition';
    }
  }
};
</script>

<template>
  <div class="flex flex-col text-right">
    <div class="text-white">
  <!-- Temperature Display -->
  <div class="flex justify-end items-center mb-4">
    <div class="flex items-center">
      <span class="text-5xl">{{ temperature_current !== null ? temperature_current : 'Loading...' }}</span>
      <span class="text-4xl">°</span>
    </div>
  </div>

  <hr class="h-px my-1 bg-white border-0 opacity-50">

  <!-- Weather codes with limited width and word wrap -->
  <div class="text-xl max-w-[190px] break-words text-right mb-1">
    {{ getWeatherDescription(weather_code) }}
  </div>

  <!-- Wind Speed Display, aligned right -->
  <div class="flex justify-end items-center space-x-2">
    <font-awesome-icon :icon="['fas', 'wind']" class="text-xl" />
    <span class="text-xl">{{ wind_speed_10m !== null ? wind_speed_10m : 'N/A' }}</span>
    <span class="text-sm mt-1">km/h</span>
  </div>
</div>


    <div>
      <div class="mt-10 text-xl">
        <!-- Forecast Title -->
        <h3 class="text-xl text-left">Forecast</h3>

        <hr class="h-px my-1 bg-white border-0 opacity-50">

        <!-- Forecast grid (fixed width, aligned right) -->
        <div class="grid grid-cols-1 w-[180px]">
          <div v-for="(day, index) in dailyPrecipitation" :key="index" class="grid grid-cols-3 items-center text-sm">
            <!-- Day Name -->
            <span class="text-left">{{ day.day }}</span>

            <!-- Max Temp -->
            <span class="text-left">{{ day.temperature_max !== 'N/A' ? day.temperature_max : 'N/A' }}°C</span>

            <!-- Precipitation -->
            <span class="text-right">{{ day.precipitation !== null ? day.precipitation : 'N/A' }} mm</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
