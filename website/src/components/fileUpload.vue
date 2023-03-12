<template>
    <div>
        <cover></cover>
        <headNav></headNav>
        <announcement></announcement>
        <div class="w">
            <div id="uploadArea" class="clearfix">
                <div id="uploadArea-left">
                    <h2>文件上传区域</h2>
                    <input type="file"  @change="getFileData()" ref="file" style="display:none" multiple="multiple" accept='application/pdf,application/msword,image/*,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'>
                    <div @click="getFile()" @dragover="fileDragover($event)" @drop="fileDrop($event)">点击此处或拖拽文件到此处上传</div>
                    <button @click="upload()">上传所有文件</button>
                </div>
                <div id="uploadArea-right">
                    <h2>上传文件列表</h2>
                    <ul>
                        <li v-for="(item, i) in fileInfo" :key=i v-show="item.isShow">
                            <span :title="item.name">{{titleHandle(item.name, 30)}}</span>
                            <div @click="deleteFile(i)">删除</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="uploadInfo">
                <h2>上传记录</h2>
                <ul>
                    <li v-for="(item, i) in uploadResult" :key=i>
                        <span :title="item.name">{{titleHandle(item.name, 45)}}</span><span :class="{red: !item.result, green: item.result}">{{item.result?"上传成功":"上传失败"}}</span><span>{{item.info}}</span>
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
import announcement from './childComp/announcement.vue';
export default ({
    name: 'fileUpload',
    data(){
        return {
            fileName: '',
            MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
            data:[],
            fileInfo: [],
            uploadResult: [],
            acceptFileEnd: ['doc','jpg','png','bmp','pdf','xlsx'],
        }
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
    },
    methods: {
        // 重定向到点击了input，来触发input的onchange上传文件事件
        getFile(){
            this.$refs.file.dispatchEvent(new MouseEvent("click"));
        },
        // 点击上传
        getFileData () {
            let files = this.$refs.file.files;
            // 没有上传
            if(!files) return;
            // 将上传的文件缓存
            for(let i=0;i<files.length;i++){
                this.data.push(files[i]);
                this.fileInfo.push({
                    name: files[i].name,
                    isShow: true,
                })
            }
            // 清空，防止上传后再上传没有反应
            this.$refs.file.value = '';
        },
        // 拖拽上传
        fileDragover (e) {
            // 阻止浏览器默认拖拽事件
            e.preventDefault()
        },
        checkFileNameEnd(string){
            let index = string.lastIndexOf('.');
            if(index === -1) return false;
            console.log(this.acceptFileEnd.indexOf(string.slice(index+1)) !== -1);
            if(this.acceptFileEnd.indexOf(string.slice(index+1))!==-1) return true;
            return false;
        },
        fileDrop (e) {
            // 阻止浏览器默认拖拽后事件
            e.preventDefault()
            let files = e.dataTransfer.files;
            // 没有上传
            if(!files) return;
            // 将上传的文件缓存
            for(let i=0;i<files.length;i++){
                // 文件夹跳过
                if(files[i].type === "") continue;
                // 为非限定后缀跳过
                if(!this.checkFileNameEnd(files[i].name))continue;
                this.data.push(files[i]);
                this.fileInfo.push({
                    name: files[i].name,
                    isShow: true,
                })
            }
            // 清空，防止上传后再上传没有反应
            this.$refs.file.value = '';
        },

        deleteFile(index){
            this.fileInfo[index].isShow = false;
        },


        // 确认修改保存数据库
        upload () {
        // console.log(this.data);

        // 清空记录
        this.uploadResult = [];

        for(let i=0;i<this.fileInfo.length;i++){

            if(this.fileInfo[i].isShow === true){
                // 判断文件大小是否超限

                if(this.data[i].size > this.MAX_FILE_SIZE){
                    this.uploadResult.push({
                        name: this.fileInfo[i].name,
                        result: false,
                        info: "原因：文件大小大于10MB"
                    })
                    continue;
                }

                // 获取后台返回结果
                if(false){
                    this.uploadResult.push({
                        name: this.fileInfo[i].name,
                        result: false,
                        info: "原因：服务器出错"
                    })
                    continue;
                }

                // 上传成功
                this.uploadResult.push({
                    name: this.fileInfo[i].name,
                    result: true,
                    info: ""
                })                
            }
        } 
        // 清空缓存的文件
        this.data = [];
        this.fileInfo = [];  
        // console.log('test' ,this.data);
        // alert('上传成功');
        //     if (this.batchFile === '') {
        //         return alert('请选择要上传的文件')
        //     }

        //     let data = new FormData()
        //     data.append('upfile', this.batchFile)

        //     console.log(data);
        }, 
    },
    mounted(){

    },
    components: {
        cover,
        headNav,
        myFooter,
        announcement,
    }
})
</script>
<style>
@import "../assets/css/fileUpload.css";
</style>
