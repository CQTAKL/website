<template>
    <div class="cover">
        <form action="">
            <label id="registerLabel">登录</label>
            <br>
            <input type="text" id="accord" placeholder="请输入邮箱/用户名/手机号">
            <br>
            <input type="password" id="password" placeholder="请输入密码">
            <br>
            <input type="text" id="verification" placeholder="请输入验证码"><img src="" alt=""><a id="change" href="">换一张</a>
            <br>
            <div id="rember"><span id="checkpoint">&#xe600;</span>记住我<a href="" id="lost">忘记密码</a></div>
            <a id="commit">登录<li>&#xeb03;</li></a>
            <div class="other">
                <label>已有账号，去</label><a href="" id="register">注册</a> <a href="" id="question">遇到问题？</a>
            </div>
            <div class="login_other">
                更多登录方式<a href="" id="qq">&#xe882;</a><a href="" id="weixin">&#xe739;</a>
            </div>
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
            <div class="eye1">&#xe6a8;</div>

        </form>
    </div>
</template>
<script>
export default ({
    name: 'cover',
    data(){
        return {

        }
    },
})
</script>
<style>

</style>