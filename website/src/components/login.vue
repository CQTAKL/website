<template>
    <div id="login">
        <alertWindow :alert_isShow="alert_isShow" :messageContent="messageContent" @close="close"></alertWindow>
        <div class="logo"></div>
        <form action="" id="form_login">
            <h2>欢迎登录</h2>
            <li class="accord">
                <input type="text" placeholder="请输入邮箱" v-model="accordValue" onpaste="return false" oncopy="return false" oncut="return false" oncontextmenu="return false">
                <i>{{accordError}}</i>
            </li>
            <li class="password">
                <input :type="passwordEyeShow?'text':'password'" placeholder="请输入密码" v-model="password" onpaste="return false" oncopy="return false" oncut="return false" oncontextmenu="return false" autocomplete="off">
                <i>{{passwordError}}</i>
                <!-- 眼睛 -->
                <div class="eye iconfont" :class="{'icon-biyanjing-mianxing3-0': !passwordEyeShow, 'icon-yanjing-': passwordEyeShow}" @click="passwordEyeChange"></div>
            </li>
            <li class="verification">
                <input type="text" class="verificInput" placeholder="请输入验证码" v-model="verification" onpaste="return false" oncopy="return false" oncut="return false" oncontextmenu="return false"><img class="verificImg" :src="verificationSrc"><button class="verificChange" @click="changeVerification" type="button">换一张</button>
            <i>{{verificationError}}</i>
            </li>
            <li class="wordline">
                <span class="rember" @click="remberChange"><span class="iconfont" :class="{'icon-checkbox-uncheck':!isRember, 'icon-CheckboxChecked-1':isRember}"></span>记住我</span><a class="lostPassword" @click="forgetPassword">忘记密码</a>
            </li>
            <button id="commit"  type="button" @click="login">登录<span>&#xeb03;</span></button>
            <li class="wordline">
                <span class="returnRegister" @click="returnRegister">没有账号，去 <span style="color: rgb(0 255 220)">注册</span></span>
            </li>
            <!-- <span class="tips">提示文字</span> -->
        </form>
    </div>
</template>
<script>
import alertWindow from "./childComp/alertWindow.vue";
import {get, post} from "@/assets/js/myAxios.js"
import {isPhoneNumber, isMail, isInjection, isNumberOrLetter, debounce} from "@/assets/js/common.js";
export default({
    name: "login",
    components: {
        alertWindow
    },
    mounted(){
            this.changeVerification();
    },
    data(){
        return {
            // 密码的眼睛显示
            passwordEyeShow: false,
            // 记住我
            isRember: true,
            // 账号输入
            accordValue: '',
            // 账号错误信息输出
            accordError: " ",
            // 密码输入
            password: '',
            // 密码错误信息输出
            passwordError: ' ',
            // 验证码输入
            verification: '',
            // 验证码错误信息输入
            verificationError: '',
            // 验证码图片地址
            verificationSrc: '',
            // 错误显示延时
            delayTime: 1000,
            // 弹窗是否显示
            alert_isShow: false,
            // 弹窗内容
            messageContent: "验证码长度需为4位",
            // 账号类型
            textId: null,
        }
    },
    methods:{
        
        // 换一张验证码图片
        changeVerification(){
            get('/user/captcha').then(res=> {
                if(res.code === "200"){
                    this.verificationSrc = 'data:image/jpg;base64,' + res.data.captcha;
                }
            });
        },

        // 账号类型判断 1代表手机号，2代表邮箱，3代表真实姓名
        accountType(){
            if(isPhoneNumber(this.accordValue)) {
                this.textId = 1;
            }
            else if(isMail(this.accordValue)) {
                this.textId = 2;
            }else{
                this.textId = 3;
            }
        },

        // 登录按钮点击
        login(){
            // 账号输入为空
            if(this.accordValue.trim() == ''){
                this.accordError = "输入不能为空";
                let timer = setTimeout(()=>{this.accordError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }
            // 密码输入为空
            if(this.password.trim() == ""){
                this.passwordError  = "输入不能为空";
                let timer = setTimeout(()=>{this.passwordError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 验证码输入为空
            if(this.verification.trim() == ""){
                this.verificationError = "输入不能为空";
                let timer = setTimeout(()=>{this.verificationError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }
            
            // 判断账号是否有sql注入
            if (isInjection(this.accordValue)) {
                this.accordError  = "账号中含有非法字符"
                let timer = setTimeout(()=>{this.accordError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 判断密码是否有sql注入
            if (isInjection(this.password)) {
                this.passwordError  = "密码中含有非法字符"
                let timer = setTimeout(()=>{this.passwordError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 判断验证码长度是否为4位
            if (this.verification.length !== 4) {
                this.verificationError = "图形验证码长度需为4位";
                let timer = setTimeout(()=>{this.verificationError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }
            
            // 判断验证码是否为数字和字母
            if (!isNumberOrLetter(this.verification)) {
                this.verificationError = "验证码需为数字和字母";
                let timer = setTimeout(()=>{this.verificationError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 判断账号输入类型 
            this.accountType();

            // 发送请求
            post('/user/login', {

                "textId": 2,
                "userText": this.accordValue,
                "password": this.password,
                "verificationCode": this.verification,
                "rememberMe": this.isRember

            }).then(res => { // 请求成功

                console.log(res);
                const {code, msg, data} = res;
                // 弹窗提示
                this.alert_isShow = true;
                this.messageContent = msg;

                if(code === "200"){
                    // 设置一个cookie
                    this.$cookies.set("Authorization",data.userId + "_" + data.loginTicket,data.expiredTime);

                    let timer = setTimeout(()=>{
                        clearTimeout(timer);
                        this.$router.push({name:'index'});
                    }, 3000);
                    
                }
                
            })
        },

        // 去注册 
        returnRegister(){
            this.$router.push('/register');
        },

        // 忘记密码
        forgetPassword(){
            this.$router.push('/forgetPassword');
        },

        // 记住我
        remberChange(){
            this.isRember = !this.isRember;
        },

        // 密码隐藏可见
        passwordEyeChange(){
            // 从可见变不可见
            if(this.passwordEyeChange == true){
                this.passwordType = "text";
            }else{
                this.passwordType = "password";
            }
            this.passwordEyeShow = !this.passwordEyeShow;
        },

        // 记住我修改
        remberMeChange(){
            this.remberMe = !this.remberMe;
        },

        // 关闭弹窗
        close(){
            this.alert_isShow = false;  
        },
    }
})
</script>
<style>
    @import "../assets/css/login.css";
    #login {
        min-height: 100vh;
        background: url('https://uploadfile.bizhizu.cn/up/45/b1/05/45b105d5a2b7de1c464330493dc86170.jpg.source.jpg') no-repeat;
        background-size: cover;
        /* background: linear-gradient(to bottom right,#b9e7fc,#16b2ff); */
        font-size: 0;
    }
</style>
