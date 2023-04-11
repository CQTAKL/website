<template>
    <div class="w">
        <alertWindow :alert_isShow="alert_isShow" :messageContent="messageContent" @close="close"></alertWindow>
        <ul class="informationModify">
            <h2>个人信息修改</h2>
            <li>
                <span>{{personInfo.nickName.key}}：</span><input v-model="personInfo.nickName.currentValue"><a @click='resetValue("nickName")'>点击恢复</a>
            </li>
            <li>
                <span>{{personInfo.birth.key}}：</span><input type="date" v-model="personInfo.birth.currentValue"><a @click='resetValue("birth")'>点击恢复</a>
            </li>
            <li>
                <span>{{personInfo.motto.key}}：</span><textarea v-model="personInfo.motto.currentValue"></textarea><a @click='resetValue("motto")'>点击恢复</a>
            </li>
            <li>
                <span>{{personInfo.briefIntro.key}}：</span><textarea v-model="personInfo.briefIntro.currentValue"></textarea><a @click='resetValue("briefIntro")'>点击恢复</a>
            </li>
            <li class="center"><button class="submit" @click="submit">提交修改</button></li>
        </ul>

        
    </div>
</template>
<script>
import alertWindow from "./childComp/alertWindow.vue";
import {isInjection} from "@/assets/js/common.js";
import {post, get} from "@/assets/js/myAxios.js";
export default {
    name: "informationModify",
    components: {
        alertWindow
    },
    data(){
        return{
            // 弹窗是否显示
            alert_isShow: false,
            // 弹窗内容
            messageContent: "验证码长度需为4位",
            
            personInfo: {
                "nickName": {
                    key: "用户名",
                    oldValue: "暂无",
                    currentValue: "暂无"
                },
                "birth":{
                    key: "生日",
                    oldValue: "2012-12-22",
                    currentValue: "2012-12-22"
                },
                "motto":{
                    key: "个性签名",
                    oldValue: "暂无",
                    currentValue: "暂无"
                },
                "briefIntro":{
                    key: "简介",
                    oldValue: "这是一个简介",
                    currentValue: "这是一个简介"
                }
            }
        }
    },
    mounted(){
        this.setData();
    },
    methods: {
        // 初始化数据
        setData(){
            get("/info/show/6").then(res => {
                const {code, msg, data} = res;
                if(code === "200"){
                    Object.keys(data).forEach(key => {
                        this.personInfo[key].oldValue = data.key;
                        this.personInfo[key].currentValue = data.key;
                    })
                }
            })
        },

        // 关闭弹窗
        close(){
            this.alert_isShow = false;  
        },

        // 恢复初始设置
        resetValue(index){
            this.personInfo[index].currentValue = this.personInfo[index].oldValue;
        },

        // 提交修改
        submit(){
            // 判断是否有空值
            for(let i=0;i<this.personInfo.length;i++){
                if(this.personInfo[i].currentValue.trim() == ''){
                    this.alert_isShow = true;
                    this.messageContent = "不能存在空值";
                    return;
                }
            }

            // 防sql注入isInjection
            for(let i=0;i<this.personInfo.length;i++){
                if(isInjection(this.personInfo[i].currentValue)){
                    this.alert_isShow = true;
                    this.messageContent = "存在非法字符";
                    return;
                }
            }

            // 判断字符串长度 昵称20，签名200，简介50
            if(this.personInfo[0].currentValue.length > 20){
                this.alert_isShow = true;
                this.messageContent = "昵称不能超过20个字符";
                return;
            }

            if(this.personInfo[2].currentValue.length > 200){
                this.alert_isShow = true;
                this.messageContent = "个性签名不能超过200个字符";
                return;
            }

            if(this.personInfo[3].currentValue.length > 200){
                this.alert_isShow = true;
                this.messageContent = "简介不能超过200个字符";
                return;
            }

            // 请求
            post('/info/modifyShow', {

                "nickName": this.personInfo[0].currentValue,
                "birth": this.personInfo[1].currentValue,
                "motto": this.personInfo[2].currentValue,
                "briefIntro": this.personInfo[3].currentValue

            }).then(res => { // 请求成功
                // console.log(res);
                const {code, msg} = res;
                // 弹窗提示
                this.alert_isShow = true;
                this.messageContent = msg;
            });
        }
    }
}
</script>
<style>
.informationModify {
    width: 100%;
    /* height: 1000px; */
    background-color: #fff;
    border-radius: 25px;
    margin-top: 40px;
    margin-bottom: 60px;
    font-size: 16px;
    color: black;
    padding: 40px 60px;
    box-shadow: 3px 3px 25px #e3dada;
    background: url('../assets/imges/bgc.jpg') no-repeat;
    background-size: cover;
}

.informationModify h2 {
    width: 200px;
    height: 40px;
    margin: 0 auto;
    margin-bottom: 40px;
}
.informationModify li {
    width: 100%;
}


.informationModify span {
    display: inline-block;
    width: 135px;
    height: 66px;
    line-height: 66px;
    font-size: 18px;
    margin-right: 40px;
    text-align: right;
    vertical-align: top;
}

.informationModify input {
    display: inline-block;
    width: 500px;
    height: 40px;
    margin-top: 10px;
    padding: 0 20px;
    font-size: 18px;
    border-radius: 15px;
}

.informationModify textarea{
    display: inline-block;
    width: 500px;
    height: 120px;
    font-size: 18px;
    border-radius: 15px;
    outline: none;
    border: 0px;
    padding: 20px;
    resize: none;
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: Arial, Helvetica, sans-serif;
}

.informationModify li:nth-child(n+1) {
    border-top: 1px dashed #ccc;
}

.informationModify a {
    float: right;
    width: 100px;
    height: 40px;
    background-color: #37cae4;
    color: #fff;
    border-radius: 15px;
    margin-top: 13px;
    line-height: 40px;
    text-align: center;
    margin-right: 50px;
}

.informationModify a:hover {
    cursor: pointer;
    background-color: #00d9ff;
}

.informationModify .submit {
    width: 200px;
    height: 40px;
    background-color: #37cae4;
    font-size: 16px;
    color: #fff;
    margin-top: 20px;
    border-radius: 15px;
    text-align: center;
}

.informationModify .submit:hover {
    background-color: #00d9ff;
}

.informationModify .center {
    text-align: center;
}
</style>