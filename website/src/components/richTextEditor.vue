<template>
    <div id="richTextEditor">        
    </div>
</template>
<script>
import E from "wangeditor";
export default ({
    name: "richTextEditor",
    data(){
        return {
            editor: null,
            editorData: ""
        }
    },
    methods: {
        getEditorData(){
            let data = this.editor.txt.html();
        },

        beforeDestroy(){
            this.editor.destroy();
            this.editor = null;
        }
    },
    mounted(){
        const editor = new E('#richTextEditor')
        const url = this.url
        editor.config.onchange = (newHtml) => {
           this.editorData = newHtml
           this.$emit("changeContent", newHtml);
        }
        editor.config.height = 500   // 设置高度
        editor.config.showLinkImg = false //隐藏网络图片
        editor.config.uploadImgServer = '/api/post/add/picture'  //图片上传的地址
        editor.config.uploadFileName = 'file' //文件传给后端的名称。类似formData.append("file", param.file);中的file
        editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']//上传图片的类型
        editor.config.uploadImgHeaders = {// 上传的请求头部
           'accept': '*/*',
           'authorization': this.$cookies.get("Authorization") ? this.$cookies.get("Authorization") : -1
        }
        // editor.config.uploadImgParams = { //上传请求的参数
        //    "test": 111
        // }
        editor.config.uploadImgHooks = { //上传图片的可使用回调函数
            // 上传图片之前
            before: function(xhr) {
                console.log(xhr)
    
                // 可阻止图片上传
                // return {
                //     prevent: true,
                //     msg: '需要提示给用户的错误信息'
                // }
            },
            // 图片上传并返回了结果，图片插入已成功
            success: function(xhr) {
                console.log('success', xhr)
            },
            // 图片上传并返回了结果，但图片插入时出错了
            fail: function(xhr, editor, resData) {
                console.log('fail', resData)
            },
            // 上传图片出错，一般为 http 请求的错误
            error: function(xhr, editor, resData) {
                console.log('error', xhr, resData)
            },
            // 上传图片超时
            timeout: function(xhr) {
                console.log('timeout')
            },
            // 图片上传并返回了结果，想要自己把图片插入到编辑器中
            // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
            customInsert: function(insertImgFn, result) {
                // result 即服务端返回的接口
                console.log('customInsert', result)
    
                // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
                insertImgFn(result.data.path);
            }
        }
        editor.config.zIndex = 0;
        editor.create();
        this.editor = editor;
    }
})
</script>