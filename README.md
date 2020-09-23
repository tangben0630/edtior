<<<<<<< HEAD
# edtior
编辑页面
=======
[TOC]



------



#### 项目介绍

TG_EDITOR 项目只包含一个页面，功能是为已经创建的应用进行页面设计，属于天工商户后台的子项目，用户可以按照项目中提供的功能，制作出属于自己的网站。在天工商户后台，从应用->应用列表->创建应用->创建设计->编辑，即进入该项目首页。
目前项目提供的功能有
- 创建自建页，可以对自建页面进行重命名、复制、删除、设为首页、设置样式
- 在每个页面中添加模块：文字、图片、轮播图、分类导航、展区、头部、分割线、全局导航，并且可以在设置区修改各个模块的默认样式
- 保存、预览当前设计
#### 代码前准备
##### 安装环境
- node  10.13.0+
- webpack   3.6.0+
- vue  3.0.0-rc.11
##### 启动命令

- 安装依赖 npm install
- 运行项目 npm/cnpm run dev

##### 兼容环境

- Android 4.1

- iOS 7.1

- Chrome > 31

- ff > 31

- ie >= 8

  
#### 文件说明

##### 目录

├── build                                                                               // webpack 配置                     
│    ├── webpack.common.js                                             // 基本配置       
│    ├── webpack.dev.js                                                       // 开发环境配置       
│    ├── webpack.prod.js                                                    // 生产环境配置

├── node_modules                                                             // 安装依赖        

├── src                                                                                   // 项目主要内容

│    ├── assets                                                                      //  公用资源

│            ├── image                                                              //  放置一些图片，如logo等 

│            ├── js

│                     ├── common.js                                            // 公共方法

│                     └── http.js                                                    //  请求接口 封装的方法

│            └──scss                                                                  //  公共样式

│                     ├── base.scss                                              // 提取的基础样式

│                     ├── public.scss                                            // 公用类名样式

│                     ├── reset.scss                                              // 默认样式修改

│                     └── theme.scss                                           // 项目主题色

│    ├── components                                                          //  重要内容部分

│             ├── chat                                                                // 聊天框

│             ├── editor                                                             // 区域划分

│                     ├── EdtiorBottom.vue                                // 中间区域的底部

│                     ├── LeftEdtior.vue                                       // 左侧工具栏 模块选择

│                     ├── MidEdtior.vue                                       // 中间编辑区域 （包含中间单个模块列表和旁边的设置

​                                                                                                // 工具）

│                     └── RightEdtior.vue                                     // 右侧设置区域   （包含基础设置和高级设置）

│             ├── header                                                            // 页面顶部区域  （包含设计名称、保存、主题设置、预览等功能）

│             ├── public                                                              // 提取的基础样式

│                     ├── editor                                                      // 左侧工具栏 模块选择

│                     ├── global                                                      // 左侧工具栏 模块选择

│                     ├── modal                                                     // 左侧工具栏 模块选择

│                     ├── setstyle                                                    // 左侧工具栏 模块选择

│             ├── template                                                         // 与左侧模块对应  单个模块在中间区域展示的各个组件

│             └── tool                                                                  // 包含了 1、中间区域的 右边设置按钮  2、页面设置

​                                                                                                  // 3、最左侧页面和模块列表  4、右侧基础和高级设置

│    ├── mixin                                                                        // 引入到组件中的公用方法

│             ├── chatMixin.js                                                   // 聊天部分 

│             ├── editor.js                                                          //  添加单个模块的方法和数据

│             ├── templateMixin.js                                           //  中间区域 点击选中方法事件

│             └── setMixin.js                                                     //  公用方法

│    ├── store                                                                         //  存储数据  需要设置的参数 和 修改的数据 大部分在这

│    ├── App.vue                                                                    //  项目根组件，引入局部组件

│    └── main.js                                                                      // 项目入口文件

├── index.html                                                                      // 首页入口文件，可以添加一些 meta，引入script

├── package.json                                                                   // 包文件信息      

├── postcss.config.js                                                             // 

├── tsconfig                                                                            //        

  ##### 常规操作说明

-  添加单个模块

  例如：添加文字

  1. 需要在 *src/store/state.js* 文件中 找到 curTemplateList 数组 , 添加如下代码形式

     ```json
        curTemplateList: [ 
            {
               title: "文字",
               id: 1,
               curName: '标题组件',
               icon: 'iconwenzi',
               name: '标题组件',
               isDisabled: false,
             }
         ]
     ```

     此时在页面左侧 工具、模块 可以看到新添加的 对应 **文字** 模块

  2. 在 *src/mixin/editor.js* 文件中，找到 getModuleData 方法，  按照switch...case...添加模块名称，即“文字”，按照原有的数据格式复制一份，正常都是 设置 setData 中的数据

     ```javascript
         getModuleData (txt, len) {
           let obj = {};
           switch (txt) {
             case "文字":
               obj = {
                 url: "./template/title",
                 name: "Title",
                 style: {},
                 moduleName: "文字",
                 reName: txt + len,
                 copyTime: 0,
                 isCopy: false,
                 height: 30,
                 id: this.$store.state.pageList[this.$store.state.pageIndex].comId,
                 setData: {
                 }
               }
             break;
           }
         }
     ```

  3. 右侧设置区域需要 添加单个设置组件

     已经写好的公共组件可以修改数据 直接使用，只需根据当前组件修改不同值；

     如果是个新组件，可以按照原有数据格式，做些修改，新组件在*src/components/public/setstyle* 中添加。代码如下

     ```json
     setData: {
         setStyleList: [
           {
              name: "SetColor",
              title: "文本颜色",
              attr: "color",
              sets: ["#f90220", "#6236FF", "#0091FF", "#FDD713"]
           },
         ]
     }
     ```

     name----- 组件名称  与 设置引入名称一致

     title------- 标题

     attr------- 需要设置的属性

     sets：[]  ------- 多项选择数组

     

  4. 在 *src/components/template*文件中 新建 *文字* 文件， 在此文件中按照设计稿样式 ，显示的参数与设置的参数保持一致，这样是实时更新，注意有些固定的设置字段和方法直接使用，如下

     ```html
     <template>
       <div
         class="title com-template"
         :id="comIndex"
         :class="{ shadow: msg.isOnclick && msg.isShow, noheight: !msg.isShow}"
         :style="{
           backgroundColor: msg.style.backgroundColor,
           color: msg.style.color,
           fontSize: msg.style.fontSize,
           textAlign: msg.style.textAlign,
           paddingLeft: msg.isShow ? msg.style.paddingLeft + 'px' : 0,
           paddingRight: msg.isShow ?msg.style.paddingLeft + 'px' : 0,
         }"
         @mousedown="comDown()"
       >
         {{ msg.content }}
         <a v-if="msg.isA"></a>
       </div>
     </template>
     ```

     



#### 常见问题说明 

​    **文件名称**

- 需使用语义化命名方式
- 重要文件可采取大写命名
- **注意**： 在 src/components/public 目录下的所有文件中 必须使用小写命名文件或文件夹。原因是在后端运行上线时 使用驼峰命名会导致报错。

​    **数据**

​    项目中关于设置的数据，需按照原有的数据格式进行添加或者修改，如果有需要变化的数据格式，需告知前端同事一起商量，因为数据格式是整个项目至关重要的部分，一旦更改则必须统一。

   **首页引入文件**

   **注意**： 不可以在 main.js 中 import 引入，会影响编译速度

   都放在首页入口 index.html 中，链接引入，且链接需换成本公司的阿里云服务器





​    **用到的插件**

- 拖动 sortable      文档 http://www.sortablejs.com/-
- 复制 clipboard    文档 http://www.clipboardjs.cn/
- elementUI         文档 https://element.eleme.io/
- 轮播swiper        文档 https://www.swiper.com.cn/
- 滚动vuescroll     文档 https://vuescrolljs.yvescoding.org/
>>>>>>> first commit
