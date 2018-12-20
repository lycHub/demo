<template>
  <div id="app">
      <Layout class="layout">
        <Header class="header">
          header
        </Header>
        <Layout>
          <Sider hide-trigger class="sider">
            <Menu :active-name="currentPageName" theme="dark" :open-names="['demo']" style="width: 200px;">
              <Submenu v-for="sub in menus" :key="sub.name" :name="sub.name">
                <template slot="title"><Icon :type="sub.icon"></Icon> {{sub.title}}</template>
                <MenuItem v-for="child in sub.children" :key="child.name" :name="child.name" :to="{ name  : child.name }">{{child.title}}</MenuItem>
              </Submenu>
            </Menu>
          </Sider>
          <Content class="content">
            <router-view/>
          </Content>
        </Layout>
      </Layout>
  </div>
</template>
<script>
  export default {
      name: 'App',
      data() {
          return{
              currentPageName: 'refund',
              menus: [{
                  icon: "ios-navigate",
                  title: "DEMO",
                  name: "demo",
                  children: [
                      {
                          title: "到账退款",
                          name: "refund"
                      },
                      {
                          title: "话机映射",
                          name: "phoneMap"
                      }
                  ]
              }]
          }
      },
      created() {
          setTimeout(() => {
              this.currentPageName = this.$route.name;
          }, 500);
      }
  }
</script>
<style lang="less" scoped>
  @import "./assets/styles/variable";
  #app {
    .layout{
      .header{
        position: fixed;
        top:0;
        width: 100%;
        z-index: 1;
        color: @color-white;
      }
      .sider{
        position: fixed;
        left:0;
        top:64px;
        height: 100%;
      }

      .content {
        width: 100%;
        min-width: 1040px;
        background-color: #eee;
        padding: 60px 20px 0 20px;
        margin-left: 200px;
      }
    }
  }
</style>
