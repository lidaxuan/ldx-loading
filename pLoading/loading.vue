<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-11-12 15:02:18
 * @FilePath: /vue-shelf/src/views/testLoading/loading/pLoading/loading.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-11-12 15:05:32
-->
<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-11-12 09:28:42
 * @FilePath: /vue-shelf/src/views/testLoading/loading/loading.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-11-12 11:39:10
-->
<template>
  <transition name="ldx-loading-fade" @after-leave="handleAfterLeave">
    <div v-show="visible" class="ldx-loading-mask" :style="{ backgroundColor: background || '' }" :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div class="ldx-loading-spinner" :style="{ color: color || '' }">
        <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" :style="{ stroke: color || '' }" />
        </svg>
        <i v-else :class="spinner"></i>
        <p v-if="text" class="ldx-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      text: null,
      spinner: null,
      background: null,
      fullscreen: true,
      visible: false,
      customClass: '',
      color: '#409eff'
    };
  },

  methods: {
    handleAfterLeave() {
      this.$emit('after-leave');
    },
    setText(text) {
      this.text = text;
    }
  }
};
</script>
<style>
.ldx-loading-parent--relative {
  position: relative !important;
}
.ldx-loading-parent--hidden {
  overflow: hidden !important;
}
.ldx-loading-mask {
  position: absolute;
  z-index: 2000;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}
.ldx-loading-mask.is-fullscreen {
  position: fixed;
}
.ldx-loading-mask.is-fullscreen .ldx-loading-spinner {
  margin-top: -25px;
}
.ldx-loading-mask.is-fullscreen .ldx-loading-spinner .circular {
  height: 50px;
  width: 50px;
}
.ldx-loading-spinner {
  top: 50%;
  margin-top: -21px;
  width: 100%;
  text-align: center;
  position: absolute;
}
.ldx-loading-spinner .ldx-loading-text {
  /* color: #409eff; */
  margin: 3px 0;
  font-size: 14px;
}
.ldx-loading-spinner .circular {
  height: 42px;
  width: 42px;
  -webkit-animation: loading-rotate 2s linear infinite;
  animation: loading-rotate 2s linear infinite;
}
.ldx-loading-spinner .path {
  -webkit-animation: loading-dash 1.5s ease-in-out infinite;
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  /* stroke: #409eff; */
  stroke-linecap: round;
}
.ldx-loading-spinner i {
  /* color: #409eff; */
}
.ldx-loading-fade-enter,
.ldx-loading-fade-leave-active {
  opacity: 0;
}
@-webkit-keyframes loading-rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loading-rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
