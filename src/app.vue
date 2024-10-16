<template>
    <div>
      <nav>
        <router-link to="/clock">Clock</router-link> <!-- Add a link to the Clock route -->
      </nav>
      <router-view></router-view> <!-- This is where the route components will be displayed -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
  };
  </script>
  
  <style>
  nav {
    margin-bottom: 20px;
  }
  
  router-link {
    margin-right: 10px;
  }
  </style>
  