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
export default {
    name: "passwordChange",
    data(){
        return{
            title: "密码修改",
            itemList: [
                {
                    key: "原密码",
                    preInput: "请输入原密码",
                    input: "",
                    error: "密码错误"
                },
                {
                    key: "新密码",
                    preInput: "请输入原密码",
                    input: "",
                    error: "1111"
                }
            ]
        }
    },
    methods: {
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