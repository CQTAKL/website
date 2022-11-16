<template>
    <div>
        <div class="logo"></div>
    <form action="" id="form_login">
        <label id="registerLabel">浙江理工用户登录</label>
        <br>
        <input type="text" id="accord" placeholder="请输入理工学号" v-model="accordValue" onpaste="return false" oncopy="return false" oncut="return false" oncontextmenu="return false">
        <br>
        <i>{{accordError}}</i>
        <br>
        <input :type="passwordEyeShow?'text':'password'" id="password" placeholder="请输入理工密码" v-model="password" onpaste="return false" oncopy="return false" oncut="return false" oncontextmenu="return false">
        <br>
        <i>{{passwordError}}</i>
        <br>
        <input type="text" id="verification" placeholder="请输入验证码" v-model="verification" onpaste="return false" oncopy="return false" oncut="return false" oncontextmenu="return false"><img src="" alt=""><a id="change" href="">换一张</a>
        <br>
        <!-- <div id="rember"><span id="checkpoint">&#xe600</span>记住我<a href="" id="lost">忘记密码</a></div> -->
        <div id="rember"><input type="radio" id="checkpoint" :checked="remberMe" @click="remberMeChange"><label for="checkpoint">记住我</label><a href="" id="lost">忘记密码</a></div>
        <a id="commit" @click="login">登录<li>&#xeb03;</li></a>

        <!-- 提示；仅限浙江理工大学学生登录 -->
        <h3>提示：仅限浙江理工大学在校生登录</h3>

        <!-- <div class="other">
            <label>已有账号，去</label><a href="" id="register">注册</a> <a href="" id="question">遇到问题？</a>
        </div> -->
        <!-- <div class="login_other">
            更多登录方式<a href="" id="qq">&#xe882</a><a href="" id="weixin">&#xe739</a>
        </div> -->
        <!-- 显示图标 -->
        <li id="icon_accord">&#xe60a;</li>
        <li id="icon_password">&#xe60f;</li>
        <li id="icon_verification">&#xe6a0;</li>

        <!-- 显示弹窗 -->
        <div class="alert">
            <h2>提示</h2>
            <li>x</li>
            <div class="content">我是弹窗</div>
        </div>

        <!-- 眼睛 -->
        <div class="eye1 iconfont" :class="{'icon-biyanjing-mianxing3-0': !passwordEyeShow, 'icon-yanjing-': passwordEyeShow}" @click="passwordEyeChange"></div>
    </form>
    </div>
</template>
<script>

export default({
    name: "login",
    data(){
        return {
            // 密码的眼睛显示
            passwordEyeShow: false,
            // 记住我
            remberMe: false,
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
            // 错误显示延时
            delayTime: 1000,
        }
    },
    methods:{
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
                this.passwordError  = "输入不能为空"
                let timer = setTimeout(()=>{this.passwordError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }
            // 邮箱长度小于254位
            if(this.accord.length > 254){
                this.accordError  = "账号长度不能超过254位"
                let timer = setTimeout(()=>{this.accordError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            } 
            //判断密码是否有sql注入
            let reg_password2 = /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
            result = reg_password2.test(this.password);
            if (result) {
                this.passwordError  = "密码中含有非法字符"
                let timer = setTimeout(()=>{this.passwordError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            //判断账号是否有sql注入
            result = reg_password2.test(this.accordValue);
            if (result) {
                this.accordError  = "账号中含有非法字符"
                let timer = setTimeout(()=>{this.accordError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            //判断验证码长度是否为4位
            message = document.querySelector('.alert .content');
            messageBox = document.querySelector('.alert');
            if (this.verification.length != 4) {
                message.innerHTML = "验证码长度需为4位";
                messageBox.classList.add('alert_move');
                return;
            }
        }
    },
    mounted(){

    }
})
</script>
<style>
    @import "../assets/css/login.css";
    /* 下面其他登录隐藏了，暂时修改form的提示 */
    form h3 {
        text-align: center;
        font-size: 16px;
        font-weight: normal;
        color: #333;
    }
</style>
