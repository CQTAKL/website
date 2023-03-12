<template>
    <div>
        <img :src="mySrc" alt="">
        <ul class="box">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "",
    data(){
        return {
            mySrc: ""
        }
    },
    mounted(){
        // 处理 base64 类型的图片数据
        // this.$axios.get('http://localhost:3000/').then(res => {
        //   let url = 'data:image/jpg;base64,' + res.data // base64方式，需要手动拼接前缀或者由后端拼好直接显示
        //   this.mySrc = url;
        //   // encodeURI
        // })
    }
}
</script>
<style>
    .box {
        display: grid;
        width: 400px;
        height: 400px;
        background-color: yellowgreen;
        border-radius: 15px;

        grid-template-columns: 30px 1fr 2fr;
        grid-gap: 5px;
        /*  声明了两行，行高分别为 50px 50px  */
        grid-auto-rows: 50px;
    }

    .box>li {
        background-color: red;
    }
</style>