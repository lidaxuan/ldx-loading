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

所以我做了一层封装
