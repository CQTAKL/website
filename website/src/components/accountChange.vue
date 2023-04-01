<template>
    <div class="box">
        <alertWindow :alert_isShow="alert_isShow" :messageContent="messageContent" @close="close"></alertWindow>
        <h2>{{title}}</h2>
        <ul>
            <li v-for="(item, i) in itemList" :key=i>
                <span>{{item.key}}：</span><input type="text" v-model="item.input" :placeholder="item.preInput">
                <i>{{item.error}}</i>
            </li>
            <li>
                <span>验证码：</span><input type="text" class="captcha"><button class="sendCode" :class="{button_disable: isSend}" @click="sendCode">{{sendContent}}</button>
                <i>{{verificationError}}</i>
            </li>
        </ul>
        <button @click="submit" class="submit">提交修改</button>
    </div>
</template>
<script>
import alertWindow from "./childComp/alertWindow.vue";
import {passwordStrength, isMail, isInjection, isNumberOrLetter} from "@/assets/js/common.js";
export default {
    name: "passwordChange",
    components: {
        alertWindow
    },
    data(){
        return{
            // 弹窗是否显示
            alert_isShow: false,
            // 弹窗内容
            messageContent: "验证码长度需为4位",
            // 验证码错误提示
            verificationError: "",
            title: "绑定修改",
            isSend: false,
            sendContent: "发送验证码",
            itemList: [
                {
                    key: "邮箱地址",
                    preInput: "请输入邮箱地址",
                    input: "",
                    error: ""
                }
            ]
        }
    },
    methods: {
        // 关闭弹窗
        close(){
            this.alert_isShow = false;  
        },
        sendCode(){
            // 如果还在发送中
            if(this.isSend) return;
            // 请求
            this.$axios.post('http://localhost:3000/info/emailCode', {

                "email": this.itemList[0].input,

            }).then(res => { // 请求成功
                // console.log(res);
                const {code, msg} = res.data;
                // 弹窗提示
                this.alert_isShow = true;
                this.messageContent = msg;
                
            }).catch(err => {
                console.log(err);
            });

            this.isSend = true;
            this.sendContent = 60;
            const timer = setInterval(() => {
                if(this.sendContent ===  1){
                    this.isSend = false;
                    this.sendContent = "发送验证码";
                    clearInterval(timer);
                }else{
                    this.sendContent--;
                }

            }, 1000);
        },
        submit(){
            console.log("提交");
        }
    },
    mounted(){
        
    }
}
</script>
<style scoped>
    .box {
        width: 500px;
        border-radius: 15px;
        padding: 40px 20px;
        margin: 0 auto;
        margin-top: 120px;
        box-shadow: 3px 3px 25px #e3dada;
        background-color: #fff;
        text-align: center;
        font-size: 16px;
        color: black;
    }
    .box ul {
        margin-top: 30px;
        width: 100%;
    }
    .box ul li {
        position: relative;
        width: 100%;
        height: 80px;
        text-align: left;
    }

    .box ul li i {
        position: absolute;
        left: 131px;
        top: 45px;
        color: tomato;
    }

    .box li span {
        display: inline-block;
        width: 100px;
        text-align: right;
        font-size: 16px;
    }

    .box li input {
        width: 300px;
        height: 40px;
        line-height: 80px;
        font-size: 16px;
        border: 1px solid #e3dada;
        margin-left: 15px;
        padding: 0 15px;
    }

    .box li input:focus {
        border-color: #1d7dfa;
    }

    .box li .captcha {
        width: 160px;
    }

    .box li .sendCode {
        float: right;
        margin-right: 45px;
        width: 100px;
        height: 40px;
        font-size: 16px;
        background-color: #8baeff;
        color: #fff;
    }
    
    .button_disable {
        background-color:grey !important;
    }

    .button_disable:hover {
        cursor: auto;
        background-color:grey !important;
    }

    .box li .sendCode:hover {
        background-color: rgb(107, 151, 255);
    }

    .box .submit {
        width: 230px;
        height: 40px;
        background-color: rgb(139, 174, 255);
        color: #fff;
        font-size: 16px;
    }

    .box .submit:hover {
        background-color: rgb(107, 151, 255);
    }
</style>