 <template>
  <div>
    <cover></cover>
    <headNav></headNav>
    <announcement></announcement>
    <div class="w">
      <div id="fileListBox">
        <!-- 搜索区域 -->
        <div id="fileListSearch">
          <input type="text" v-model="searchInput" placeholder="请输入资料名称/上传者/科目等" /><button class="searchButton" @click="search()">搜索</button><button>我要上传</button><button>求取资料</button>
          <br />
          <span>历史记录：</span>
          <span v-for="(item, index) in searchHistory" :key="index">{{item}}</span>
          <span @click="deleteSearchHistory()" v-show="this.searchHistory.length > 0">全部删除</span>
        </div>
        <div id="searchResultOption" v-show="searchHistory.length > 0">
            "<strong>{{searchHistory[0]}}</strong>" 已检测到 <strong>234</strong> 条结果。
            <button>反馈</button><button>申请管理员</button>
        </div>
        <!-- 三级级联标签 -->
        <!-- <div id="fileListSetting">
          <label for="">一级选项：</label>
          <select @change="firstLabelChange" v-model="firstValue">
            <option :value="i" v-for="(item, i) in firstList" :key="i">
              {{ item }}
            </option>
          </select>
          <label for="">二级选项：</label>
          <select @change="secondLabelChange" v-model="secondValue">
            <option :value="i" v-for="(item, i) in secondList" :key="i">
              {{ item }}
            </option>
          </select>
          <label for="">三级选项：</label>
          <select v-model="thirdValue">
            <option :value="i" v-for="(item, i) in thirdList" :key="i">
              {{ item }}
            </option>
          </select>
        </div> -->
        <!-- 文件列表 -->
        <!-- 左右滚动栏 -->
        <div id="fileList">
          <div class="horiScrollBar">
            <i class="leftArrow" @click="leftSlide()" v-show="currentScrollIndex!==1">&#xe645;</i>
            <i class="rightArrow" @click="rightSlide()" v-show="currentScrollIndex!==Math.ceil(horiScrollList.length / 10)">&#xe60b;</i>
            <div class="horiScrollArea">
              <ul class="clearfix" :style="{width: scrollWidth(), marginLeft: scrollMarginLeft}">
              <li v-for="(item, i) in horiScrollList" :key=i>{{item}}</li>
            </ul>
            </div>
        </div>
          <!-- ***一个文件*** -->
          <div class="file" v-for="(item, i) in files" :key="i">
            <span class="title" :title="item.title">{{ titleHandle(item.title, 40) }}</span><i class="top">置顶</i><i class="prime">精华</i><i class="hot">火热</i>
            <br />
            <span class="fileAuthor" @click="goToAuthorIndex(i)">{{ item.author }}</span><span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
            <span>{{ item.time }}</span><span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
            <span>{{ item.size }}</span>
            <div class="fileOption">
              <ul class="clearfix">
                <li title="了解卷子详细题解？点击这里">讨论区</li>
                <li @click="likeClick(i)" title="点赞">
                  <a
                    class="iconfont"
                    :class="{
                      'icon-dianzan': !item.liked,
                      'icon-dianzan_kuai': item.liked,
                    }"
                  ></a><span>{{ item.like }}</span>
                </li>
                <li @click="collectClick(i)" title="收藏">
                  <a
                    class="iconfont"
                    :class="{
                      'icon-shoucang': !item.collected,
                      'icon-shoucang1': item.collected,
                    }"
                  ></a><span>{{ item.collect }}</span>
                </li>
                <li @click="downLoadFile()" title="下载">
                  <a>&#xe619;</a><span>{{ item.downLoad }}</span>
                </li>
                <li>
                  <a>&#xe670;</a>
                  <ul class="otherOption">
                    <li>举报</li>
                    <li>勘误</li>
                    <li>反馈</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pageInfo">
      当前位于第 <strong>1</strong> 页，本页共 <strong>10</strong> 条数据，共 <strong>5</strong> 页
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
export default {
  name: "fileList",
  data() {
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
      firstContent: [
        "一级标签1",
        "一级标签2",
        "一级标签3",
        "一级标签4",
        "一级标签5",
      ],
      // 后端获取的全部二级option
      secondContent: [
        ["二级标签11", "二级标签12"],
        ["二级标签21", "二级标签22"],
        ["二级标签31", "二级标签32"],
        ["二级标签41", "二级标签42"],
        ["二级标签51", "二级标签52"],
      ],
      // 后端获取的全部三级option
      thirdContent: [
        [
          ["三级标签111", "三级标签112", "三级标签113"],
          ["三级标签121", "三级标签122", "三级标签123"],
        ],
        [
          ["三级标签211", "三级标签212", "三级标签213"],
          ["三级标签221", "三级标签222", "三级标签223"],
        ],
        [
          ["三级标签311", "三级标签312", "三级标签313"],
          ["三级标签321", "三级标签322", "三级标签323"],
        ],
        [
          ["三级标签411", "三级标签412", "三级标签413"],
          ["三级标签421", "三级标签422", "三级标签423"],
        ],
        [
          ["三级标签511", "三级标签512", "三级标签513"],
          ["三级标签521", "三级标签522", "三级标签523"],
        ],
      ],
      // 后端获取的显示文件信息
      files: [
        {
          title: "高等数学2022学年期末综合测试卷A.pdf",
          author: "不负韶华",
          size: '500MB',
          time: "2021-10-08",
          like: "110",
          collect: "230",
          liked: false,
          collected: false,
          downLoad: "119",
        },
        {
          title: "高等数学高等数学高等数学高等数学高等数学高等数学高等数学.pdf",
          author: "不负韶华",
          size: '500MB',
          time: "2021-10-08",
          like: "110",
          collect: "230",
          liked: false,
          collected: false,
          downLoad: "119",
        },
        {
          title: "高等数学2022学年期末综合测试卷A.pdf",
          author: "不负韶华",
          size: '500MB',
          time: "2021-10-08",
          like: "110",
          collect: "230",
          liked: false,
          collected: false,
          downLoad: "119",
        },
        {
          title: "高等数学高等数学高等数学高等数学高等数学高等数学高等数学.pdf",
          author: "不负韶华",
          size: '500MB',
          time: "2021-10-08",
          like: "110",
          collect: "230",
          liked: false,
          collected: false,
          downLoad: "119",
        },
        {
          title: "高等数学2022学年期末综合测试卷A.pdf",
          author: "不负韶华",
          size: '500MB',
          time: "2021-10-08",
          like: "110",
          collect: "230",
          liked: false,
          collected: false,
          downLoad: "119",
        },
        {
          title: "高等数学高等数学高等数学高等数学高等数学高等数学高等数学.pdf",
          author: "不负韶华",
          size: '500MB',
          time: "2021-10-08",
          like: "110",
          collect: "230",
          liked: false,
          collected: false,
          downLoad: "119",
        },
        {
          title: "高等数学2022学年期末综合测试卷A.pdf",
          author: "不负韶华",
          size: '500MB',
          time: "2021-10-08",
          like: "110",
          collect: "230",
          liked: false,
          collected: false,
          downLoad: "119",
        },
        {
          title: "高等数学高等数学高等数学高等数学高等数学高等数学高等数学.pdf",
          author: "不负韶华",
          size: '500MB',
          time: "2021-10-08",
          like: "110",
          collect: "230",
          liked: false,
          collected: false,
          downLoad: "119",
        },
        {
          title: "高等数学2022学年期末综合测试卷A.pdf",
          author: "不负韶华",
          size: '500MB',
          time: "2021-10-08",
          like: "110",
          collect: "230",
          liked: false,
          collected: false,
          downLoad: "119",
        },
      ],

      
      searchHistory: [
        "高数",
        "真题",
        "历年模拟",
        "必刷题",
        "历史"
      ],
      searchInput: "",
      currentScrollIndex: 1,
      scrollMarginLeft: "0px",
      horiScrollList: [
        "推荐",
        "高数",
        "真题",
        "历年模拟",
        "必刷题",
        "历史",
        "高数",
        "真题",
        "历年模拟",
        "必刷题",
        "历史",
        "高数",
        "真题",
        "历年模拟",
        "必刷题",
        "高数",
        "真题",
        "历年模拟",
        "必刷题",
        "历史",
        "高数",
        "真题",
        "历年模拟",
        "必刷题",
        "高数",
        "真题",
        "历年模拟",
        "必刷题",
        "历史",
        "高数",
        "真题",
        "历年模拟",
        "必刷题"
      ],
    };
  },
  computed: {
    // 文件名过长处理
    titleHandle(){
      return function(title, maxLen) {
        let index = title.lastIndexOf('.');
        let fileType = title.slice(index);
        for(let i=0;i<index;i++) {
          if(title[i].charCodeAt(0) >= 0 && title[i].charCodeAt(0) <= 128) {
            maxLen--;
          }else {
            maxLen -= 2;
          } 
          if(maxLen <= 0) {
            return title.slice(0, i) + "..." + fileType;
          } 
        }
        return title;
      }
    },

    scrollWidth(){
      return function(){
        // 一行可以同时显示10个, 1000为容器长度
        return Math.ceil(this.horiScrollList.length / 10) * 1000 + 'px';
      } 
    }
  },
  methods: {
    // 点赞
    likeClick(i) {
      console.log('sd');
      this.files[i].liked = !this.files[i].liked;
      // 向后端请求，发送修改的数据，但是要考虑不能频繁操作
    },

    // 收藏
    collectClick(i) {
      this.files[i].collected = !this.files[i].collected;
      // 向后端请求，发送修改的数据，但是要考虑不能频繁操作
    },

    // 下载
    downLoadFile() {
      alert("下载中");
      // 向后端请求获取文件内容

      // 构建a标签，利用浏览器下载
    },

    // 修改一级标签联动修改二级标签
    firstLabelChange(e) {
      // 将二三级显示范围修改
      this.secondList = this.secondContent[this.firstValue];
      this.thirdList = this.thirdContent[this.firstValue][0];
      // 将第二三级标签选中重置到第一个
      this.secondValue = 0;
      this.thirdValue = 0;
    },

    // 修改二级标签联动修改三级标签
    secondLabelChange(e) {
      // 将显示范围修改
      this.thirdList = this.thirdContent[this.firstValue][this.secondValue];
      // 将第三级标签选中重置到第一个
      this.thirdValue = 0;
    },

    // 删除搜索记录
    deleteSearchHistory(){
        this.searchHistory = [];
    },

    // 点击搜索
    search(){
        // 如果输入为空，return
        if(this.searchInput.trim() === "") return;
        // this.searchInput为输入内容字符串
        // 数据库查询
        // 保存到this.files = [];
        // 添加到搜索记录
        this.searchHistory.unshift(this.searchInput);
        this.searchInput = "";
    },

    // 点击文件作者前往主页
    goToAuthorIndex(index){
        alert(index);
    },

    // 横向滚动栏左右移动
    leftSlide(){
       this.currentScrollIndex--;
       let coefficient = 0.9;
       let step = 140;
       let marginLeft = parseInt(this.scrollMarginLeft);
       let time = setInterval(()=>{
          this.scrollMarginLeft = Math.floor(parseInt(this.scrollMarginLeft) + step) + 'px';
          step *= coefficient;
          if(parseInt(this.scrollMarginLeft) > marginLeft + 1000){
            clearInterval(time);
            this.scrollMarginLeft = marginLeft + 1000 + 'px';
          }
       },60);
    },

    rightSlide(){
      this.currentScrollIndex++;
       let coefficient = 0.9;
       let step = 140;
       let marginLeft = parseInt(this.scrollMarginLeft);
       let time = setInterval(()=>{
          this.scrollMarginLeft = Math.floor(parseInt(this.scrollMarginLeft) - step) + 'px';
          step *= coefficient;
          if(parseInt(this.scrollMarginLeft) < marginLeft - 1000){
            clearInterval(time);
            this.scrollMarginLeft = marginLeft - 1000 + 'px';
          }
       },60);
    }
  },
  mounted() {
    // 从后端获取数据

    // 获取三个select的option数组

    // 获取文件信息

    // 将三个select的option的数组赋值
    this.firstList = this.firstContent;
    this.secondList = this.secondContent[0];
    this.thirdList = this.thirdContent[0][0];
  },
  components: {
    cover,
    headNav,
    myFooter,
    announcement,
    jumpBar,
}
};
</script>
<style>
@import "../assets/css/fileList.css";
</style>
