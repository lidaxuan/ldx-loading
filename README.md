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
在`main.js`中

```js
import loading from "@lijixuan/loading";
// 初始化 可以做全局的 也可以不做
loading.initMask({
  text: "我是李大玄",
  fullscreen: true,
  // background: 'yellow',
  customClass: "",
  color: "red"
});
window.loading = loading;
```

在其他`.vue`文件中使用方法

**第一种:** 将 this 传过去

```js
async initPage() {
  loading.ploading(this);
  const res = await this.getData(this.query);
  loading.ploading(this);
  // console.log(res);
},
getData(query) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ ...query, age: 18 })
    }, 2000);
  })
}

```

**第二种:** 传个配置项

```js
loading.ploading({
  target: this,
  text: "asdasdasdasdasd"
});
setTimeout(() => {
  loading.ploading(this);
}, 4000);
```

### 二. 按钮级别

只需要将事件源传递进去. 看`click2`写法

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
