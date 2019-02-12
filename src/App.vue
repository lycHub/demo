<template>
  <div id="app">
      <Layout class="layout">
        <Header class="header">
          当前登陆：
          <Dropdown trigger="click" @on-click="showModal = true;">
            <span>
              {{userInfo.name}}
              <Icon type="ios-arrow-down"></Icon>
            </span>
            <DropdownMenu slot="list">
              <DropdownItem>修改信息</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Header>
        <Layout>
          <Sider hide-trigger class="sider">
            <Menu :active-name="$route.name" theme="dark" :open-names="['demo']" style="width: 200px;">
              <Submenu v-for="sub in menus" :key="sub.name" :name="sub.name">
                <template slot="title"><Icon :type="sub.icon"></Icon> {{sub.title}}</template>
                <MenuItem v-for="child in sub.children" :key="child.name" :name="child.name" :to="{ name  : child.name }">{{child.title}}</MenuItem>
              </Submenu>
            </Menu>
          </Sider>
          <Content class="content">
            <div class="bread" v-show="$route.meta.breadcrumb">
              <Breadcrumb separator="&gt;">
                <BreadcrumbItem :to="item.to" v-for="item in $route.meta.breadcrumb" :key="item.label">{{item.label}}</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <router-view />
          </Content>
        </Layout>
      </Layout>


    <Modal v-model="showModal" title="修改信息" @on-ok="edit">
      <Form :model="userInfo" :label-width="80">
        <FormItem label="姓名">
          <i-Input v-model="userInfo.name" ></i-Input>
        </FormItem>
        <FormItem label="年龄">
          <i-Input v-model="userInfo.age" ></i-Input>
        </FormItem>
        <FormItem label="电话">
          <i-Input v-model="userInfo.tel" ></i-Input>
        </FormItem>
        <FormItem label="email">
          <i-Input v-model="userInfo.email" ></i-Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
    import { mapGetters, mapMutations } from 'vuex';
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
                      },
                      {
                          title: "other",
                          name: "other"
                      }
                  ]
              }],
              userInfo: {},
              showModal: false
          }
      },
      created() {
          this.userInfo = this.user;
      },

      computed: mapGetters(['user']),  // 语法糖，相当于this.user = this.$store.state.user

      methods: {
          edit() {
              this.editInfo(this.userInfo);
          },
          ...mapMutations({
              editInfo: 'SET_USERINFO'
          })
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
        background-color: @color-blue;
      }
      .sider{
        position: fixed;
        left:0;
        top:64px;
        height: 100%;
      }

      .content {
        width: calc(100% - 200px);
        min-width: 1040px;
        background-color: #eee;
        padding: 60px 20px 0 20px;
        margin-left: 200px;
        .bread{
          padding: 18px;
        }
      }
    }
  }
</style>
