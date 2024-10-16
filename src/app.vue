<script>
  import TimeAndDate from './components/TimeAndDate.vue';
  import Weather from './components/Weather.vue' 
  export default {
    name: 'App',
    components:{
      TimeAndDate,
      Weather,
    }
  };
  </script>
  
  <template class="bg-red">
    <div class="text-white w-11/12 mx-auto mt-10">

      <div class="flex flex-row justify-between">
        <TimeAndDate />
      <Weather />
      </div>
      
    </div>
  </template>