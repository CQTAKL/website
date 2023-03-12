<template>
    <div>
        <cover></cover>
        <headNav></headNav>

        <!-- 主体内容 -->
        <div class="w">
            <div class="fans_title">
                <div>
                    <img src="../assets/imges/gg.png">
                    <span class="name">苏苏苏苏苏的苏</span>
                </div>
                <span class="checkbox clearfix">
                    <div class="fans checked">粉丝</div>
                    <div class="concern">关注</div>
                    <div class="commonConcern">共同关注</div>
                </span>
            </div>
            <div class="fans_body">
                <ul class="clearfix">

                    <!-- 一个人 -->
                    <li>
                        <div class="passage_hd clearfix">
                            <img src="../assets/imges/gg.png" alt="">
                            <span class="name">零一二三四五六七八九一二三四五</span>

                            <!-- 鼠标悬浮个人头像显示详细内容 -->
                            <div class="panel">
                                <div class="panel_hd clearfix">
                                    <img src="../assets/imges/gg.png">
                                    <div class="personInfo">
                                        <span>零一二三四五六七八九一二三四五</span>
                                        <br>
                                        <span>&#xe67b;</span> <span>&#xe716;</span>
                                        <br>
                                        <span>全站排名</span> <span>18</span>
                                    </div>
                                </div>
                                <div class="panel_bd clearfix">
                                    <ul>
                                        <li>
                                            <p>被阅读</p>
                                            <p>188</p>
                                        </li>
                                        <li>
                                            <p>被点赞</p>
                                            <p>100</p>
                                        </li>
                                        <li>
                                            <p>被收藏</p>
                                            <p>120</p>
                                        </li>
                                        <li>
                                            <p>被关注</p>
                                            <p>12</p>
                                        </li>
                                    </ul>
                                </div>
                                <div class="panel_ft clearfix">
                                    <a href="javascript:;">私信</a>
                                    <a href="javascript:;">个人主页</a>
                                </div> 
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <myFooter></myFooter>
    </div>
</template>
<script>
import cover from './childComp/cover.vue';
import headNav from './childComp/headNav.vue';
import myFooter from './childComp/myFooter.vue';
export default ({
    name: 'fans',
    data(){
        return {

        }
    },
    components: {
        cover,
        headNav,
        myFooter,
    }
})
</script>

<style>
    @import '../assets/css/fans.css';
</style>