<template>
    <!-- 官方公告 -->
    <div class="w">
        <div class="announcement">
            <div class="guangbo"></div>
            <div id="scrollBar" ref="box">
                <ul ref="part1">
                    <li v-for="(item, i) in announcementList" :key=i>{{item}}</li>
                </ul>
                <ul ref="part2">
                    <li v-for="(item, i) in announcementList" :key=i>{{item}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default ({
    name: 'announcement',
    data(){
        return {
            announcementList: [
                "重要通知：5月23日下午4时至5月24日上午9时本站将进行更新，本站将临时关闭",
                "公告1",
                "公告2"
            ]
        }
    },
    mounted() {
        let part1 = this.$refs.part1;
        let part2 = this.$refs.part2;
        let box = this.$refs.box;

        let func = function(){
            // part1部分内容已经展示结束，移动到了part2，需要重置
            if(part2.offsetHeight - box.scrollTop <= 0){
                box.scrollTop -= part1.offsetHeight;
                //box.scrollTop = 0; //或者这样，但是必须保证part1没有padding-top和margin-top;
            }else{
                box.scrollTop ++;
            }
        }

        let time = setInterval(func, 60);

        // 鼠标悬浮，停止滚动
        box.onmouseover = function(){
            clearInterval(time);
        }
        // 鼠标移开，重设滚动
        box.onmouseout = function(){
            time = setInterval(func, 60);
        }
    }
})
</script>
