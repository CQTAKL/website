<template>
    <v-md-editor
      v-model="editor"
      height="400px"
      left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code emoji | save"
      :disabled-menus="[]"
      @upload-image="onUploadImage"
      @change="changeFn"
      ></v-md-editor>
  </template>
<script>
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor';
import {fileUpload} from "@/assets/js/myAxios.js";
export default ({
    data() {
      return {
        editor: '',
      }
    },
    mounted() {
        document.querySelector('.v-md-editor').style.height = document.body.offsetHeight - 50 + 'px'
    },
    methods: {
         // 修改图片
         changeFn(){
          let html = xss.process(VueMarkdownEditor.themeConfig.markdownParser.render(this.editor));
          this.$emit("changeContent", html);
         },
         // 上传图片
        onUploadImage(event, insertImage, files) {
            const file = files[0];
            console.log(file);
            fileUpload('/post/add/picture').then(res => {
                const {code, msg, data} = res;
                if(code === "200") {
                  insertImage({
                      url: data.path,
                      desc: files[0].name
                  })
                }
            })
        }
    }
})
</script>
<style scoped>
.vuepress-markdown-body h1{ font-size: 28px; }
.vuepress-markdown-body h2{ font-size: 26px; }
.vuepress-markdown-body h3{ font-size: 24px; }
.vuepress-markdown-body h4{ font-size: 22px; }
.vuepress-markdown-body h5{ font-size: 20px; }
.vuepress-markdown-body:not(.custom){padding: 5px 10px!important;}
</style>