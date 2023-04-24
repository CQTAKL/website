<template>
    <div>
        <headNav></headNav>
    <announcement></announcement>
    <div class="w clearfix">
        <!-- 左侧一列 -->
        <div id="postDetail-left">
            <!-- 左侧顶部帖子主体 -->
            <div id="poostDetail-left-top">
                <!-- 帖子信息 -->
                <div id="post-title" class="clearfix">
                    <div id="post-title-left">
                        <h2>{{title}}</h2>
                        <img  :src="postUserVO.headerUrl"><span>{{setName(postUserVO.showRealName, postUserVO.realName, postUserVO.nickName)}}</span><i title="管理员">&#xe67b;</i>
                        <!-- 头像 -->
                        <div class="panel" style="top: 70px;">
                            <div class="panel_hd clearfix">
                                <img :src="postUserVO.headerUrl">
                                <div class="personInfo">
                                    <span>零一二三四五六七八九一二三四五</span>
                                    <br>
                                    <span>&#xe67b</span> <span>&#xe716</span>
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
                    <div id="post-title-right">
                        <span>{{createTime.slice(0, 10)}}</span>
                        <br>
                        <span>发表于{{setCountryId(locationId)}}</span>
                    </div>
                </div>
                <!-- 帖子内容 -->
                <div id="post-body">
                    <!-- <span>帖子分类：</span><span>一级标签</span> -- <span>二级标签</span> -- <span>三级标签</span>
                    <br> -->
                    <v-md-preview-html id="post" :html="content" preview-class="vuepress-markdown-body"></v-md-preview-html>
                </div>
                <!-- 上下跳转帖子 -->
                <div id="post-footer" class="clearfix">
                    <a>
                        <span><i>&#xe752;</i>上一篇帖子的内容查看上一篇帖子上一篇帖子的</span>
                    </a>
                    <a>
                        <span>下一篇帖子的内容查下一篇下一篇帖子的内容下一篇帖子的<i>&#xe751;</i></span>
                    </a>
                </div>
            </div>
            <!-- 左侧下方评论功能 -->
            <div id="postDetail-left-bottom">
                <div id="comments-title" class="clearfix">
                    <div>
                        <i>20</i><span>条评论</span>
                    </div>
                    <div id="commentSort" class="clearfix">
                        <a>默认排序</a>
                        <a>最近在前</a>
                        <a>最赞在前</a>
                    </div>
                    <a id="replies" href="#rootInput">我要发帖</a>
                </div>
                <ul id="rootComment">
                    <li class="clearfix" v-for="(item, i) in comments" :key=i>
                        <div class="rootComment-left">
                            <!-- 鼠标悬浮个人头像显示详细内容 -->
                            <div class="panel">
                                <div class="panel_hd clearfix">
                                    <img >
                                    <div class="personInfo">
                                        <span>零一二三四五六七八九一二三四五</span>
                                        <br>
                                        <span>&#xe67b</span> <span>&#xe716</span>
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
                        <div class="rootComment-right">
                            <i>{{i+1}}#</i>
                            <span>{{setName(item.commentUserVO.showRealName, item.commentUserVO.realName, item.commentUserVO.nickName)}}</span>
                            <br>
                            <p>{{item.content}}</p>
                        </div>
                        <div class="rootComment-footer">
                            发表于 <span>{{item.createTime.slice(0, 10)}}</span>&nbsp;&nbsp;&nbsp;&nbsp;来自<span>{{setCountryId(item.locationId)}}</span>
                            <div class="commentOption">
                                <span @click="likeClick(i, j)">赞</span>(<i>{{item.likeCount}}</i>)&nbsp;&nbsp;&nbsp;&nbsp;<span @click="showComment(i, -1)">{{replyOrCancel(i, -1)}}</span>(<i>{{item.replyNum}}</i>)&nbsp;&nbsp;&nbsp;&nbsp;<span>举报</span>
                            </div>
                        </div>
                        <ul class="secondaryComment">
                            <li class="clearfix" v-for="(sItem, j) in item.reply" :key=j>
                                <p><span>{{setName(sItem.commentUserVO.showRealName, sItem.commentUserVO.realName, sItem.commentUserVO.nickName)}}</span>&nbsp;回复&nbsp;<span>{{sItem.forName}}</span><i>：&nbsp;&nbsp;&nbsp;&nbsp;</i>{{sItem.content}}</p>
                                发表于 <span>{{sItem.createTime.slice(0, 10)}}</span>&nbsp;&nbsp;&nbsp;&nbsp;来自<span>{{setCountryId(sItem.locationId)}}</span>
                                <div class="commentOption">
                                    <span @click="likeClick(i, j)">赞</span>(<i>{{sItem.likeCount}}</i>)&nbsp;&nbsp;&nbsp;&nbsp;<span @click="showComment(i, j)">{{replyOrCancel(i, j)}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>举报</span>
                                </div>
                                <!-- <div class="secondaryInput clearfix">
                                    <input type="text" placeholder="请输入你的观点">
                                    <i>&#xe610;</i>
                                    <a onclick="secondReply()">回复</a>
                                </div> -->
                            </li>
                            <li class="secondaryInput clearfix" v-if="isShow(i)">
                                <input type="text" placeholder="请输入你的观点" v-model="secondContent">
                                <i>&#xe610;</i>
                                <a @click="secondReply(i)">回复</a>
                            </li>
                        </ul>
                    </li>
                    

                    <!-- 留着复制 -->
                </ul> 
                <jumpBar @turnTo="turnTo" :commentIndex="commentIndex"></jumpBar>
            </div>
            
            <div id="rootInput" class="clearfix">
                <textarea placeholder="在这里输入你的回帖吧" v-model="rootContent"></textarea>
                <span><i>&#xec80;</i>图片</span><span><i>&#xe610;</i>表情</span><button @click="rootReply" :class="{orange: isEmpty}">回帖</button>
            </div>
        </div>
        <!-- 右侧 -->
        <div id="postDetail-right">
            <div id="postDetail-right-top">
                <!-- 赞 收藏 踩 浏览 -->
                <ul id="postDetail-tools" class="clearfix">
                    <li>
                        <i>&#xec7f;</i><span>999</span>
                    </li>
                    <li>
                        <i>&#xe8b9;</i><span>999</span>
                    </li>
                    <li>
                        <i>&#xe612;</i><span>999</span>
                    </li>
                    <li>
                        <i>&#xe68c;</i><span>1000</span>
                    </li>
                </ul>
    
                <!-- 关注和私信 -->
                <div id="aboutMessage">
                    <a>+关注</a><a>私信</a>
                </div>
    
                <h3>推荐帖子</h3>
                <!-- 推荐帖子 -->
                <ul id="recommendPost" class="clearfix">
                    <li class="clearfix" v-for="(item, i) in recommends" :key=i>
                        <p>{{item.title}}</p>
                        <span>发表于<i>{{item.time}}</i></span><span>回复(<i>{{item.replyNum}}</i>)</span>
                    </li>
                </ul>
            </div>
            <div id="postDetail-right-bottom">
                <h3>每月发表次数</h3>
                <ul class="clearfix">
                    <li v-for="(item, i) in postByMonth" :key=i>{{i}}月发表<i>{{item}}</i>篇</li>
                </ul>
                <div id="timeCheck" class="clearfix">
                    <span>2020</span><span>2021</span><span>2022</span>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import cover from './childComp/cover.vue';
import headNav from './childComp/headNav.vue';
import myFooter from './childComp/myFooter.vue';
import announcement from './childComp/announcement.vue';
import jumpBar from './childComp/jumpBar.vue';
import {setCountryId, setName} from "@/assets/js/common.js";
import {get, post} from "@/assets/js/myAxios";
export default {
    name: 'postDetail',
    computed: {
        isEmpty(){
            return !this.rootContent.trim() == "";
        },
    },
    data(){
        return {
            // 当前评论索引
            commentIndex: 1,
            // 当前页面的索引
            index: null,
            id: 10233243,
            postUserVO: {
                "realName": "张创琦",
                "nickName": "努力学习",
                "showRealName": true,
                "briefIntro": "我是一名大学生",
                "vip": 0,
                "headerUrl": "http://images.nowcoder.com/head/552t.png"
            },
            title: "这是一个标题21",
            content: `<p data-v-md-line="1">阿斯蒂芬</p>
<div data-v-md-line="2"><div class="v-md-pre-wrapper v-md-pre-wrapper-language js extra-class"><pre class="v-md-prism-language"><code> const a = 1;
let b = hellp;
</code></pre>
</div></div><ul data-v-md-line="6">
<li>1目标1</li>
<li>2目标2</li>
<li>3目标3</li>
</ul>`,
            createTime: "2023-03-22T07:12:48.000+00:00",
            format: 1,
            locationId: 11,
            // 根回复内容
            rootContent: "",
            // 回复对象
            to: [-1, -1],
            // 第二级回复
            secondContent: "",
            // 每月发表
            postByMonth: [11,33,5,122,4,1,6,2,8,6,99,3],
            // 推荐
            recommends: [
                {
                    title: "2023年秋招，想加入自动驾驶行业的你需要关注这些公司",
                    time: "08-12 14:01",
                    replyNum: 90
                },
                {
                    title: "2023年秋招，想加入自动驾驶行业的你需要关注这些公司",
                    time: "08-12 14:01",
                    replyNum: 90
                },
                {
                    title: "2023年秋招，想加入自动驾驶行业的你需要关注这些公司",
                    time: "08-12 14:01",
                    replyNum: 90
                },
                {
                    title: "2023年秋招，想加入自动驾驶行业的你需要关注这些公司",
                    time: "08-12 14:01",
                    replyNum: 90
                },
            ],

            // 评论
            comments: [],
            "commentInfos": [
            {
                "id": 1084541797020991,
                "userId": 6,
                "commentUserVO": {
                    "realName": "张创琦",
                    "nickName": "创琦杂谈111",
                    "showRealName": true,
                    "briefIntro": "我是一名大学生",
                    "vip": 0,
                    "headerUrl": "http://images.nowcoder.com/head/552t.png"
                },
                "content": null,
                "locationId": 1,
                "likeCount": 12,
                "createTime": "2023-03-19T07:11:11.000+00:00",
                "parentId": -1,
                "atId": -1
            },
            {
                "id": 1084541797020992,
                "userId": 6,
                "commentUserVO": {
                    "realName": "张创琦",
                    "nickName": "创琦杂谈111",
                    "showRealName": true,
                    "briefIntro": "我是一名大学生",
                    "vip": 0,
                    "headerUrl": "http://images.nowcoder.com/head/552t.png"
                },
                "content": null,
                "locationId": 3,
                "likeCount": 4,
                "createTime": "2023-03-19T07:11:45.000+00:00",
                "parentId": 1084541797020991,
                "atId": -1
            },
            {
                "id": 1087041120266878,
                "userId": 6,
                "commentUserVO": {
                    "realName": "张创琦",
                    "nickName": "创琦杂谈111",
                    "showRealName": true,
                    "briefIntro": "我是一名大学生",
                    "vip": 0,
                    "headerUrl": "http://images.nowcoder.com/head/552t.png"
                },
                "content": "此处为评论内容",
                "locationId": 2,
                "likeCount": 0,
                "createTime": "2023-03-19T07:53:19.000+00:00",
                "parentId": 1084541797020991,
                "atId": 1084541797020992
            }
        ]
            
        }
    },
    components: {
        cover,
        headNav,
        myFooter,
        announcement,
        jumpBar
    },
    methods: {
        // 设置名字
        setName,
        // 设置地区的位置编号
        setCountryId,
        turnTo(index){
            if(this.commentIndex + index <= 0){
                this.commentIndex = 1;
            }else {
                this.commentIndex += index;
            }
            console.log(this.commentIndex);
            
        },
        // 点赞
        likeClick(i, j){
            post("/count/likeCount", {
                "entityType": 1,
                "entityId": this.comments[i].reply[j].id,
                "userId":  this.comments[i].reply[j].index
            }).then(res => {
                const {code, msg, data} = res;
                if(code === 200){
                    this.comments[i].reply[j].likeCount++;
                }

            })
        },

        // 设置数据
        setData(){
            get('/post/' + this.index).then(res => {

                console.log(res.data);
                const {code, msg, data} = res;

                if(code === "200"){
                    this.id = data.id;
                    this.postUserVO = data.postUserVO;
                    this.title = data.title;
                    this.content = data.content;
                    this.createTime = data.createTime;
                    this.format = data.format;
                    this.locationId = data.locationId;
                }
            });

            post('/comment/get', {

                 "type": "1",
                "entityId": this.index

            }).then(res => {
                console.log(res.data);
                const {code, msg, data} = res;

                if(code === "200"){
                    // 清空原有评论
                    this.comments = [];
                    

                    // 将接收到的数组转集合
                    let set = new Set();
                    data.commentInfos.map(elem => set.add(elem));

                    // 将一级评论直接加入数组
                    set.forEach((item) => {
                        if(item.parentId === -1){
                            // 设置reply和replyNum属性
                            item.replyNum = 0;
                            item.reply = [];
                            this.comments.push(item);
                            set.delete(item);
                        }
                    
                    });

                    // 加入@的对象
                    set.forEach((item) => { 
                        if(item.atId === -1){
                            item.atId = item.parentId;
                        } 
                        for(let i=0;i<data.commentInfos.length;i++){
                            if(item.atId === data.commentInfos[i].id){
                                item.forName = this.setName(data.commentInfos[i].commentUserVO.showRealName, data.commentInfos[i].commentUserVO.realName, data.commentInfos[i].commentUserVO.nickName);
                            }
                        }
                    })

                    // 二级评论根据parentId找到对应数组放入
                    set.forEach((item) => {
                        for(let i=0;i<this.comments.length;i++){
                            // 如果找到了父级评论的位置就加入
                            if(item.parentId === this.comments[i].id){
                                this.comments[i].reply.push(item);
                                this.comments[i].replyNum++;
                            }
                        }
                    })

                }

            }).catch(err => {
                console.log(err);
            }, 1000);

        },

        isShow(i){
            return this.to[0]===i;
        },
        
        // 回复与取消回复
        replyOrCancel(i, j){
            const [ii, jj] = this.to;
            // console.log(ii, jj, "   ", i, j);
            if(ii===i && jj===j) return "取消回复";
            return "回复";
        },

        // 根回帖
        rootReply(){
            if(this.rootContent.trim() == '') return;
            this.comments.push({
                id: "登录id",
                name: "登录用户",
                content: this.rootContent,
                createTime: new Date(),
                locationId: "登录用户的locationID",
                likeCount: 0,
                replyNum: 0,
                reply: []
            });
            this.rootContent = "";
        },

        // 显示评论功能
        showComment(i, j){
            // 和上次点击的一样 是取消显示
            if (this.to[0] === i && this.to[1] === j) {
                this.to = [-1, -1];
            }else{
                this.to = [i, j];
            } 
        },

        // 二级回复
        secondReply(){
            if(this.secondContent.trim()=="") return;
            const [i, j] = this.to;
            if(i < 0 && j < 0) return;

            post("/comment/add", {
                "content": "此处为评论内容",
                "parentId": j === -1 ? "-1" : this.comments[i].userId,
                "atId": j === -1 ? "-1" : this.comments[i].reply[j].userId,
                "type": "2",
                "createTime": new Date(),
                "entityId": "1084541806961491968"
            }).then(res => {
                const {code, msg, data} = res;
                    
            });

            this.comments[i].reply.push({
                id: this.id,
                name: setName(this.postUserVO.showRealName, this.postUserVO.realName, this.postUserVO.nickName),
                forName: j === -1 ? this.comments[i].name : this.comments[i].reply[j].name,
                content: this.secondContent,
                createTime: "2023-03-19T07:11:11.000+00:00",
                locationId: "1",
                likeCount: 0,
            })

            // 清空评论并初始化to
            this.secondContent = "";
            this.to = [-1, -1];
        }
    },
    mounted(){
        // 设置textarea的高度
        let textarea = document.querySelector("#rootInput textarea");
        textarea.addEventListener('input', (e) => {
            textarea.style.height = '50px';
            textarea.style.height = e.target.scrollHeight + 'px';
        });

        console.log(this.$route.query.id);
        this.index = this.$route.query.id;

        // 设置数据
        // this.setData();
    }
}
</script>
<style scoped>
    @import '../assets/css/postDetail.css';
    .orange {
        background-color: orange !important;
    }
</style>