<template>
  <div id="gobang">
    <canvas id="chess" width="450px" height="450px"></canvas>
  </div>
</template>
<script>
  import gobang from './gobang/index'
  export default {
    name: 'gobang',
    mounted: function() {
      gobang.init(document.getElementById('chess'))
    }
  }
</script>

