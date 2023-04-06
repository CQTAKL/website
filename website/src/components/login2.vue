<template>
    <div id="register">
        <alertWindow :alert_isShow="alert_isShow" :messageContent="messageContent" @close="close"></alertWindow>
        <div class="logo"></div>
        <form action="">
            <h2>欢迎登录</h2>
            <li class="accord">
                <input type="text" placeholder="请输入邮箱" v-model="accord" onpaste="return false" oncopy="return false" oncut="return false" oncontextmenu="return false">
                <i>{{accordError}}</i>
            </li>
            <li class="verification">
                <input type="text" class="verificInput" placeholder="请输入验证码" v-model="verification" onpaste="return false" oncopy="return false" oncut="return false" oncontextmenu="return false"><button class="verificGet" type="button" @click="getVerification">{{getVerificationText}}</button>
            <i>{{verificationError}}</i>
            </li>
            <li class="verification">
                <input type="text" class="verificInput" placeholder="请输入验证码" v-model="verification2" onpaste="return false" oncopy="return false" oncut="return false" oncontextmenu="return false"><img class="verificImg" :src="verificationSrc"><button class="verificChange" @click="changeVerification" type="button">换一张</button>
            <i>{{verification2Error}}</i>
            </li>
            <li class="wordline">
                <span class="rember" @click="remberChange"><span class="iconfont" :class="{'icon-checkbox-uncheck':!isRember, 'icon-CheckboxChecked-1':isRember}"></span>记住我</span><a href="" class="lostPassword">忘记密码</a>
            </li>
            <button id="commit"  type="button" @click="login">登录<span>&#xeb03;</span></button>
            <li class="wordline">
                <span class="returnRegister" @click="returnRegister">没有账号，去 <span style="color: rgb(0 255 220)">注册</span></span>
            </li>
        </form>
    </div>
</template>
<script>
import alertWindow from "./childComp/alertWindow.vue";
import {get, post} from "@/assets/js/myAxios.js";
import {passwordStrength, isMail, isInjection, isNumberOrLetter} from "@/assets/js/common.js";
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
            // 记住我
            isRember: true,
            // 账号输入
            accord: '',
            // 账号错误信息输出
            accordError: "",
            // 验证码图片地址
            verificationSrc: '',
            // 验证码输入
            verification: '',
            // 2验证码错误信息输入
            verificationError: '',
            // 2验证码输入
            verification2: '',
            // 验证码错误信息输入
            verification2Error: '',
            // 验证码倒计时
            getVerificationText: "获取",
            // 错误显示延时
            delayTime: 1000,
        }
    },
    methods: {
        // 换一张验证码图片
        changeVerification(){
            get('/user/captcha').then(res => {
                if(res.code === "200"){
                    this.verificationSrc = 'data:image/jpg;base64,' + res.data.data.captcha;
                }
            });
        },

        // 点击
        getVerification(){
            let time = 61;
            if(this.getVerificationText === "获取"){
                post('/user/emailCode', {

                "email": this.accord,

            }).then(res => { // 请求成功
                // console.log(res);
                const {code, msg} = res;
                // 弹窗提示
                this.alert_isShow = true;
                this.messageContent = msg;

                if(code === "200"){
                    this.alert_isShow = true;
                    this.messageContent = "验证码已经发送至您的邮箱，请查收";
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

        // 登录按钮点击
        login(){
            // 账号输入为空
            if(this.accord.trim() == ''){
                this.accordError = "输入不能为空";
                let timer = setTimeout(()=>{this.accordError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 验证码输入为空
            if(this.verification.trim() == ""){
                this.verificationError = "输入不能为空";
                let timer = setTimeout(()=>{this.verificationError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 验证码2输入为空
            if(this.verification2.trim() == ""){
                this.verification2Error = "输入不能为空";
                let timer = setTimeout(()=>{this.verification2Error  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }
            
            // 判断账号是否有sql注入
            if (isInjection(this.accord)) {
                this.accordError  = "账号中含有非法字符"
                let timer = setTimeout(()=>{this.accordError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 判断验证码长度是否为4位
            if (this.verification.length !== 6) {
                this.verificationError = "验证码长度需为6位";
                let timer = setTimeout(()=>{this.verificationError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }
            
            // 判断验证码是否为数字和字母
            if (!isNumberOrLetter(this.verification)) {
                this.verificationError = "验证码需为数字和字母";
                let timer = setTimeout(()=>{this.verificationError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 判断验证码长度是否为4位
            if (this.verification2.length !== 4) {
                this.verification2Error = "图形验证码长度需为4位";
                let timer = setTimeout(()=>{this.verification2Error  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }
            
            // 判断验证码是否为数字和字母
            if (!isNumberOrLetter(this.verification2)) {
                this.verification2Error = "验证码需为数字和字母";
                let timer = setTimeout(()=>{this.verification2Error  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 发送请求
            return;
            this.$axios.post('http://localhost:3000/user/login', {

                "textId": 2,
                "utext": this.accord,
                "password": this.password,
                "verificationCode": this.verification,
                "rememberMe": this.isRember

            }).then(res => { // 请求成功

                console.log(res.data);
                const {code, msg} = res.data;

                // 设置一个cookie 1天
                // this.$cookies.set("token","123456",60 * 60 * 24)
                
                if(code === "200"){
                    // 弹窗提示
                    this.alert_isShow = true;
                    this.messageContent = msg;
                    let timer = setTimeout(()=>{
                        clearTimeout(timer);
                        this.$router.push({name:'index'});
                    }, 3000);
                    
                }else{
                    // 弹窗提示
                    this.alert_isShow = true;
                    this.messageContent = msg;
                }
                

            }).catch(function (error) { // 请求失败
                // 弹窗提示
                this.alert_isShow = true;
                this.messageContent = "出错了，请再次尝试";
                console.log(error);
            })
        },

        // 去注册 
        returnRegister(){
            this.$router.push('/register');
        },

        // 记住我
        remberChange(){
            this.isRember = !this.isRember;
        },

        // 关闭弹窗
        close(){
            this.alert_isShow = false;  
        },



    },
    mounted(){
        this.changeVerification();
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
