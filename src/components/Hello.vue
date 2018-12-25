<template>
  <div id="hello">
    <el-container style="height:100%">
      <HMain></HMain>
    </el-container>
  </div>
</template>
<script>
import HMain from './main'
import snow from './snow/index'
import cherry from './cherry/index'
export default {
  name: "Hello",
  components: {
    HMain
  },
  mounted: function() {
    this.init()
  },
  methods: {
    init () {
      let n = Math.random() * 10
      if (n < 5) {
        cherry.init(document.getElementById('cv'))
      } else {
        snow.init(document.getElementById('cv'))
      }
    }
  }
}
</script>
<style>
#hello {
  height: 100%;
}
</style>
