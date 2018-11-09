<template>
  <div id="app">
    <div id="canvas">
      <canvas id="cv"></canvas>
    </div>
    <div id="route">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background-image: url('assets/IDR_THEME_NTP_BACKGROUND.png');
  background-color: #b8e5f8;
}
#route {
  height:100%;
}
#canvas {
  position: fixed;
  top: 0;
}
</style>
