<template>
    <!-- 跳转栏 -->
        <div class="jumpBar">
            <ul class="clearfix" @click="barClick">
                <li>
                    <a id="turnLeft_fast" title="上五页" index="-5">&#xe6d7;</a>
                </li>
                <li>
                    <a id="turnLeft" title="上一页" index="-1">&#xe645;</a>
                </li>
                <li>
                    <a>{{commentIndex}}</a>
                </li>
                <li>
                    <a id="turnRight" title="下一页" index="1">&#xe60b;</a>
                </li>
                <li>
                    <a id="turnRight_fast" title="下五页" index="5">&#xe6d6;</a>
                </li>
            </ul>
        </div>
</template>
<script>
export default ({
    name: 'jumpBar',
    data(){
        return {
            
        }
    },
    props: {
        commentIndex: Number,
        required: true
    },
    methods: {
        barClick(e){
            let index = e.target.getAttribute("index");
            console.log(index);
            if(["-5", "-1", "1", "5"].indexOf(index)!== -1){
                this.$emit("turnTo", parseInt(index));
            }
            
        }
    }
})
</script>
<style scoped>
    
    .jumpBar a {
        color: #fff;
        background-color: rgb(255, 208, 121);
    }

    .jumpBar a:hover {
        background-color: rgb(255, 176, 29);
        border: 1px solid orange;
    }

</style>
