<template>
    <div id="index">
        <alertWindow :alert_isShow="alert_isShow" :messageContent="messageContent" @close="close"></alertWindow>
        <h2>主页</h2>
        <button @click="logout">登出按钮</button>
    </div>
</template>
<script>
import alertWindow from "./childComp/alertWindow.vue";
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
            this.$axios.post('http://localhost:3000/user/logout').then(res => { // 请求成功

                console.log(res.data);
                const {code, msg} = res.data;
                
                // 弹窗提示
                this.alert_isShow = true;
                this.messageContent = msg;

            }).catch(function (error) { // 请求失败
                // 弹窗提示
                this.alert_isShow = true;
                this.messageContent = "出错了，请再次尝试";
                console.log(error);
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
