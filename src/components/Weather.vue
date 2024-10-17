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
    }
  }
};
</script>

<style scoped>
/* Optional: Custom styles for further refinement */
</style>

<template>
  <div class="mt-5 text-right">
    <!-- Temperature Display, aligned right -->
    <div class="text-5xl flex justify-end items-center">
      <font-awesome-icon :icon="['fas', 'temperature-three-quarters']" class="text-3xl" />
      <div class="ml-3">{{ temperature_current !== null ? temperature_current : 'Loading...' }}</div>
      <div class="text-3xl mt-3 ml-1">°C</div>
    </div>
    
    <!-- Wind Speed Display, aligned right -->
    <div class="flex justify-end items-center mt-2">
      <font-awesome-icon :icon="['fas', 'wind']" class="text-xl" />
      <div class="text-3xl ml-2">{{ wind_speed_10m !== null ? wind_speed_10m : 'N/A' }}</div>
      <div class="text-md mt-3 ml-1">km/h</div>
    </div>
    
    <div class="mt-16 text-xl">
  <h3 class="text-xl text-left">Forecast</h3>

  <hr class="h-px my-1 bg-white border-0">
  <div class="grid grid-cols-1">
    <div v-for="(day, index) in dailyPrecipitation" :key="index" class="grid grid-cols-3 items-center text-sm">
      <!-- Day Name -->
      <div class=" text-left">{{ day.day }}</div>
      
      <!-- Max Temp -->
      <div class="text-left">{{ day.temperature_max !== 'N/A' ? day.temperature_max : 'N/A' }}°C</div>
      
      <!-- Precipitation -->
      <div class="text-right">{{ day.precipitation !== null ? day.precipitation : 'N/A' }} mm</div>
    </div>
  </div>
</div>
</div>

</template>
