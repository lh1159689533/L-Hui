<template>
		<div class="layout">
        <Layout>
            <Header>
              <div class="layout-logo">LiuH</div>
              <div class="layout-nav">
                  
              </div>
            </Header>
            <Layout>
                <Sider hide-trigger style="height:'100%'">
                    <Menu active-name="" theme="light" width="auto" :open-names="['']" @on-select="selSubMenu" accordion>
                      <Submenu v-for="menu in menuDate" :name="menu.label" :key="menu.name">
                        <template slot="title">
                            <Icon :type="menu.icon"></Icon>{{menu.label}}
                        </template>
                        <MenuItem v-for="menuChild in menu.child" :name="'[{\'label\':\''+menu.label+'\',\'icon\':\''+menu.icon+'\'},{\'label\':\''+menuChild.label+'\',\'icon\':\'\'}]'" :key="menuChild.name">{{menuChild.label}}</MenuItem>
                      </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                      <BreadcrumbItem v-for="(item, i) in breadcrumbData" :key="i">
                        <Icon :type="item.icon"></Icon> {{item.label}}
                      </BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
	export default {
		name: 'home',
		data () {
			return {
        defaultBreadcrumb: { label: 'Home', icon: 'ios-home' },
        breadcrumbData: [{ label: 'Home', icon: 'ios-home' }],
				menuDate: [{
          label: '我的小工具',
          name: "",
          icon: 'md-cube',
          child: [
              { label: '子内容1', name: 'q' },
              { label: '子内容2', name: 'w' },
              { label: '子内容3', name: 'e' }
          ]
        },{
            label: '内容2',
            icon: 'ios-keypad',
            child: [
              { label: '之内容1', name: "a" },
              { label: '之内容2', name: "s" }
            ]
          }
        ]
			}
		},
		methods: {
			selSubMenu (name) {
        if (name) {
          name = name.replace(/'/g, "\"")
          this.breadcrumbData = JSON.parse(name)
          this.breadcrumbData.unshift(this.defaultBreadcrumb)
        }
			}
		}
	}
</script>
<style>
.layout{
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
    height:100%;
}
.layout-logo{
    width: 100px;
    height: 30px;
    float: left;
    position: relative;
    left: 20px;
    color: #fff;
    font-size: 30px;
    letter-spacing: 5px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.ivu-menu-light {
  height: 100% !important;
  text-align: left;
  /* background: #001529; */
}
.ivu-layout {
  height: 100% !important;
}
.ivu-breadcrumb > span {
  float: left;
}
</style>
