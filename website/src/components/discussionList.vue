<template>
    <div>
        <cover></cover>
        <headNav></headNav>
        <announcement></announcement>

        <!-- 主体区域 -->
        <div class="main clearfix">
            <div class="w releative">

                <!-- 左边区域 -->
                <div class="leftContent">
                    <p>热门标签</p>
                    <ul>
                        <li>浙江高考</li>
                        <li>浙江高考</li>
                        <li>浙江高考</li>
                        <li>浙江高考</li>
                        <li>浙江高考</li>
                        <li>浙江高考</li>
                        <li>浙江高考</li>
                    </ul>
                    <img src="../assets/imges/1.gif">
                    <li id="line"></li>
                    <a href="javascript:;" id="myPost">我要发帖</a>
                </div>

                <!-- 中间区域 -->
                <div class="middleContent">

                    <!-- 搜索区域 -->
                    <div class="search">
                        <form action="" id="search_form">
                            <i id="bulb" title="搜索使用指南">&#xe68d;</i>
                            <label for="content_search">内容搜索</label>
                            <input id="content_search" type="text" placeholder="请输入需要搜索的内容">
                            <label for="title_search">标题/作者</label>
                            <input id="title_search" type="text" placeholder="请输入需要标题或者作者">
                            <br>
                            <br>
                            <label>起止时间</label>
                            <input type="datetime-local" id="startTime">
                            <input type="datetime-local" id="endTime">
                            <label for="label_search">标签</label>
                            <select name="" id="label_search">
                                <option>全部</option>
                                <option>最新</option>
                                <option>置顶</option>
                                <option>最热</option>
                            </select>
                            <br>
                            <br>
                            <label>具体分类</label>
                            <select name="" id="class1">
                                <option>一级标签1</option>
                                <option>一级标签2</option>
                                <option>一级标签3</option>
                                <option>一级标签4</option>
                            </select>
                            <select name="" id="class2">
                                <option>二级标签1</option>
                                <option>二级标签2</option>
                                <option>二级标签3</option>
                                <option>二级标签4</option>
                            </select>
                            <select name="" id="class3">
                                <option>三级标签1</option>
                                <option>三级标签2</option>
                                <option>三级标签3</option>
                                <option>三级标签4</option>
                            </select>
                            <a>搜索</a>
                        </form>
                    </div>

                    <!-- 帖子列表 -->
                    <div class="passageList">
                        <ul>
                            <li v-for="(item, i) in passages" :key=i @click="toDetail(item.id)">
                                <!-- 文章header -->
                                <div class="passage_hd clearfix">
                                    <img :src="item.postUserVO.headerUrl">
                                    <span class="name">{{item.postUserVO.showRealName ? item.postUserVO.realName : item.postUserVO.nickName}}</span>
                                    <span class="v">&#xe67b;</span>
                                    <span class="concern">关注+</span>
                                    <span class="hot" v-show="true">火热</span>
                                    <span class="prime" v-show="true">精华</span>
                                    <span class="top" v-show="true">置顶</span>
                                    

                                    <!-- 鼠标悬浮个人头像显示详细内容 -->
                                    <div class="panel">
                                        <div class="panel_hd clearfix">
                                            <img :src="item.postUserVO.headerUrl">
                                            <div class="personInfo">
                                                <span>{{item.postUserVO.showRealName ? item.postUserVO.realName : item.postUserVO.nickName}}</span>
                                                <br>
                                                <span>&#xe67b;</span> <span>&#xe716;</span>
                                                <br>
                                                <span>全站排名</span> <span>11</span>
                                            </div>
                                        </div>
                                        <div class="panel_bd clearfix">
                                            <ul>
                                                <li>
                                                    <p>被阅读</p>
                                                    <p>11</p>
                                                </li>
                                                <li>
                                                    <p>被点赞</p>
                                                    <p>11</p>
                                                </li>
                                                <li>
                                                    <p>被收藏</p>
                                                    <p>11</p>
                                                </li>
                                                <li>
                                                    <p>被关注</p>
                                                    <p>11</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="panel_ft clearfix">
                                            <a href="javascript:;">私信</a>
                                            <a href="javascript:;">个人主页</a>
                                        </div>
                                    </div>
                                </div>
                                <!-- 文章body -->
                                <div class="passage_bd">
                                    <h2>{{item.title}}</h2>
                                    <p>{{item.content}}</p>
                                </div>
                                <!-- 文章footer -->
                                <div class="passage_ft">
                                    <span class="time">{{item.createTime.slice(0,10)}}</span>
                                    <span class="location">发表于<i>{{item.locationId}}</i></span>
                                    <span class="other">&#xe670;</span>
                                    <span class="likes_num">{{item.likeCount}}</span>
                                    <span class="likes">&#xec7f;</span>
                                    <span class="views_num">{{item.browseCount}}</span>
                                    <span class="views">&#xe68c;</span>
                                    <ul>
                                        <li>屏蔽</li>
                                        <li>举报</li>
                                    </ul>
                                </div>
                            </li>
                            <!-- 第一个帖子结束 -->

                        </ul>
                    </div>
                </div>

                <!-- 右边区域 -->
                <div class="rightContent">右边</div>
            </div>
        </div>

        <jumpBar></jumpBar>
        <myFooter></myFooter>
    </div>
</template>
<script>
import cover from './childComp/cover.vue';
import headNav from './childComp/headNav.vue';
import myFooter from './childComp/myFooter.vue';
import announcement from './childComp/announcement.vue';
import jumpBar from './childComp/jumpBar.vue';
import {get, post} from "@/assets/js/myAxios";
export default ({
    name: 'discussionList',
    data(){
        return {
            passages: [
                {
                    "postUserVO": {
                        "realName": "张创琦",
                        "nickName": "创琦杂谈111",
                        "showRealName": true,
                        "briefIntro": "我是一名大学生",
                        "vip": 0,
                        "headerUrl": "http://images.nowcoder.com/head/552t.png"
                    },
                    "id": "1087827631920906240",
                    "title": "这是一个标题",
                    "content": "这是文章的内容",
                    "format": 1,
                    "columnId": null,
                    "browseCount": 11,
                    "likeCount": 11,
                    "commentCount": 11,
                    "createTime": "2023-03-21T11:58:38.000+00:00",
                    "locationId": 11
                }
            ]
        }
    },
    methods: {
        toDetail(id){
            this.$router.push({path: '/postDetail?id=' + id});
        },

        setData(){
            get("/post/list/1").then(res => {
                const {code, msg, data} = res;

                if(code === "200"){
                    this.passages = data.postListSingleVOList;
                }

            });
        }
    },
    mounted(){
        this.passages = [];
        this.setData();
        this.passages =  this.passages.reverse();
    },
    components: {
        cover,
        headNav,
        myFooter,
        announcement,
        jumpBar,
    }
})
</script>
<style scoped>
    @import '../assets/css/discussionList.css';
</style>
