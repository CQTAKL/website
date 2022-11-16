<template>
    <!-- 跳转栏 -->
    <div class="w">
        <div class="jumpBar ">
            <ul class="clearfix">
                <li>
                    <a id="turnLeft_fast" title="上五页">&#xe6d7;</a>
                </li>
                <li>
                    <a id="turnLeft" title="上一页">&#xe645;</a>
                </li>
                <li>
                    <a>1</a>
                </li>
                <li>
                    <a id="turnRight" title="下一页">&#xe60b;</a>
                </li>
                <li>
                    <a id="turnRight_fast" title="下五页">&#xe6d6;</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default ({
    name: 'jumpBar',
    data(){
        return {
            
        }
    }
})
</script>
