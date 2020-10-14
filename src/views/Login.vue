<template>
  <div class="login">
    <h2 class="title">{{isPage}}</h2>
    <el-form ref="loginForm" :model="form" label-width="80px" :rules="rules">
      
    <el-form-item prop="username" label-width="0">
        <el-input v-model="form.username" placeholder="用户名" clearable ></el-input>
    </el-form-item>
      
    <el-form-item prop="nickname" label-width="0">
        <el-input v-model="form.nickname" placeholder="昵称" clearable v-show="status == 1" ></el-input>
    </el-form-item>
      
    <el-form-item prop="password" label-width="0">
        <el-input v-model="form.password" placeholder="密码" show-password clearable type="password"></el-input>
    </el-form-item>
      
      <el-form-item >
        <el-button type="primary"  @click="onSubmit">{{isSstatus}}</el-button>
        <el-button  @click="toChang">{{isRigiter}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 选择登录
const LOGIN = 0
// 选择注册
const REGISTER = 1

import {mapActions} from 'vuex'
export default {
    data(){
        return{
            form:{
                username: '',
                password: '',
                nickname: '',
            },
            status:LOGIN,
            
        }
    },
    methods: {
        ...mapActions(['onRegisterUser','onLoginUser']),
        onSubmit(){
            this.$refs.loginForm.validate((valid) => {
          if (valid) {
            alert('表单通过!');
            if(this.status == REGISTER){
                this.onRegisterUser(this.form)
                .then((res)=>console.log('成功',res))
                .catch((err)=>console.log('失败',err))
            }else{
                this.onLoginUser(this.form)
                .then(this.loginSuccess)
                .catch((err)=>console.log('登录失败',err))
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
           
        },
        toChang(){
             if(this.status == LOGIN){
                this.status = REGISTER
            }else{
                this.status = LOGIN
            }
        },

        loginSuccess(token){
            //登录成功
            // 将用户名与token保存到location
            // console.log(token,this.form.username)
            let userInfo = {
                username:this.form.username,
                token
            }
            localStorage.setItem('userInfo',JSON.stringify(userInfo))

        }
        
    
    },
    computed: {
        rules(){
            return{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                nickname: [
                    { required: this.status === LOGIN ? false:true, message: '请输入昵称', trigger: 'blur' },
                ]
                
                }
            },
        isSstatus(){
            if(this.status == 0){
                return '立即登录'
            }
            return '立即注册'
        },
        isRigiter(){
            if(this.status == 0){
                return '注册'
            }
            return '去登录'
        },
        isPage(){
            if(this.status == 0){
                return '登录'
            }
            return '注册'
        }
    },
};
</script>

<style lang="scss" scoped>
    .login{
        
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        padding: 0 20px;
        padding-top: 50px;
        background-color: #eee;
        z-index: -2;
        .title{
            text-align: center;
            font-size: 30px;
            margin-bottom: 30px;
        }
    }
</style>