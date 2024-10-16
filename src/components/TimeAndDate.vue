<template>
  <div class="flex flex-row">
    <div class="text-8xl">{{ currentTime }}</div>
    <div class="text-3xl">{{ currentSeconds }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      currentSeconds: new Date().getSeconds(), // Initial seconds
    };
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
      this.currentSeconds = now.getSeconds(); // Update seconds
    },
  },
  mounted() {
    this.timer = setInterval(this.updateTime, 1000); 
  },
};
</script>