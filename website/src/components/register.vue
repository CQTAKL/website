<template>
    <div id="register">
        <alertWindow :alert_isShow="alert_isShow" :messageContent="messageContent" @close="close"></alertWindow>
        <div class="logo"></div>
        <form action="">
            <h2>欢迎注册</h2>
            <li class="accord">
                <input type="text" placeholder="请输入邮箱" v-model="accordValue" onpaste="return false" oncopy="return false" oncut="return false" oncontextmenu="return false">
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
                <input type="text" class="verificInput" placeholder="请输入验证码" v-model="verification" onpaste="return false" oncopy="return false" oncut="return false" oncontextmenu="return false"><button class="verificGet" type="button">获取</button>
            <i>{{passwordError}}</i>
            </li>
            <li class="wordline">
                <span class="rember" @click="readChange"><span class="iconfont" :class="{'icon-checkbox-uncheck':!isRead, 'icon-CheckboxChecked-1':isRead}"></span>我已经阅读并同意 <span style="color: rgb(0 255 220)" @click="userAgreement">用户协议</span></span>
            </li>
            <button id="commit"  type="button" @click="register">注册<span>&#xeb03;</span></button>

            <li class="wordline">
                <span class="returnLogin" @click="returnLogin">已有账号，返回 <span style="color: rgb(0 255 220)">登录</span></span><a class="question">遇到问题?</a>
            </li>
        </form>
    </div>
</template>
<script>
import alertWindow from "./childComp/alertWindow.vue";
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
            // 记住我
            isRead: true,
            // 账号输入
            accordValue: '',
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
            // 错误显示延时
            delayTime: 1000,
        }
    },
    methods: {
        // 返回登录
        returnLogin(){
            this.$router.push('/login');
        },

        // 用户协议
        userAgreement(){
            console.log('用户协议');
        },

        // 记住我
        readChange(){
            this.isRead = !this.isRead;
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

        // 注册
        register(){

        }
    },
    mounted(){
        return;
        const judgeFunc = [];
        // 判断字符串是否包含数字
        judgeFunc[0] = function(str){
            let reg=/\d/;
            return reg.test(str);
        }

        // 判断字符串是否包含大写字母
        judgeFunc[1] = function(str){
            let reg = /[A-Z]+/g;
            return reg.test(str);
        }

        // 判断字符串是否包含小写字母
        judgeFunc[2] = function(str){
            let reg = /[a-z]+/g;
            return reg.test(str);
        }

        // 判断字符串是否包含这六个特殊字符
        judgeFunc[3] = function(str){
            let reg = /[!@#$%^&*_]+/g;
            return reg.test(str);
        }

        // 判断字符串是否只包含这些字符，比如还有空格就需要提示禁止输入
        judgeFunc[4] = function(str){
            let reg = /[^0-9a-zA-Z!@#$%^&*_]+/g;
            return reg.test(str); //false为没问题
        }

        //获取对象
        let doc = document;
        let accord = doc.getElementById('accord');
        let password = doc.getElementById('password');
        let r_password = doc.getElementById('r_password');
        let commit = doc.getElementById('commit');
        let verification = doc.getElementById('verification');

        //qq和微信跳转
        // let qq = doc.querySelector('#qq');
        // let  weixin = doc.querySelector('#weixin');


        //点击获取验证码
        let get_verification = doc.getElementById('get_verification');
        let messageBox = doc.querySelector('.alert');
        let message = doc.querySelector('.alert .content');

        get_verification.addEventListener('click',function(){  //鼠标按下事件 显示弹窗提示,之后倒计时
            if(get_verification.innerHTML == "获取")
            {
                message.innerHTML = "验证码已经发送至您的邮箱，请查收";
                messageBox.classList.add('alert_move');

                //60秒倒计时
                let time = 60;
                let timer = setInterval(function(
                ){
                    if(time==60){
                        get_verification.style.backgroundColor = "rgba(128,128,128,0.2)";
                        get_verification.style.color = 'rgb(144, 147, 178)';
                    }
                    get_verification.innerHTML = time + "秒";
                    time--;
                    if(time==-1){
                        clearInterval(timer);
                        get_verification.innerHTML = "获取";
                        get_verification.style.backgroundColor = "#fff";
                        get_verification.style.color = 'black';
                    }
                },1000);
            }
            else{
                // message.innerHTML = "请稍后再试";
                // messageBox.classList.add('alert_move');
                
            }    
        });

        //点叉叉关闭弹窗
        let X = document.querySelector('.alert li');
        X.onclick = function(){
            messageBox.classList.remove('alert_move');
        }

        //眼睛显示密码
        let flag1 = 0;//表示关闭，密码不可见
        let eye1 = document.querySelector('form .eye1');
        eye1.onclick = function(){
            if(flag1 == 0){
                eye1.innerHTML = '&#xe61c'; //显示密码
                password.type = 'text';
                flag1 = 1;
            }else{
                eye1.innerHTML = '&#xe6a8';//隐藏
                password.type = 'password';
                flag1 = 0;
            }
        }
        let flag2 = 0;//表示关闭，密码不可见
        let eye2 = document.querySelector('form .eye2');
        eye2.onclick = function(){
            if(flag2 == 0){
                eye2.innerHTML = '&#xe61c'; //显示密码
                r_password.type = 'text';
                flag2 = 1;
            }else{
                eye2.innerHTML = '&#xe6a8';//隐藏
                r_password.type = 'password';
                flag2 = 0;
            }
            
        }

        //注册同意协议
        let icon_agree = document.getElementById('icon_agree');
        let agree = false;
        icon_agree.onclick = function(){
            if(!agree){
                icon_agree.innerHTML = '&#xe646';
                agree = true;
            }else{
                icon_agree.innerHTML = '&#xe600';
                agree = false;
            }
        }

        //注册点击判断输入框合法性
        commit.onclick = function () {

            //存在空值
            if (accord.value == '' || password.value == '' || r_password.value == '' || verification == '') {
                message.innerHTML = "存在未输入的信息";
                messageBox.classList.add('alert_move');
                return;
            }

            // 邮箱不合法
            let reg_accord = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            let result = reg_accord.test(accord.value);
            if (!result) {
                message.innerHTML = "邮箱格式不正确";
                messageBox.classList.add('alert_move');
                return;
            }
            
            //判断密码长度是否正确
            if(password.value.length<8 || password.value.length>30){
                message.innerHTML = "密码长度为8到30位";
                messageBox.classList.add('alert_move');
                return;
            }
            //判断密码是否包含数字，字符，特殊字符
            // let reg_password =  /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/;
            if(judgeFunc[4](password.value)){
                message.innerHTML = "密码只能包含数字字母和‘!@#$%^&*_’这几个特殊字符";
                messageBox.classList.add('alert_move');
                return;
            }

            // 判断密码是否数字，大写字母，小写字母，特殊字符中符合两项
            let judgeNum = 0;
            for(let i=0;i<4;i++){
                if(judgeFunc[i](r_password.value)) judgeNum++;
            }
            if(judgeNum < 2){
                message.innerHTML = "密码强度不够，可以考虑添加数字、大小写字母或特殊字符";
                messageBox.classList.add('alert_move');
                return;
            }

            //判断密码是否有sql注入
            let reg_password2 = /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
            result = reg_password2.test(password.value);
            if(result){
                message.innerHTML = "密码中含有非法字符";
                messageBox.classList.add('alert_move');
                return;
            }

            //判断账号是否有sql注入
            result = reg_password2.test(accord.value);
            if(result){
                message.innerHTML = "账号中含有非法字符";
                messageBox.classList.add('alert_move');
                return;
            }

            //判断验证码是否有sql注入
            result = reg_password2.test(verification.value);
            if(result){
                message.innerHTML = "验证码中含有非法字符";
                messageBox.classList.add('alert_move');
                return;
            }

            //判断密码是否一致
            if(r_password.value != password.value){
                message.innerHTML = "密码输入不一致";
                messageBox.classList.add('alert_move');
                return;
            }

            //判断验证码长度是否为6位
            if(verification.value.length !== 6)
            {
                message.innerHTML = "验证码长度需为6位";
                messageBox.classList.add('alert_move');
                return;
            }

            //判断是否同意协议
            if(!agree){
                message.innerHTML = "需要先同意用户协议";
                messageBox.classList.add('alert_move');
                return;
            }
            message.innerHTML = "注册成功";
            messageBox.classList.add('alert_move');

            //跳转到百度，改成自己的主页地址
            location.href="https://www.baidu.com";
        }
    }
})
</script>
<style>
    @import '../assets/css/login.css';
    #register {
        min-height: 100vh;
        background: url('https://uploadfile.bizhizu.cn/up/45/b1/05/45b105d5a2b7de1c464330493dc86170.jpg.source.jpg') no-repeat;
        background-size: cover;
        /* background: linear-gradient(to bottom right,#b9e7fc,#16b2ff); */
        font-size: 0;
    }
</style>
