## loading

**增加了两种使用方式**

### 一. 页面级别

`import loading from "@lijixuan/loading";`

普通情况下 使用 loading 是这样的, 但是有好多处使用的话, 使用起来就很繁琐

```js
<template>
  <div class="" v-loading="loading"></div>
</template>
<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>
```

所以我做了一层封装 使用方法
`demo`

```js
<!--
 * @Description:
 * @Author: 李大玄
 * @Date: 2022-11-12 09:17:20
 * @FilePath: /vue-shelf/src/views/testLoading/index.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-11-18 18:54:26
-->
<template>
  <div class="page-asd">
<!--     <Comp></Comp>-->
<!--     <Compcopy></Compcopy>-->

    <div>
      <div v-for="item in 3" :key="item">奥术大师多反而AV方式变奥术大师多反而AV方式变奥术大师多反而AV方式变奥术大师多反而AV方式变奥术大师多反而AV方式变</div>
    </div>
    <hr/>

    <el-button  @click="click1($event)">按钮1</el-button>
    <el-button type="primary" @click="click2($event)">按钮2</el-button>
    <div type="primary" @click="click2($event)">按钮3-div</div>
  </div>
</template>

<script>
import Comp from "./comp.vue";
import Compcopy from "./compcopy.vue";
import LdxLoading from "./LdxLoading.js";

LdxLoading.init({
  text: "加载中...",
  customClass: "ldx-loading",
  color: 'green',
  fullscreen:false
})
export default {
  name: "", // Pascal命名
  mixins: [],
  components: {
    Comp,Compcopy
  },
  props: {},
  data() {
    return {
      query: {
        name: "zs"
      },
    };
  },
  mounted() {
    // this.initPage();
  },
  methods: {
    async initPage() {
      const el = document.querySelector('.page-asd')
      LdxLoading.open(el, {text: "页面加载中"});
      const res = await this.getData(this.query);
      LdxLoading.close(el);
    },
    getData(query) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({...query, age: 18});
        }, 1000);
      });
    },
    click1(event) {
      console.log("点击了")
      this.initPage();
    },
    click2(event) {
      console.log("event", Array.from(event.target.classList).includes('ldx-loading-mask'));
      const el = event.currentTarget; // 或 event.target
      LdxLoading.open(el, {text: ""});
      setTimeout(() => {
        LdxLoading.close(el);
      }, 3000);
    }
  }
};
</script>
<style lang="scss" scoped>
.page-asd {
  width: 100%;
  height: 100%;
  background: pink;
  overflow-y: auto;
}
</style>

```
