## loading

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
