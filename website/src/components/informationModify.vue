<template>
    <div class="w">
        <ul class="informationModify" @click="resetValue">
            <h2>个人信息修改</h2>
            <li v-for="(item, i) in personInfo" :key=i>
                <span>{{item.key}}：</span><input type="text" v-model="item.currentValue"><a :index="i">点击重置</a>
            </li>
            <li class="center"><button class="submit" @click="submit">提交修改</button></li>
        </ul>

        
    </div>
</template>
<script>
export default {
    name: "informationModify",
    data(){
        return{
            personInfo: [
                {
                    key: "用户名",
                    oldValue: "大阳",
                    currentValue: "大阳"
                },
                {
                    key: "简介",
                    oldValue: "这是一个简介",
                    currentValue: "这是一个简介"
                },
                {
                    key: "生日",
                    oldValue: "2012-12-22",
                    currentValue: "2012-12-22"
                },
                {
                    key: "个性签名",
                    oldValue: "暂无",
                    currentValue: "暂无"
                },
            ]
        }
    },
    methods: {
        // 恢复初始设置
        resetValue(event){
            let index = event.target.getAttribute('index') - 0;
            this.personInfo[index].currentValue = this.personInfo[index].oldValue;
        },

        // 提交修改
        sumbit(){
            alert("提交中");
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
    margin-top: 80px;
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
}

.informationModify input {
    display: inline-block;
    widows: 400px;
    height: 40px;
    line-height: 66px;
    padding: 0 20px;
    font-size: 18px;
    border-radius: 15px;
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