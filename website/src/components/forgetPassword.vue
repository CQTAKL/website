<template>
    <div id="register">
        <alertWindow :alert_isShow="alert_isShow" :messageContent="messageContent" @close="close"></alertWindow>
        <div class="logo"></div>
        <form action="">
            <h2>修改密码</h2>
            <li class="accord">
                <input type="text" placeholder="请输入邮箱" v-model="accord" onpaste="return false" oncopy="return false" oncut="return false" oncontextmenu="return false">
                <i>{{accordError}}</i>
            </li>
            <li class="password">
                <input :type="passwordEyeShow?'text':'password'" placeholder="请输入密码" v-model="password" onpaste="return false" oncopy="return false" oncut="return false" oncontextmenu="return false" autocomplete="off">
                <i>{{passwordError}}</i>
                <!-- 眼睛 -->
                <div class="eye iconfont" :class="{'icon-biyanjing-mianxing3-0': !passwordEyeShow, 'icon-yanjing-': passwordEyeShow}" @click="passwordEyeChange(1)"></div>
            </li>
            <li class="password">
                <input :type="rePasswordEyeShow?'text':'password'" placeholder="请再次输入密码" v-model="rePassword" onpaste="return false" oncopy="return false" oncut="return false" oncontextmenu="return false" autocomplete="off">
                <i>{{rePasswordError}}</i>
                <!-- 眼睛 -->
                <div class="eye iconfont" :class="{'icon-biyanjing-mianxing3-0': !rePasswordEyeShow, 'icon-yanjing-': rePasswordEyeShow}" @click="passwordEyeChange(2)"></div>
            </li>
            <li class="verification">
                <input type="text" class="verificInput" placeholder="请输入验证码" v-model="verification" onpaste="return false" oncopy="return false" oncut="return false" oncontextmenu="return false"><button class="verificGet" type="button" @click="getVerification">{{getVerificationText}}</button>
            <i>{{verificationError}}</i>
            </li>
            <!-- <li class="wordline">
                <span class="rember" @click="readChange"><span class="iconfont" :class="{'icon-checkbox-uncheck':!isRead, 'icon-CheckboxChecked-1':isRead}"></span>我已经阅读并同意 <span style="color: rgb(0 255 220)" @click="userAgreement">用户协议</span></span>
            </li> -->
            <button id="commit"  type="button" @click="resetPassword">修改<span>&#xeb03;</span></button>

            <li class="wordline">
                <span class="returnLogin" @click="returnLogin">已有账号，返回 <span style="color: rgb(0 255 220)">登录</span></span><a class="question">常见问题?</a>
            </li>
        </form>
    </div>
</template>
<script>
import alertWindow from "./childComp/alertWindow.vue";
import {get, post} from "@/assets/js/myAxios.js";
import {passwordStrength, isMail, isInjection, isNumber} from "@/assets/js/common.js";
export default ({
    name: 'register',
    components: {
        alertWindow
    },
    data(){
        return {
            // 弹窗是否显示
            alert_isShow: false,
            // 弹窗内容
            messageContent: "验证码长度需为4位",
            // 密码的眼睛显示
            passwordEyeShow: false,
            // 确认密码的眼睛显示
            rePasswordEyeShow: false,
            // 账号输入
            accord: '',
            // 账号错误信息输出
            accordError: "",
            // 密码输入
            password: '',
            // 密码错误信息输出
            passwordError: '',
            // 再次输入密码
            rePassword: '',
            // 再次输入密码错误信息输入
            rePasswordError: '',
            // 验证码输入
            verification: '',
            // 验证码错误信息输入
            verificationError: '',
            // 验证码倒计时
            getVerificationText: "获取",
            // 错误显示延时
            delayTime: 1000,
        }
    },
    methods: {
        // 返回登录
        returnLogin(){
            this.$router.push('/login');
        },

        // 密码隐藏可见
        passwordEyeChange(choice){
            if(choice === 1){
                // 从可见变不可见
                if(this.passwordEyeChange == true){
                    this.passwordType = "text";
                }else{
                    this.passwordType = "password";
                }
                this.passwordEyeShow = !this.passwordEyeShow;
            }
            else if(choice === 2){
                // 从可见变不可见
                if(this.rePasswordEyeChange == true){
                    this.rePasswordType = "text";
                }else{
                    this.rePasswordType = "password";
                }
                this.rePasswordEyeShow = !this.rePasswordEyeShow;
            }
            
            
        },

        // 记住我修改
        remberMeChange(){
            this.remberMe = !this.remberMe;
        },

        // 关闭弹窗
        close(){
            this.alert_isShow = false;  
        },

        // 点击
        getVerification(){
            let time = 61;
            if(this.getVerificationText === "获取"){
                post('/info/emailCode', {

                "email": this.accord,

            }).then(res => { // 请求成功
                // console.log(res);
                const {code, msg} = res;
                // 弹窗提示
                // this.alert_isShow = true;
                // this.messageContent = msg;
                alert(msg);

                if(code === "200"){
                    let timer = setInterval(()=>{
                        time--;
                        this.getVerificationText = "获取 (" + time + ")";
                        if(time === 0){
                            clearInterval(timer);
                            this.getVerificationText = "获取";
                        }
                    }, 1000);
                }

            });
                
            }
        },

        // 注册
        resetPassword(){
            // 账号输入为空
            if(this.accord.trim() == ''){
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

            // 再次输入密码输入为空
            if(this.rePassword.trim() == ""){
                this.rePasswordError  = "输入不能为空";
                let timer = setTimeout(()=>{this.rePasswordError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 验证码输入为空
            if(this.verification.trim() == ""){
                this.verificationError = "输入不能为空";
                let timer = setTimeout(()=>{this.verificationError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 判断账号
            if(!isMail(this.accord)){
                this.accordError = "邮箱格式输入错误";
                let timer = setTimeout(()=>{this.accordError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 判断账号是否有sql注入
            if(isInjection(this.accord)){
                this.accordError = "存在非法字符";
                let timer = setTimeout(()=>{this.accordError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 判断密码强度（包含sql）
            const [res, message] = passwordStrength(this.password);
            if(res === false){
                this.passwordError = message;
                let timer = setTimeout(()=>{this.passwordError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 判断密码是否和确认密码一致
            if(this.password !== this.rePassword){
                this.rePasswordError = "两次输入密码不一致";
                let timer = setTimeout(()=>{this.rePasswordError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 判断验证码长度是否为6位
            if (this.verification.length !== 6) {
                this.verificationError = "图形验证码长度需为6位";
                let timer = setTimeout(()=>{this.verificationError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 判断验证码是否为数字
            if (!isNumber(this.verification)) {
                this.verificationError = "验证码需为数字";
                let timer = setTimeout(()=>{this.verificationError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            post('/user/forgetPwd', {

                "email": this.accord,
                "newPwd": this.password,
                "code": this.verification // 纯数字

            }).then(res => { // 请求成功
                // console.log(res);
                const {code, msg} = res;

                // 弹窗提示
                // this.alert_isShow = true;
                // this.messageContent = msg;
                alert(msg);

                if(code === "200"){
                    let timer = setTimeout(()=>{
                        clearTimeout(timer);
                        this.$router.push({name:'login'});
                    }, 3000);
                }
            })
        }
    },
    mounted(){

    }
})
</script>
<style>
    @import '../assets/css/login.css';
    #register {
        min-height: 100vh;
        background: url('https://uploadfile.bizhizu.cn/up/45/b1/05/45b105d5a2b7de1c464330493dc86170.jpg.source.jpg') no-repeat;
        /* background: url('https://bpic.588ku.com/back_pic/05/99/60/865f6621217a0c7.jpg'); */
        background-size: cover;
        /* background: linear-gradient(to bottom right,#b9e7fc,#16b2ff); */
        font-size: 0;
    }
</style>
