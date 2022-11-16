<template>
    <!-- 主体main -->
    <div class="w">
        <div class="main">

            <!-- 上传和下载切换 -->
            <h1 @click="upShow=true" :class="{up: upShow, upH1: upShow}">上传记录</h1><h1 @click="upShow=false" :class="{down: !upShow, downH1: !upShow}">下载记录</h1>
            <!-- 上传表 -->
            <div class="up-table" v-show="upShow">
                <table>
                    <tr>
                        <th>序号</th>
                        <th>文件名</th>
                        <th>文件分类</th>
                        <th>文件类型</th>
                        <th>上传日期</th>
                        <th>下载量</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="(item, i) in upTableTd" :key=i>
                        <td>{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{classifyArray(item.classify)}}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.upTime}}</td>
                        <td>{{item.downNum}}</td>
                        <td><a class="delete" title="删除文件重新上传，浏览量会清零，如有异议请联系管理员">删除</a>
                        </td>
                    </tr>
                </table>
            </div>

            <!-- 下载表 -->
            <div class="down-table" v-show="!upShow">
                <table >
                    <tr>
                        <th>序号</th>
                        <th>文件名</th>
                        <th>文件分类</th>
                        <th>文件类型</th>
                        <th>作者</th>
                        <th>下载量</th>
                    </tr>
                    <tr v-for="(item, i) in downTableTd" :key=i>
                        <td>{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{classifyArray(item.classify)}}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.author}}</td>
                        <td>{{item.downNum}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default ({
    name: 'upDownHistory',
    data(){
        return {
            upShow: true,
            upTableTd: [
                {
                    id: 1,
                    name: "2020年下半学期期末高数卷A",
                    classify: ["高数", "期末", "真题"],
                    type: "试卷",
                    upTime: "2022.12.09",
                    downNum: 199,
                },
                {
                    id: 2,
                    name: "2020年下半学期期末高数卷A",
                    classify: ["高数", "期末", "真题"],
                    type: "试卷",
                    upTime: "2021.12.09",
                    downNum: 559,
                }
            ],
            downTableTd: [
                {
                    id: 1,
                    name: "2020年下半学期期末高数卷A",
                    classify: ["高数", "期末", "真题"],
                    type: "试卷",
                    author: "星星鱼丸",
                    downNum: 666,
                },
                {
                    id: 2,
                    name: "2020年下半学期期末高数卷B",
                    classify: ["高数", "期末", "真题"],
                    type: "试卷",
                    author: "星星鱼丸",
                    downNum: 556,
                }
            ]
        }
    },
    computed: {
        // 将数组转换成字符串
        classifyArray(){
            return function(arr) {
                return arr.join(" ");
            }
            
        }
    },
    mounted(){

    }
})
</script>
<style>
    @import '../assets/css/upDownHistory.css';
    .upH1 {
        color: #fff !important;
        background-color: rgb(9, 193, 255);
    }
    .downH1 {
        color: #fff !important;
        background-color: pink;
    }
</style>
