<template>
  <Menu active-name="" theme="light" :open-names="['']" @on-select="selSubMenu" accordion style="width:240px">
    <Submenu v-for="menu in menuList" :name="menu.label" :key="menu.name">
      <template slot="title">
          <Icon :type="menu.icon"></Icon>
          <span>{{menu.label}}</span>
      </template>
      <MenuItem v-for="menuChild in menu.child" :name="'[{\'label\':\''+menu.label+'\',\'icon\':\''+menu.icon+'\'},{\'label\':\''+menuChild.label+'\',\'icon\':\'\',\'path\':\''+menuChild.path+'\'}]'" :key="menuChild.name">
        <span>{{menuChild.label}}</span>
      </MenuItem>
    </Submenu>
  </Menu>
</template>
<script>
export default {
  name: 'h-menu',
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    selSubMenu (name) {
      this.$emit('on-select', name)
    }
  }
}
</script>
<style>
@import './menu.less';
</style>

