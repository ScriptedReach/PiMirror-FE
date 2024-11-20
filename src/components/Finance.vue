<template>
<div class="flex flex-row justify-between">
  <div></div>
  <div class="mt-16 text-3xl text-right">
    <div class="">Bitcoin</div>
    <hr class="h-px my-1 bg-white border-0  opacity-50">
    <div class="text-gray-400">
      <div v-if="btcPrice">
      € {{ btcPrice }}
    </div>
      <p v-else>Loading...</p>
  </div>
    </div>
    
</div>      
  
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      btcPrice: null,
      fetchInterval: null, 
    };
  },
  mounted() {
    this.fetchBTCPrice();

    this.fetchInterval = setInterval(() => {
      this.fetchBTCPrice();
    }, 900000);
  },
  beforeDestroy() {
    clearInterval(this.fetchInterval);
  },
  methods: {
    async fetchBTCPrice() {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur"
        );
        this.btcPrice = response.data.bitcoin.eur;
      } catch (error) {
        console.error("Error fetching BTC price:", error);
        clearInterval(this.fetchInterval);
      }
    },
  },
};
</script>