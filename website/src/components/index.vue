<template>
    <div id="index">
        <alertWindow :alert_isShow="alert_isShow" :messageContent="messageContent" @close="close"></alertWindow>
        <h2>主页</h2>
        <button @click="logout">登出按钮</button>
    </div>
</template>
<script>
import alertWindow from "./childComp/alertWindow.vue";
import {get, post} from "@/assets/js/myAxios.js";
export default ({
    name: 'index',
    components: {
        alertWindow
    },
    data(){
        return {
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

        logout(){
            console.log("退出");
            // 发送请求
            post('/user/logout').then(res => { // 请求成功
                const {code, msg} = res;
                
                // 弹窗提示
                this.alert_isShow = true;
                this.messageContent = msg;

            })
        }
    },
    mounted(){

    }
})
</script>
<style>
    #index {
        font-size: 16px;
        text-align: center;
    }
</style>
