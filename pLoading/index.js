/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-11-12 15:02:15
 * @FilePath: /vue-shelf/src/views/testLoading/loading/pLoading/index.js
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-11-12 17:45:46
 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-11-12 09:25:34
 * @FilePath: /vue-shelf/src/views/testLoading/loading/index.js
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-11-12 15:01:13
 */
import Vue from 'vue';
import loadingVue from './loading.vue';
import { addClass, removeClass, addStyle, afterLeave } from '../utils/dom.js';
const LoadingConstructor = Vue.extend(loadingVue);

LoadingConstructor.prototype.originalPosition = '';
LoadingConstructor.prototype.originalOverflow = '';

let defaults = {
  text: null,
  fullscreen: true,
  body: true,
  lock: true,
  customClass: ''
};
let fullscreenLoading;

LoadingConstructor.prototype.close = function () {
  if (this.fullscreen) {
    fullscreenLoading = undefined;
  }
  afterLeave(this, _ => {
    const target = this.fullscreen || this.body
      ? document.body
      : this.target;
    removeClass(target, 'ldx-loading-parent--relative');
    removeClass(target, 'ldx-loading-parent--hidden');
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    this.$destroy();
  }, 300);
  this.visible = false;
};


const map = new Map();

export const ploading = (event) => {
  const query = {
    target: event.$el || (event.target ? event.target.$el : '') || document.body,
    fullscreen: event.fullscreen || defaults.fullscreen || true,
    text: event.text || defaults.text || '',
    background: event.background || defaults.background || '',
    spinner: event.spinner || '',
    customClass: event.customClass || defaults.customClass || '',
    color: event.color || defaults.color || '#409eff'
  }
  if (Vue.prototype.$isServer) return;
  let options = Object.assign({}, defaults, query);
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target);
  }
  options.target = options.target || document.body;

  if (options.target !== document.body) {
    options.fullscreen = false;
  } else {
    options.body = true;
  }
  if (options.fullscreen && fullscreenLoading) {
    return fullscreenLoading;
  }
  const id = `${event._uid || event.target._uid}-${(event.$vnode ? event.$vnode.tag : '') || event.target.$vnode.tag}`;
  let instance
  if (map.has(id)) {
    instance = map.get(id);
    instance.close();
    map.delete(id);
    return
  } else {
    instance = new LoadingConstructor({
      el: document.createElement('div'),
      data: options
    });
    map.set(id, instance);
  }

  let parent = options.body ? document.body : options.target;
  addStyle(options, parent, instance);
  if (instance.originalPosition !== 'absolute' && instance.originalPosition !== 'fixed') {
    addClass(parent, 'ldx-loading-parent--relative');
  }
  if (options.fullscreen && options.lock) {
    addClass(parent, 'ldx-loading-parent--hidden');
  }
  parent.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.visible = true;
  });
  if (options.fullscreen) {
    fullscreenLoading = instance;
  }
  return instance;
};

export const initMask = function (options) {
  defaults = Object.assign({}, defaults, options);
}
