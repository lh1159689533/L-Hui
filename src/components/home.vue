<template>
		<div id="home">
        <Layout>
            <Header>
              <div class="layout-logo">
                <img src="../assets/LiuH-y.png" style="padding: 10px 0 0 0;float: left;" />
                <span style="padding: 0 45px 0 0;">LiuH</span>
              </div>
              <div class="layout-nav">
                <Dropdown style="float: right;" @on-click="oprate">
                  <a href="javascript:void(0)"> 
                    <Badge :dot="unreadInfo">
                      <Avatar src="http://localhost:8888/static/Artboard.png" />
                    </Badge>
                    <Icon type="md-arrow-dropdown" />
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem name="message"><Icon type="md-notifications"/> 消息中心</DropdownItem>
                    <DropdownItem name="logout"><Icon type="md-log-out"/> 退出登录</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </Header>
            <Layout>
              <Sider collapsible :collapsed-width="78" style="height:'100%'" v-model="isCollapsed" width="240">
                <Hmenu :menu-list="menuDate" @on-select="selMenu" :class="menuitemClasses"></Hmenu>
              </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                      <BreadcrumbItem v-for="(item, i) in breadcrumbData" :key="i">
                        <Icon :type="item.icon"></Icon> {{item.label}}
                      </BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff', height: '100%'}">
                      <router-view/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
  import router from '../router/index'
  import storage from '../localStorage'
  import Hmenu from './HMenu'
	export default {
    name: 'home',
    components: {
      Hmenu
    },
		data () {
			return {
        isCollapsed: false,
        unreadInfo: true,
        currentUser: {},
        defaultBreadcrumb: { label: 'Home', icon: 'ios-home' },
        breadcrumbData: [{ label: 'Home', icon: 'ios-home' }],
				menuDate: [{
          label: '我的小工具',
          name: "",
          icon: 'md-cube',
          child: [
              { label: '子内容1', name: 'q', path: '' },
              { label: '子内容2', name: 'w', path: '' },
              { label: '子内容3', name: 'e', path: '' }
          ]
        },{
            label: '我的小游戏',
            icon: 'ios-game-controller-b',
            child: [
              { label: '五子棋', name: 'a', path: 'golang' },
              { label: '2048', name: 's', path: '2048' }
            ]
          }
        ]
			}
		},
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
    mounted: function() {
      // this.init()
    },
		methods: {
      init () {
        let user = storage.get("user")
        if (user) {
          this.currentUser = user
        } else {
          this.$notify({
            title: '-_- 请重新登录 ',
            type: 'error',
            position: 'bottom-right'
          })
          router.push({path: '/'})
        }
      },
			selMenu (name) {
        if (name) {
          name = name.replace(/'/g, "\"")
          this.breadcrumbData = JSON.parse(name)
          this.breadcrumbData.unshift(this.defaultBreadcrumb)
          let len = this.breadcrumbData.length
          let path = this.breadcrumbData[len-1].path
          if (path && path != 'undefined' && path != undefined) {
            router.push({path: '/'+path})
          }
        }
      },
      oprate (name) {
        if (!name) {
          return;
        }
        if (name === "logout") {
          storage.remove("user")
          router.push({path: '/'})
        } else if (name === "message") {
          console.log(name)
        }
      }
		}
	}
</script>
<style>
  #home {
      background: #f5f7f9;
      position: relative;
      overflow: hidden;
      height:100%;
  }
  #home .layout-logo{
      width: 200px;
      height: 50px;
      float: left;
      color: #fff;
      font-size: 30px;
      letter-spacing: 5px;
  }
  #home .layout-nav{
      width: 420px;
      margin: 0 auto;
      margin-right: 20px;
  }
  #home .ivu-layout {
    height: 100% !important;
  }
  #home .ivu-breadcrumb > span {
    float: left;
  }
  #home a {
    color: #fff !important;
  }
  #home .ivu-badge-dot {
    top: 16px;
  }
</style>
