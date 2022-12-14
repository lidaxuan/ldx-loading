/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-11-12 17:44:02
 * @FilePath: /ldx-loading/eLoading/index.js
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-11-12 20:41:05
 */
let BUTTONNDOM = null;
let context = '';
function getNode(event) {
  let domlist = Array.from(event.path);
  for (let i = 0; i < domlist.length; i++) {
    if (domlist[i].tagName == "BUTTON") {
      return domlist[i]
    }
  }
}
const show = (params) => {
  BUTTONNDOM.setAttribute("style", "cursor: default; pointer-events: none;position: relative;");
  BUTTONNDOM.blur();
  BUTTONNDOM.className += ' is-loading';
  context = BUTTONNDOM.innerHTML;
  BUTTONNDOM.innerHTML = '<i class="el-icon-loading"></i>' + context;
}
const close = (params) => {
  BUTTONNDOM.setAttribute("style", "cursor: pointer; pointer-events: auto;position: relative;");
  BUTTONNDOM.classList.remove("is-loading");
  BUTTONNDOM.innerHTML = context;
  BUTTONNDOM = null;
  context = '';
}

export const eloading = (event) => {
  if (!BUTTONNDOM) {
    BUTTONNDOM = getNode(event);
    show();
  } else {
    close();
  }
}