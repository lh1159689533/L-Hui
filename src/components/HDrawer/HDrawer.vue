<!--
 - 自定义抽屉组件，可拖拽改变其宽度
 - @author hui.li
 - @date 2018-12-14
 - @version 1.0
-->
<template>
  <Drawer v-model="drawerData.isopen" :title="drawerData.title" :closable="false">
    <div id="Drag" class="drag"></div>
    <slot></slot>
  </Drawer>
</template>
<script>
  export default {
    name: 'HDrawer',
    props: {
      mode: {
        type: String
      },
      drawerData: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        elId: 'Drag'
      }
    },
    mounted: function() {
      this.init(document.getElementsByClassName('ivu-drawer')[0])
    },
    methods: {
      init(elrg) {
        let el = document.getElementById(this.elId)
        $(el).mousedown((e) => {
          el.setCapture ? (
            el.setCapture(),
            el.onmousemove = function(ev) {
              mouseMove(ev || event)
            }
          ) : (
            $(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp)
          )
          e.preventDefault()
        })

        function mouseMove (e) {
          elrg.style.width = document.body.clientWidth - e.clientX + 'px'
        }
        function mouseUp () {
          el.releaseCapture ? (
            el.releaseCapture(),
            el.onmousemove = el.onmouseup = null
          ) : (
            $(document).unbind("mousemove", mouseMove).bind("mouseup", mouseUp)
          )
        }
      }
    }
  }
</script>
<style>
  @import './HDrawer.less'
</style>
