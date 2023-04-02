<template>
    <div id="login">
        <alertWindow :alert_isShow="alert_isShow" :messageContent="messageContent" @close="close"></alertWindow>
        <div class="logo"></div>
        <form action="" id="form_login">
            <h2>实名认证</h2>
            <li class="accord">
                <input type="text" placeholder="请输入身份证号" v-model="idNumber">
                <i>{{idNumberError}}</i>
            </li>
            <li class="password">
                <input type="text" placeholder="请输入姓名" v-model="name">
                <i>{{nameError}}</i>
            </li>
            <button id="commit"  type="button" @click="sure">确认<span>&#xeb03;</span></button>
            <!-- <span class="tips">提示文字</span> -->
        </form>
    </div>
</template>
<script>
import alertWindow from "./childComp/alertWindow.vue";
import {isInjection, isNumberOrLetter} from "@/assets/js/common.js";
export default {
    name: "authentication",
    components: {
        alertWindow
    },
    data(){
        return {
            // 身份证号
            idNumber: "",
            // 身份证号错误
            idNumberError: "",
            // 姓名
            name: "",
            // 姓名错误
            nameError: "",
            // 错误显示延时
            delayTime: 1000,
            // 弹窗是否显示
            alert_isShow: false,
            // 弹窗内容
            messageContent: "验证码长度需为4位",

        }
    },
    methods: {
        // 关闭弹窗
        close(){
            this.alert_isShow = false;  
        },

        // 确认
        sure(){
            // 身份证输入为空
            if(this.idNumber.trim() == ''){
                this.idNumberError = "输入不能为空";
                let timer = setTimeout(()=>{this.idNumberError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 姓名输入为空
            if(this.name.trim() == ''){
                this.nameError = "输入不能为空";
                let timer = setTimeout(()=>{this.nameError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 身份证长度为18位
            if(this.idNumber.length !== 18){
                this.idNumberError = "身份证长度为18位";
                let timer = setTimeout(()=>{this.idNumberError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 身份证是否由数字字母组成
            if(!isNumberOrLetter(this.idNumber)){
                this.idNumberError = "身份证只能包含数字和字母";
                let timer = setTimeout(()=>{this.idNumberError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 身份证是否有sql注入
            if(isInjection(this.idNumber)){
                this.idNumberError = "含有非法字符";
                let timer = setTimeout(()=>{this.idNumberError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 姓名是否有sql注入
            if(isInjection(this.name)){
                this.nameError = "含有非法字符";
                let timer = setTimeout(()=>{this.nameError  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 请求
            this.$axios.post('http://localhost:8080/info/auth', {

                "identifyCode": this.idNumber,
                "realName": this.name, 

            }).then(res => { // 请求成功
                // console.log(res);
                const {code, msg} = res.data;
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
            }).catch(err => {
                console.log(err);
            });
        }
    },
}
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
