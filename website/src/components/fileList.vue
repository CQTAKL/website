<template>
    <div>
        <div class="w">
        <h2 id="fileListTitle">文&ensp;件&ensp;列&ensp;表</h2>
        <div id="fileListSearch">
            <input type="text" placeholder="请输入搜索关键字"><button>搜索</button>
            <br>
            <span>推荐关键字：</span><span>高数期中卷</span><span>期末复习真题</span><span>最新资料</span><span>其他</span>
        </div>
        <div id="fileListBox">
            <div id="fileListSetting">
                <label for="">一级选项：</label>
                <select @change="firstLabelChange" v-model="firstValue">
                    <option :value=i v-for="(item, i) in firstList" :key=i>{{item}}</option>
                </select>
                <label for="">二级选项：</label>
                <select @change="secondLabelChange" v-model="secondValue">
                    <option :value=i v-for="(item, i) in secondList" :key=i>{{item}}</option>
                </select>
                <label for="">三级选项：</label>
                <select v-model="thirdValue">
                    <option :value=i v-for="(item, i) in thirdList" :key=i>{{item}}</option>
                </select>
                <label for="">标签选项：</label>
                <select>
                    <option value="">最新</option>
                    <option value="">置顶</option>
                    <option value="">火热</option>
                </select>

                <div id="fileListSort" class="clearfix">
                    <a>下载量</a>
                    <a>时间</a>
                    <a>点赞量</a>
                </div>
            </div>
            <div id="fileList">

                <!-- ***一个文件*** -->
                <div class="file" v-for="(item, i) in files" :key=i>
                    <span class="title">{{item.title}}</span>
                    <br>
                    <span>上传者：</span><span>{{item.author}}</span>
                    <span>上传时间：</span><span>{{item.time}}</span>
                    <div class="fileOption">
                        <ul class="clearfix">
                            <li @click="likeClick(i)">
                                <a class="iconfont" :class="{'icon-dianzan': !item.liked, 'icon-dianzan_kuai': item.liked}"></a><span>{{item.like}}</span>
                            </li>
                            <li @click="downLoadFile()">
                                <a>&#xe619;</a><span>{{item.downLoad}}</span>
                            </li>
                            <li><a>&#xe670;</a>
                            <ul class="otherOption">
                                    <li>举报</li>
                                    <li>勘误</li>
                                    <li>屏蔽</li>
                            </ul></li>
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>
    </div>

    <!-- 跳转栏 -->
    <div class="w">
        <div class="jumpBar">
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
    </div>
</template>
<script>
export default ({
    name: "fileList",
    data(){
        return {
            // 一级option被选中下标
            firstValue: 0,
            // 二级option被选中的下标
            secondValue: 0,
            // 三级option被选中的下标
            thirdValue: 0,
            // 一级option
            firstList: [],
            // 二级option
            secondList: [],
            // 三级option
            thirdList: [],
            // 后端获取的全部一级option
            firstContent: ["一级标签1","一级标签2","一级标签3","一级标签4","一级标签5"],
            // 后端获取的全部二级option
            secondContent: [
                ["二级标签11","二级标签12"],
                ["二级标签21","二级标签22"],
                ["二级标签31","二级标签32"],
                ["二级标签41","二级标签42"],
                ["二级标签51","二级标签52"],
            ],
            // 后端获取的全部三级option
            thirdContent: [
                [
                    ["三级标签111","三级标签112","三级标签113"],
                    ["三级标签121","三级标签122","三级标签123"],
                ],
                [
                    ["三级标签211","三级标签212","三级标签213"],
                    ["三级标签221","三级标签222","三级标签223"],
                ],
                [
                    ["三级标签311","三级标签312","三级标签313"],
                    ["三级标签321","三级标签322","三级标签323"],
                ],
                [
                    ["三级标签411","三级标签412","三级标签413"],
                    ["三级标签421","三级标签422","三级标签423"],
                ],
                [
                    ["三级标签511","三级标签512","三级标签513"],
                    ["三级标签521","三级标签522","三级标签523"],
                ],
            ],
            // 后端获取的显示文件信息
            files: [
                {
                    title: '高等数学2022学年期末综合测试卷A',
                    author: '不负韶华',
                    time: '2021.10.08',
                    like: '110',
                    liked: true,
                    downLoad: '119',
                },
                {
                    title: '高等数学2022学年期末综合测试卷A',
                    author: '不负韶华',
                    time: '2021.10.08',
                    like: '110',
                    liked: false,
                    downLoad: '119'
                },
                {
                    title: '高等数学2022学年期末综合测试卷A',
                    author: '不负韶华',
                    time: '2021.10.08',
                    like: '110',
                    liked: true,
                    downLoad: '119',
                },
                {
                    title: '高等数学2022学年期末综合测试卷A',
                    author: '不负韶华',
                    time: '2021.10.08',
                    like: '110',
                    liked: false,
                    downLoad: '119'
                },
                {
                    title: '高等数学2022学年期末综合测试卷A',
                    author: '不负韶华',
                    time: '2021.10.08',
                    like: '110',
                    liked: true,
                    downLoad: '119',
                },
                {
                    title: '高等数学2022学年期末综合测试卷A',
                    author: '不负韶华',
                    time: '2021.10.08',
                    like: '110',
                    liked: false,
                    downLoad: '119'
                },
            ]
        }
    },
    computed: {
        
    },
    methods:{

        // 点赞
        likeClick(i){
            this.files[i].liked = !this.files[i].liked;
            // 向后端请求，发送修改的数据，但是要考虑不能频繁操作
        },


        // 下载
        downLoadFile(){
            alert('下载中');
            // 向后端请求获取文件内容
            
            // 构建a标签，利用浏览器下载
        },

        // 修改一级标签联动修改二级标签
        firstLabelChange(e){
            // 将二三级显示范围修改
            this.secondList = this.secondContent[this.firstValue];
            this.thirdList = this.thirdContent[this.firstValue][0];
            // 将第二三级标签选中重置到第一个
            this.secondValue = 0;
            this.thirdValue = 0;
        },

        // 修改二级标签联动修改三级标签
        secondLabelChange(e){
            // 将显示范围修改
            this.thirdList = this.thirdContent[this.firstValue][this.secondValue];
            // 将第三级标签选中重置到第一个
            this.thirdValue = 0;
        }


    },
    mounted(){
        // 从后端获取数据

        // 获取三个select的option数组

        // 获取文件信息

        // 将三个select的option的数组赋值
        this.firstList = this.firstContent;
        this.secondList = this.secondContent[0];
        this.thirdList = this.thirdContent[0][0];
    }
})
</script>
<style>
    @import "../assets/css/fileList.css";
</style>
