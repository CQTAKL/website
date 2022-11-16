<template>
    <div>
        <div class="dark" id="container">
        <div class="bg"></div>
        <div class="moon-box">
            <div class="moon"></div>
        </div>
        <div class="sun-box">
            <div class="sun"></div>
        </div>
        <div class="sea"></div>
    </div>
    <div class="w">
        <div class="logo"></div>
        <div class="line"></div>
        <div class="register">欢迎注册</div>
        <form method="post" action="register.html" class="clearfix">
            <label class="label">邮箱</label><input type="text" id="accord" placeholder="请输入邮箱"><p></p>
            <br>
            <i>邮箱输入格式不正确</i>
            <br>
            <label class="label">密码</label><input type="password" id="password" placeholder="请输入密码" onpaste="return false" oncopy="return false" oncut="return false" oncontextmenu="return false"><p></p>
            <br>
            <i>密码需要包含字母，数字和特殊字符</i>
            <br>
            <label class="label">确认密码</label><input type="password" id="r_password" placeholder="请再次输入密码" onpaste="return false" oncopy="return false" oncut="return false" oncontextmenu="return false">
            <br>
            <i>两次输入密码不一致</i>
            <br>
            <label class="label">验证码</label><input type="text" id="verification" placeholder="请输入验证码"><div id="get_verification">获取</div><p></p>
            <br>
            <div id = agree>
                <span id = "icon_agree">&#xe600;</span>
                <span>我已经阅读并同意<a href="#">用户协议</a></span>
            </div>
            <a id="commit">注册<li>&#xeb03;</li></a>
            <br>
            <div class="other">
                <label>已有账号，返回</label><a href="" id="login">登录</a> <a href="" id="question">遇到问题？</a>
            </div>
            <div class="register_other">
                更多登录方式<a href="" id="qq">&#xe882;</a><a href="" id="weixin">&#xe739;</a>
            </div>
            <!-- 眼睛 -->
            <div class="eye1">&#xe6a8;</div>
            <div class="eye2">&#xe6a8;</div>
        </form>
    </div>

    <!-- 显示弹窗 -->
    <div class="alert">
        <h2>提示</h2><li>&times;</li>
        <div class="content">我是弹窗</div>
    </div>

    <!-- 按钮切换白天和黑夜 -->
    <div class="btn-box">
        <div onclick="change('light')">
            <i class="fa fa-sun-o" aria-hidden="true"></i> 白天
        </div>
        <div onclick="change('dark')">
            <i class="fa fa-moon-o" aria-hidden="true"></i> 黑夜
        </div>
    </div>
    </div>
</template>
<script>

export default ({
    name: 'register',
    data(){
        return {

        }
    },
    mounted(){
        // 确保背景不会随缩放影响
        let container = document.getElementById('container');
        // console.log(container.offsetHeight);
        // console.log(document.documentElement.clientHeight);
        container.style.height = document.documentElement.clientHeight + 'px';

        window.addEventListener('resize', function() {
            container.style.height = document.documentElement.clientHeight + 'px';
        })


        //切换白天和黑夜，同时切换logo
        let logo = document.querySelector('.logo');
        function change(str) {
            document.getElementById('container').setAttribute('class', str);
            let register = document.querySelector('.register');
            if (str === "light") {
                register.style.color = 'black';
                logo.setAttribute('style',"background: url('./imges/logo_black_horizontal.png');background-size: cover;");
            } else {
                register.style.color = 'white';
                logo.setAttribute('style',"background: url('./imges/logo_white_horizontal.png');background-size: cover;");
            }

        }

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
    @import '../assets/css/register.css';
    @import 'https://cdn.bootcdn.net/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    @import '../assets/css/37.css';
</style>
