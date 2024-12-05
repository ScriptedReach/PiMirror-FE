<script>
export default {
  data() {
    return {
      currentTime: this.formatTime(new Date()),
      currentSeconds: new Date().getSeconds(), // Initial seconds
      currentDate: new Date(), // Store the current date object
      timeFormat: import.meta.env.VITE_TIME_FORMAT || '24h',
    };
  },
  created() {
    this.updateDate(); // Fixed: Invoking the method
  },
  methods: {
    updateTime() { // Renamed for clarity
      const now = new Date();
      this.currentTime = this.formatTime(now);
      this.currentSeconds = now.getSeconds(); // Update seconds
    },

    updateDate() {
      setInterval(() => {
        this.currentDate = new Date();
      }, 1000 * 60); // Update every minute
    },

    formatTime(date) {
      if (this.timeFormat === '12h') {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;
        const strSeconds = seconds < 10 ? '0' + seconds : seconds;
        return hours + ':' + strMinutes + ':' + strSeconds + ' ' + ampm;
      } else {
        return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // 24-hour format
      }
    }
  },
  mounted() {
    this.timer = setInterval(this.updateTime, 1000); // Fixed: Renamed method
  },
  beforeDestroy() {
    clearInterval(this.timer); // Cleanup to avoid memory leaks
  },
  computed: {
    dateFormat() { // Euro format
      const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
      const day = this.currentDate.getDate();
      const month = monthNames[this.currentDate.getMonth()];
      const year = this.currentDate.getFullYear();
      return `${day} ${month} ${year}`;
    }
  }
};
</script>



<template>
  <div class="flex flex-col">
    <div class="flex flex-row">
      <div class="text-time mb-4">{{ currentTime }}</div>
    </div>
    <hr class="h-px -mt-8 my-1 min-w-[288px] bg-white border-0 opacity-50">
    <div class="text-3xl text-gray-300">{{ dateFormat }}</div>
  </div>
</template>