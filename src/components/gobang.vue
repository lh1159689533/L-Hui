<template>
  <div id="gobang">
    <canvas id="chess" width="450px" height="450px"></canvas>
    <HDrawer :drawer-data="drawerinfo">
      <!-- <Anchor show-ink>
        <AnchorLink title="每逢佳节胖三斤" />
      </Anchor>
      <Anchor show-ink>
        <AnchorLink title="胖三斤兮来减肥" />
      </Anchor>
      <Anchor show-ink>
        <AnchorLink title="减着减着又佳节" />
      </Anchor> -->
    </HDrawer>
    <div id="rank-gobang"><Button type="info" ghost @click="rank">历程</Button></div>
  </div>
</template>
<script>
  import gobang from './gobang/index'
  import HDrawer from './HDrawer'
  export default {
    name: 'gobang',
    components: {
      HDrawer
    },
    data () {
      return {
        drawerinfo: {
          isopen: false,
          title: "五子棋人机大战之传说"
        },
        el: null
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
    top: 6.8%
  }
  .ivu-drawer-mask {
    top: 6.8%;
  }
  .ivu-anchor-link-title {
    line-height: 18px;
    letter-spacing: 1px;
    white-space: inherit;
  }
</style>


