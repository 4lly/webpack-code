const json = require('./index.json');//common.js
import {add} from './other.js'; //es moudule
import './assets/css/base.css';
import './assets/less/index.less';
import './assets/font/iconfont.css';
import pic from "./assets/images/goods1.png"
import axios from "axios"
import jquery from "jquery"
import _ from "lodash"
console.log(jquery)
var img = new Image();
img.src = pic;
img.classList.add("logo");
var root = document.getElementById("root");
root.append(img);

var ele = document.createElement('span'); //创建一个节点
ele.setAttribute('class','iconfont icon-jian');
root.append(ele);
// require('./index.less');
console.log(json,add(2,3));
axios.get("/api/info").then(res=>{
  console.log(res)
})

var btn = document.createElement("button");
btn.innerHTML = "新增";
document.body.appendChild(btn);
btn.onclick = function() {
  var div = document.createElement("div");
  div.innerHTML = "item";
  document.body.appendChild(div);
};

//index.js
const arr = [new Promise(() => {}), new Promise(() => {})];
arr.map(item => {
  console.log(item);
});

console.log(_.chunk([1,2,3,4,5,6,7,8,9],2))