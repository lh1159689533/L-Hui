<template>
  <div id="hello">
    <div style="padding: 15%">
      <el-container>
        <!-- <el-header><span>LiuH</span></el-header>
        <el-main>
          <el-row>
            <el-col :span="6" :offset="9">
              <el-form :model="user" :rules="rules" ref="userForm" label-width="80px" size="small" label-position="top">
                <label :class="showClass.name_label_cls" v-show="info.show_name">用户名</label>
                <el-form-item prop="name">
                  <el-input v-model="user.name" :placeholder="info.plhod_name" @focus="input_name_focus" @blur="input_name_blur" clearable></el-input>
                </el-form-item>
                <el-form-item></el-form-item>
                <label :class="showClass.pass_label_cls" v-show="info.show_pass">密码</label>
                <el-form-item prop="password">
                  <el-input type="password" v-model="user.password" :placeholder="info.plhod_pass" @focus="input_pass_focus" @blur="input_pass_blur" @keyup.enter.native="login('userForm')" clearable></el-input>
                </el-form-item>
                <Icon type="md-arrow-forward" size="24" color="#ffffff" @click="login('userForm')" />
              </el-form>
            </el-col>
          </el-row>
        </el-main> -->
        <Login></Login>
      </el-container>
    </div>
  </div>
</template>
<script>
import Login from './login'
export default {
  name: "Hello",
  components: {
    Login
  }
}
</script>
