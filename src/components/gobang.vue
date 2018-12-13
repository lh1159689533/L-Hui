<template>
  <div id="gobang">
    <canvas id="chess" width="450px" height="450px"></canvas>
    <Drawer v-model="drawerinfo.isopen" :title="drawerinfo.title" :closable="false">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Drawer>
    <div id="rank-gobang"><Button type="info" ghost @click="rank">历程</Button></div>
  </div>
</template>
<script>
  import gobang from './gobang/index'
  export default {
    name: 'gobang',
    data () {
      return {
        drawerinfo: {
          isopen: false,
          title: "您的五子棋人机大战之旅"
        }
      }
    },
    mounted: function() {
      gobang.init(document.getElementById('chess'))
    },
    methods: {
      rank () {
        this.drawerinfo.isopen = true
      }
    }
  }
</script>
<style>
  #gobang {
    height: 100%;
  }
  #rank-gobang {
    position: absolute;
    bottom: 30px;
    right: 50px;
    float: right;
  }
  .el-message {
    left: 58% !important;
    top: 65px !important;
  }
  .ivu-drawer {
    width: 396px !important;
    top: 6.8%
  }
  .ivu-drawer-mask {
    top: 6.8%;
  }
</style>


