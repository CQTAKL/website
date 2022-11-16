<template>
  <div>
    <cover></cover>
    <headNav></headNav>
    <announcement></announcement>
    <div class="w">
      <div class="main">
        <!-- 标题 -->
        <h1>浙江理工大学一类学科竞赛项目表</h1>
        <!-- 搜索区 -->
        <div class="search">
            <label>竞赛级别：</label><select>
                <option>全部</option>
                <option>国家级</option>
                <option>省级</option>
                <option>校级</option>
            </select>
            <label>依托单位：</label><select>
                <option>全部</option>
                <option>信息学院</option>
                <option>机控学院</option>
            </select>
            <br>
            <input type="text">
        </div>
        <!-- 表格 -->
        <table>
          <tr>
            <th>序号</th>
            <th>学科竞赛名称</th>
            <th>级别</th>
            <th>竞赛依托单位</th>
            <th>操作</th>
          </tr>
          <tr>
            <td>1</td>
            <td>“挑战杯”全国大学生课外学术科技作品（含创业计划）竞赛</td>
            <td>国家、省级</td>
            <td>校团委</td>
            <td>
              <a class="toDiscuss">讨论</a>
              <a class="toHelp">求助</a>
              <a class="toNotice">通知</a>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>大学生电子设计竞赛</td>
            <td>国家、省级</td>
            <td>信息学院、机控学院</td>
            <td>
              <a class="toDiscuss">讨论</a>
              <a class="toHelp">求助</a>
              <a class="toNotice">通知</a>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>“挑战杯”全国大学生课外学术科技作品（含创业计划）竞赛</td>
            <td>国家、省级</td>
            <td>校团委</td>
            <td>
              <a class="toDiscuss">讨论</a>
              <a class="toHelp">求助</a>
              <a class="toNotice">通知</a>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>大学生电子设计竞赛</td>
            <td>国家、省级</td>
            <td>信息学院、机控学院</td>
            <td>
              <a class="toDiscuss">讨论</a>
              <a class="toHelp">求助</a>
              <a class="toNotice">通知</a>
            </td>
          </tr>
        </table>

        <!-- 特别说明区域 -->
        <div class="explain">
          <p>
            1.特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          </p>
          <p>
            2.特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明特别说明
          </p>
          <p>3.特别说明特别说明特别说明特别说明特别说明特别说明</p>
          <p>4.特别说明特别说明特别说明特别说明特别说明特别说明</p>
          <p>5.特别说明特别说明特别说明特别说明特别说明特别说明</p>
          <p>6.特别说明特别说明特别说明特别说明特别说明特别说明</p>
          <p>7.特别说明特别说明特别说明特别说明特别说明特别说明</p>
        </div>
      </div>
    </div>
    <myFooter></myFooter>
  </div>
</template>
<script>
import cover from "./childComp/cover.vue";
import headNav from "./childComp/headNav.vue";
import myFooter from "./childComp/footer.vue";
import announcement from "./childComp/announcement.vue";
export default {
  name: "contest",
  data() {
    return {};
  },
  components: {
    cover,
    headNav,
    myFooter,
    announcement,
  },
  methods: {},
  mounted() {},
};
</script>
<style>
@import "../assets/css/contest.css";
</style>
