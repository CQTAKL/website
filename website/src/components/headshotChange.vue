<template>
    <div class="box">
        <h2>{{title}}</h2>
        <div class="headshotBox">
            <img >
            <label for="headshot">点击上传</label>
        </div>
        <input type="file" id="headshot" @change="uploadImg"  accept="image/png, image/jpeg, image/jpg" style="display: none;" />
        <span>支持 jpg、png、jpeg 格式大小 5M 以内的图片</span>
        <br>
        <button class="lastHeadshot">上个头像</button><button @click="submit" class="submit">提交修改</button>
    </div>
</template>
<script>
export default {
    name: "headshotChange",
    data(){
        return{
            title: "头像修改",
        }
    },
    methods: {
        uploadImg(){
            console.log('打开');
            let reads= new FileReader();
            let f = e.target.files[0];
            reads.readAsDataURL(f);
            reads.onload=function (e) {
                console.log(this.result);
            }
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
        position: relative;
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

    .box .headshotBox {
        position: relative;
        margin: 30px auto;
        width: 120px;
        height: 120px;
    }

    .box .headshotBox img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background: #cadafe;
        border: 5px solid #8baeff;
    }

    .box .headshotBox label {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background: #555;
        color: #fff;
        font-size: 0px;
        line-height: 120px;
        opacity: 0;
    }

    .box .headshotBox:hover label{
        cursor: pointer;
        opacity: 0.8;
        font-size: 18px;
    }

    .box img:hover {
        cursor: pointer;
    }

    .box span {
        position: absolute;
        right: 40px;
        top: 134px;
        width: 126px;
        color: gray;
    }

    .box .lastHeadshot {
        margin-right: 30px;
    }

    .box button {
        width: 150px;
        height: 40px;
        background-color: rgb(139, 174, 255);
        color: #fff;
        font-size: 16px;
    }

    .box button:hover {
        background-color: rgb(107, 151, 255);
    }
</style>