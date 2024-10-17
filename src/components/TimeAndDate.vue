<script>
export default {
  data() {
    return {
      currentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      currentSeconds: new Date().getSeconds(), // Initial seconds
      currentDate: new Date(), // Store the current date object
    };
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
      // this.currentSeconds = now.getSeconds(); // Update seconds
    },
  },
  mounted() {
    this.timer = setInterval(this.updateTime, 1000); 
  },
  computed: {
    dateFormat() {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
      <div class="text-8xl">{{ currentTime }}</div>
      <!-- <div class="text-4xl ml-2">{{ currentSeconds }}</div> -->
    </div>
    <div class="text-3xl">{{ dateFormat }}</div>
  </div>
</template>