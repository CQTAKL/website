<template>
    <div class="box">
        <h2>{{title}}</h2>
        <ul>
            <li v-for="(item, i) in itemList" :key=i>
                <span>{{item.key}}：</span><input type="password" v-model="item.input" :placeholder="item.preInput">
                <i>{{item.error}}</i>
            </li>
        </ul>
        <button @click="submit" class="submit">提交修改</button>
    </div>
</template>
<script>
import {passwordStrength, isInjection} from "@/assets/js/common.js";
export default {
    name: "passwordChange",
    data(){
        return{
            title: "密码修改",
            // 错误显示延时
            delayTime: 1000,
            itemList: [
                {
                    key: "原密码",
                    preInput: "请输入原密码",
                    input: "",
                    error: ""
                },
                {
                    key: "新密码",
                    preInput: "请输入原密码",
                    input: "",
                    error: ""
                }
            ]
        }
    },
    methods: {
        submit(){
            // 判断输入是否为空
            if(this.itemList[0].input.trim() == ''){
                this.itemList[0].error = "输入不能为空";
                let timer = setTimeout(()=>{this.itemList[0].error  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            if(this.itemList[1].input.trim() == ''){
                this.itemList[1].error = "输入不能为空";
                let timer = setTimeout(()=>{this.itemList[1].error  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 判断原密码是否有sql注入
            if(isInjection(this.itemList[0].input)){
                this.itemList[0].error = "存在非法字符";
                let timer = setTimeout(()=>{this.itemList[0].error  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            // 判断新密码
            const [res, message, data] = passwordStrength(this.itemList[1].input);
            if(res === false){
                this.itemList[1].error = message;
                let timer = setTimeout(()=>{this.itemList[1].error  = ""; clearTimeout(timer);}, this.delayTime);
                return;
            }

            this.$axios.post('http://localhost:3000/info/modifyPwd', {

                "oldPassword": this.itemList[0].input,
                "newPassword": this.itemList[1].input,

            }).then(res => { // 请求成功
                // console.log(res);
                const {code, msg} = res.data;       
                // 弹窗提示
                this.alert_isShow = true;
                this.messageContent = msg;

            }).catch(err => {
                console.log(err);
            });
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