<template>
    <!-- 显示弹窗 -->
    <div class="alertWindow" :class="{alert_move: alert_isShow}">
        <h2>提示</h2>
        <li @click="toClose()">x</li>
        <div class="content">{{messageContent}}</div>
    </div>
</template>
<script>
export default {
    name: "alertWindow",
    props: ["messageContent", "alert_isShow"],
    methods: {
        // 关闭提示框
        toClose(){
             this.$emit("close");
        },
    }
}
</script>
<style>

</style>