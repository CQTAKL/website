<template>
    <div id="editorPage">
        <headNav></headNav>
        <announcement></announcement>
        <input type="text" placeholder="请输入标题" v-model="title" class="title"><button @click="switchEditor()" class="switchBtn">切换编辑器</button>
        <div id="editor">
            <component :is='isRichTextEditor ? "richTextEditor" : "mdEditor"' @changeContent="setContent"></component>
        </div>
        <button @click="commit">提交</button>
    </div>
</template>
<script>
import announcement from './childComp/announcement.vue';
import headNav from './childComp/headNav.vue';
import myFooter from './childComp/myFooter.vue';
import mdEditor from "./mdEditor.vue";
import richTextEditor from "./richTextEditor.vue";
export default ({
    name: "editor",
    data(){
        return {
            title: "",
            // 编辑器类型
            isRichTextEditor: true,
            // 编辑器内容
            content: "",
        }
    },
    components: {
        announcement,
        mdEditor,
        headNav,
        myFooter,
        richTextEditor
    },
    methods: {
        // 从子组件中获取值
        setContent(value){
            this.content = value;
        },
        switchEditor(){
            this.isRichTextEditor = !this.isRichTextEditor;
        },
        commit(){
            console.log(this.content);
            return;
            post("/post/add/rt", {
                "userId": "6",
                "title": "这是一个标题22",
                "content": this.content,
                "columnId": -1
            }).then(res => {
                // console.log(res);
                const {code, msg, data} = res;
                if(code === "200"){
                    alert("msg");
                }
            })
        }
    }
})
</script>
<style scoped>
    #editorPage {
        width: 100%;
        font-size: 16px;
        padding-top: 130px;
    }

    #editorPage .title {
        width: 60%;
        margin-left: 10%;
        height: 60px;
        background-color: #ececec;
        font-size: 20px;
        font-weight: bold;
        padding-left: 20px;
    }

    #editorPage .switchBtn{
        width: 120px;
        height: 40px;
        margin-left: calc( 20% - 120px);
        font-size: 16px;
        /* border: 2px solid black; */
        border-radius: 20px;
        /* padding-top: 8px; */
        color: #fff;
        transition: all 0.3s ease;
        background: radial-gradient( 100% 100% at 100% 0%, #89E5FF 0%, #5468FF 100% );
    }

    #editorPage .switchBtn:hover {
        -webkit-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.16);
        -moz-box-shadow:    7px 7px 5px 0px rgba(50, 50, 50, 0.16);
        box-shadow:         7px 7px 5px 0px rgba(50, 50, 50, 0.16);
    }

    #editor {
        width: 80%;
        margin: 0 10%;
    }
</style>
