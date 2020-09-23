

export default {
  data () {
    return {
      obj: {}
    }
  },
  methods: {
    storePushComponent (txt) {
      const len = this.$store.state.pageList[this.$store.state.pageIndex].templateList.filter(item => item.moduleName == txt && !item.isCopy).length + 1
      let obj;
      this.$store.state.pageList[this.$store.state.pageIndex].comId++;
      obj = this.getModuleData(txt, len);
      if (txt == "头部") {
      } else {
        this.$store.state.pageList[this.$store.state.pageIndex].templateList.push(obj);
      }
      const id = obj.id
      this.obj = obj.setData
      this.obj.id = id
      this.$store.state.pageList[this.$store.state.pageIndex].templateList.forEach(item => {
        item.setData.isOnclick = false;
      });
      if (this.$store.state.pageList[this.$store.state.pageIndex].headerData) {
        this.$store.state.pageList[this.$store.state.pageIndex].headerData.setData.isOnclick = false;
      }
      if (this.$store.state.pageList[this.$store.state.pageIndex].isGlobalNav) {
        this.$store.state.globalNavData.setData.isOnclick = false;
      }
      if (txt == '全局导航') {
        // this.$store.state.pageList[this.$store.state.pageIndex].setting.style['paddingBottom'] = this.obj.style.height;
      } else {
        this.$store.commit("changeNowComponent", this.obj);
        obj.setData.isOnclick = true;
      }
      // 判断头部
      if (txt == "头部") {
        this.$store.state.curTemplateList.forEach((item) => {
          if (item.title == "头部") {
            this.$store.state.pageList[this.$store.state.pageIndex].setting.isUseHeight = true
            this.$store.state.pageList[this.$store.state.pageIndex].isHeader = true;
          }
        })
      }

      let scrollEL = $('.set-left').parents('.__panel');
      let contentEL = $('.set-left').parents('.__view');
      this.toPointPosition(scrollEL, contentEL, 50)
    },
    elclick (txt, $) { //左边模块列表每个 模块的点击事件
      const time = new Date().getTime();
      if (time - this.clickTime > 300) {
        this.storePushComponent(txt);
        let height = 0
        switch (txt) {
          case "文字":
            height = 30
            break;
          case "图片":
            height = 170
            break;
          case "轮播海报":
            height = 170
            break;
          case "分类导航":
            height = 80
            break;
          case "展区":
            height = 500
            break;
          case "分割线":
            height = 30
            break;
          case "头部":
            height = 40
            break;
          default:
            break;
        }
        this.$store.state.coverHeight -= height
        this.$nextTick(() => {
          if (txt == "头部") {
            $('.main').animate({ scrollTop: 0 }, 300)
          } else {
            let scrollEL = $('.main-content');
            let contentEL = $('#zhihuo-editor');
            this.toPointPosition(scrollEL, contentEL, 50)
          }
        });
        this.clickTime = time;
      }
    },
    // 页面设置点击
    pageSetClick () {
      this.$store.commit("changePageFlag", true);
    },
    // 点击和拖动模块数据
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
              setTitle: "文字设置",
              isOnclick: false,
              isShow: true,
              isBaseSet: true,
              isAdd: false,
              default: {
                backgroundColor: "rgba(255, 255, 255, 0)",
                color: "#333",
              },
              style: {
                backgroundColor: "rgba(255, 255, 255, 0)",
                color: "#333",
                fontSize: "14px",
                paddingLeft: 10,
                paddingRight: 10,
                textAlign: "left",
                function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
              },
              setStyleList: [
                {
                  name: "TemplateReName",
                  curName: txt + len
                },
                {
                  name: "SetText",
                  title: "文本",
                  attr: "content"
                },
                {
                  name: "SetFontSize",
                  title: "字体大小",
                  attr: "fontSize",
                  sets: [{
                    con: "大",
                    value: "16px"
                  },
                  {
                    con: "中",
                    value: "14px"
                  },
                  {
                    con: "小",
                    value: "12px"
                  }
                  ]
                },

                {
                  name: "SetColor",
                  title: "文本颜色",
                  attr: "color",
                  sets: ["#f90220", "#6236FF", "#0091FF", "#FDD713"]
                },
                {
                  name: "SetColor",
                  title: "背景颜色",
                  attr: "backgroundColor",
                  sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"]
                },
                {
                  name: "SetTextAlign",
                  title: "位置显示",
                  attr: "textAlign",
                  sets: [{
                    con: "居左",
                    value: "left"
                  },
                  {
                    con: "居中",
                    value: "center"
                  },
                  {
                    con: "居右",
                    value: "right"
                  }
                  ]
                },
                {
                  name: "SetPadding",//doubleselect
                  title: "左右边距",
                  attr: "paddingLeft",
                  cur: 15
                },
                {
                  name: "doubleselect", isTitle: true, title: "", limit: true, max: 28, curLen: '', id: 1,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
                }
              ],
              setHighList: [],
              content: "输入标题"
            }
          }
          break;
        case "图片":
          obj = {
            url: "./template/images",
            name: "Images",
            moduleName: "图片",
            reName: txt + len,
            copyTime: 0,
            isCopy: false,
            height: 170,
            style: {},
            id: this.$store.state.pageList[this.$store.state.pageIndex].comId,
            setData: {
              size: '300 * 150',
              imgArr: [
                {
                  name: "ImgUploadImage", src: "", title: "", limit: true, max: 28, curLen: '', id: 1,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
                }],
              setImgArr: [
                {
                  name: "ImgUploadImage", src: "", title: "", limit: true, max: 28, curLen: '', id: 1,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
                }],
              isOne: true,
              domNum: 1,
              setTitle: "图片设置",
              isOnclick: false,
              isShow: true,
              isBaseSet: true,
              isAdd: true,
              default: {
                backgroundColor: "rgba(255, 255, 255, 0)",
              },
              style: {
                backgroundColor: "#fff",
                color: "#fff",
                fontSize: "12px",
                paddingLeft: 10,
                paddingTop: 10,
                textAlign: "center",
                height: 150,
                width: 300,
                marginLeft: 10,
                marginTop: 10,
              },
              setStyleList: [
                {
                  name: "SetAdd",
                },
                {
                  name: "TemplateReName",
                  curName: txt + len
                },
                {
                  name: "Dropdown",
                  title: "展示风格",
                  attr: "",
                  sets: [],
                  drop: [{
                    name: "Arrange",
                    title: "",
                    attr: "",
                    sets: [{
                      isActive: true,
                      con: "一行一列",
                      src: "",
                      height: 150,
                      paddingLeft: 10,
                      paddingTop: 10,
                      marginLeft: 10,
                      marginTop: 10,
                      attr: "横向间距"
                    },
                    {
                      isActive: false,
                      con: "一行两列",
                      src: "",
                      height: 150,
                      paddingLeft: 10,
                      paddingTop: 10,
                      marginLeft: 10,
                      marginTop: 10
                    },
                    {
                      isActive: false,
                      con: "一行三列",
                      src: "",
                      height: 90,
                      paddingLeft: 10,
                      paddingTop: 10,
                      marginLeft: 15,
                      marginTop: 15
                    },
                    {
                      isActive: false,
                      con: "一行四列",
                      src: "",
                      height: 60,
                      paddingLeft: 10,
                      paddingTop: 10,
                      marginLeft: 20,
                      marginTop: 20
                    }
                    ]
                  }]
                },
                {
                  name: "Dropdown",
                  title: "外观设置",
                  attr: "",
                  sets: [],
                  drop: [{
                    name: "SetPadding",
                    title: "设置高度",
                    attr: "height",
                    cur: 150,
                  },
                  {
                    name: "SetPadding",
                    title: "左右边距",
                    attr: "paddingLeft",
                    cur: 10
                  },
                  {
                    name: "SetPadding",
                    title: "上下边距",
                    attr: "paddingTop",
                    cur: 10
                  },
                  {
                    isDisabled: false,
                    name: "SetPadding",
                    title: "横向间距",
                    attr: "marginLeft",
                    cur: 10
                  },
                  {
                    name: "SetPadding",
                    title: "纵向间距",
                    attr: "marginTop",
                    cur: 10
                  }
                  ]
                },
                {
                  name: "ImgDropDown",
                  title: "上传图片",
                  attr: "",
                  isAdd: true,
                  isShowBtn: true,
                  sets: [],
                  drop: [
                    {
                      name: "ImgUploadImage",
                      id: 1,
                      limit: true,
                      curLen: 0,
                      max: 5,
                    },
                  ]
                },
                {
                  name: "SetAdd",
                }
              ],
              setHighList: [{
                name: "SetTextAlign",
                title: "位置显示",
                attr: "textAlign",
                sets: [{
                  con: "居左",
                  value: "left"
                },
                {
                  con: "居中",
                  value: "center"
                },
                {
                  con: "居右",
                  value: "right"
                }
                ]
              }]
            }
          }
          break;
        case "轮播海报":
          obj = {
            url: "./template/banner",
            name: "Banner",
            moduleName: "轮播海报",
            reName: txt + len,
            copyTime: 0,
            height: 170,
            isCopy: false,
            style: {},
            id: this.$store.state.pageList[this.$store.state.pageIndex].comId,
            setData: {
              size: '300 * 150',
              imgArr: [
                {
                  name: "ImgUploadImage", src: "", title: "", limit: true, max: 28, curLen: '', id: 1,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
                },
                {
                  name: "ImgUploadImage", src: "", title: "", limit: true, max: 28, curLen: '', id: 2,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
                },
                {
                  name: "ImgUploadImage", src: "", title: "", limit: true, max: 28, curLen: '', id: 3,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
                },],
              setImgArr: [
                {
                  name: "ImgUploadImage", src: "", title: "", limit: true, max: 28, curLen: '', id: 1,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
                },
                {
                  name: "ImgUploadImage", src: "", title: "", limit: true, max: 28, curLen: '', id: 2,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
                },
                {
                  name: "ImgUploadImage", src: "", title: "", limit: true, max: 28, curLen: '', id: 3,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
                },],
              isOne: true,
              domNum: 1,
              setTitle: "轮播设置",
              isOnclick: false,
              isShow: true,
              isBaseSet: true,
              isAdd: true,
              default: {
                backgroundColor: "rgba(255, 255, 255, 0)",
              },
              style: {
                paddingLeft: 10,
                paddingTop: 10,
                height: 150,
                width: "300",
                textAlign: "right",
                delay: 3000,
                effect: "slide",
                showStyle: 1,
                signStyle: 0,
                switchstyle: "slide",
                colorActive: "#fdd713",
                colorCur: "#e5e5e5",
              },
              setStyleList: [
                {
                  name: "SetAdd",
                },
                {
                  name: "TemplateReName",
                  curName: txt + len
                },
                {
                  name: "Dropdown",
                  title: "展示风格",
                  attr: "",
                  sets: [],
                  drop: [{
                    name: "Arrangebanner",
                    title: "",
                    attr: "",
                    sets: [{
                      isActive: true,
                      src: "",
                    },
                    {
                      isActive: false,
                    },
                    {
                      isActive: false,
                    },
                    {
                      isActive: false,
                    },
                    ]
                  }]
                },
                { //Switchstyle
                  name: "Switchstyle",
                  attr: 'switchstyle',
                  cur: "slide"
                },
                { //Switchstyle
                  name: "Switchstyle",
                  attr: 'delay',
                  cur: "3 秒",
                },
                // {
                //   name: "SetPadding",
                //   title: "轮播速度",
                //   attr: "paddingLeft",
                //   unit: "秒",
                //   cur: 1.5
                // },
                {
                  name: "Signstyle",
                  title: "标识符风格",
                  width: 60,
                  attr: "textAlign",
                  sets: ["#e5e5e5", "#6236FF", "#e5e5e5"]
                },
                {
                  name: "SetTextAlign",
                  title: "标识符位置",
                  width: 60,
                  attr: "textAlign",
                  sets: [{
                    con: "居中",
                    value: "center"
                  },
                  {
                    con: "居右",
                    value: "right"
                  },
                  {
                    con: "不使用",
                    value: "left"
                  }
                  ]
                },
                {
                  name: "Dropdown",
                  title: "间距设置",
                  attr: "",
                  sets: [],
                  drop: [
                    {
                      name: "SetPadding",
                      title: "左右边距",
                      attr: "paddingLeft",
                      cur: 10
                    },
                    {
                      isDisabled: false,
                      name: "SetPadding",
                      title: "上下边距",
                      attr: "paddingTop",
                      cur: 10
                    },
                  ]
                },
                {
                  name: "ImgDropDown",
                  title: "上传图片",
                  attr: "",
                  isAdd: true,
                  isShowBtn: true,
                  sets: [],
                  drop: [
                    {
                      name: "ImgUploadImage",
                      id: 1,
                      limit: true,
                      curLen: 0,
                      max: 5,
                    },
                  ]
                },
                {
                  name: "SetAdd",
                }
              ],
              setHighList: [{
                name: "SetTextAlign",
                title: "位置显示",
                attr: "textAlign",
                sets: [{
                  con: "居左",
                  value: "left"
                },
                {
                  con: "居中",
                  value: "center"
                },
                {
                  con: "居右",
                  value: "right"
                }
                ]
              }]
            }
          }
          break;
        case "自定义":
          this.$store.state.pageList[this.$store.state.pageIndex].templateList.push({
            url: "./template/title",
            name: "Container",
            moduleName: "容器",
            reName: txt + len,
            isCopy: false,
            height: 150,
            style: {},
            id: this.$store.state.pageList[this.$store.state.pageIndex].comId,
            setData: {
              isOnclick: false,
              style: {},
              setStyleList: [],
              content: "起个名字~"
            }
          });
          break;
        case "分类导航":
          obj = {
            url: "./template/kindnav",
            name: "KindNav",
            style: {},
            moduleName: "分类导航",
            reName: txt + len,
            copyTime: 0,
            height: 50,
            isCopy: false,
            id: this.$store.state.pageList[this.$store.state.pageIndex].comId,
            setData: {
              setTitle: "分类导航",
              tag: '60x60',
              imgArr: [
                {
                  name: "ImgUploadImage", src: "", title: "导航", limit: true, max: 5, curLen: '', id: 1,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
                },
                {
                  name: "ImgUploadImage", src: "", title: "导航", limit: true, max: 5, curLen: '', id: 2,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
                },
                {
                  name: "ImgUploadImage", src: "", title: "导航", limit: true, max: 5, curLen: '', id: 3,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
                },
                {
                  name: "ImgUploadImage", src: "", title: "导航", limit: true, max: 5, curLen: '', id: 4,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
                },
                {
                  name: "ImgUploadImage", src: "", title: "导航", limit: true, max: 5, curLen: '', id: 5,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
                }],
              setImgArr: [
                {
                  name: "ImgUploadImage", src: "", title: "导航", limit: true, max: 5, curLen: '', id: 1,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
                },
                {
                  name: "ImgUploadImage", src: "", title: "导航", limit: true, max: 5, curLen: '', id: 2,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
                },
                {
                  name: "ImgUploadImage", src: "", title: "导航", limit: true, max: 5, curLen: '', id: 3,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
                },
                {
                  name: "ImgUploadImage", src: "", title: "导航", limit: true, max: 5, curLen: '', id: 4,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
                },
                {
                  name: "ImgUploadImage", src: "", title: "导航", limit: true, max: 5, curLen: '', id: 5,
                  function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
                }],
              isOnclick: false,
              isImage: true,
              isText: true,
              isShow: true,
              isBaseSet: true,
              isAdd: true,
              default: {
                backgroundColor: "rgba(255, 255, 255, 0)",
              },
              style: {
                backgroundColor: "rgba(255, 255, 255, 0)",
                borderRadius: "50%",
                showColumn: "一行五个",
                showRow: "一行",
                column: 5,
                row: 1,
                times: 1,
              },
              setStyleList: [
                {
                  name: "TemplateReName",
                  curName: txt + len
                },
                {
                  name: "Dropdown",
                  title: "导航样式",
                  attr: "",
                  sets: [],
                  drop: [
                    {
                      name: "SelectStyle",
                      title: "",
                      attr: "navstyle",
                      type: 0,
                      sets: [
                        { isActive: true, con: "", width: "70px", height: "75px", isImage: true, isText: true, src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/nav-type-1.png" },
                        { isActive: false, con: "", width: "70px", height: "75px", isImage: true, isText: false, src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/nav-type-2.png" },
                        { isActive: false, con: "", width: "70px", height: "75px", isImage: false, isText: true, src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/nav-type-3.png" },
                      ]
                    }
                  ]
                },
                {
                  name: "Dropdown",
                  title: "展示风格",
                  attr: "",
                  sets: [],
                  drop: [
                    {
                      name: "SelectStyle",
                      title: "",
                      attr: "navshape",
                      type: 1,
                      sets: [
                        {
                          items: [
                            { isDisabled: false, isActive: true, con: "", attr: "borderRadius", radius: '50%', src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/kindnav/nav-style-1.png" },
                            { isDisabled: false, isActive: false, con: "", attr: "borderRadius", radius: '0', src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/kindnav/nav-style-2.png" },
                            { isDisabled: true, isActive: false, con: "", src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/kindnav/nav-style-3.png" },
                            { isDisabled: true, isActive: false, con: "", src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/kindnav/nav-style-4.png" },
                          ]
                        },
                        {
                          items: [
                            { isDisabled: false, isActive: true, con: "", attr: "borderRadius", radius: '50%', src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/temp-img/nav-style-5.png" },
                            { isDisabled: false, isActive: false, con: "", attr: "borderRadius", radius: '0', src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/temp-img/nav-style-6.png" },
                            { isDisabled: true, isActive: false, con: "", src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/temp-img/nav-style-7.png" },
                            { isDisabled: true, isActive: false, con: "", src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/temp-img/nav-style-8.png" },
                          ]
                        },
                        {
                          items: [
                            { isDisabled: false, isActive: true, con: "", isImage: false, isText: true, radius: '50%', src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/kindnav/nav-style-9.png" },
                            { isDisabled: true, isActive: false, con: "", isImage: false, isText: true, radius: '0', src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/kindnav/nav-style-10.png" },
                            { isDisabled: true, isActive: false, con: "", isImage: false, isText: true, src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/kindnav/nav-style-11.png" },
                            { isDisabled: true, isActive: false, con: "", isImage: false, isText: true, src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/kindnav/nav-style-12.png" }
                          ]
                        },
                      ]
                    }
                  ]
                },
                {
                  name: "Dropdown",
                  title: "外观设置",
                  attr: "",
                  sets: [],
                  drop: [
                    {
                      name: "SetColor",
                      title: "背景颜色",
                      attr: "backgroundColor",
                      sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"]
                    },
                    {
                      name: "SingleSelect",
                      title: "展示列数",
                      height: "30px",
                      attr: "showColumn",
                      cwidth: "70px",
                      sets: [
                        { num: 2, name: "一行两个" },
                        { num: 3, name: "一行三个" },
                        { num: 4, name: "一行四个" },
                        { num: 5, name: "一行五个" }]
                    },
                    {
                      name: "SingleSelect",
                      title: "展示行数",
                      height: "30px",
                      attr: "showRow",
                      cwidth: "70px",
                      sets: [
                        { num: 1, name: "一行" },
                        { num: 2, name: "两行" },
                        { num: 3, name: "三行" },
                        { num: 4, name: "四行" },
                        { num: 5, name: "五行" }]
                    },
                  ]
                },
                {
                  name: "ImgDropDown",
                  title: "导航列表",
                  attr: "",
                  isAdd: true,
                  isShowBtn: true,
                  sets: [],
                  drop: [
                    {
                      name: "ImgUploadImage",
                      id: 1,
                      limit: true,
                      curLen: 0,
                      max: 5,
                    },
                  ]
                },
                {
                  name: "SetAdd",
                }
              ],
              setHighList: [],
            }
          }
          break;
        case "全局导航":
          obj = this.$store.state.globalNavData;
          break;
        case "展区":
          obj = {
            url: "./template/showarea",
            name: "ShowArea",
            style: {},
            moduleName: "展区",
            reName: txt + len,
            copyTime: 0,
            height: 500,
            isCopy: false,
            id: this.$store.state.pageList[this.$store.state.pageIndex].comId,
            setData: {
              setTitle: "展区设置",
              isOnclick: false,
              isShow: true,
              isBaseSet: true,
              isShowGroup: false,
              isUseTitle: true,
              isAdd: false,
              areaTitle: '展区标题',
              elements: {
                scale: 1,
                isImage: true,
                isTitle: true,
                isDescription: true,
                isFavorite: false,
                isPrice: true,
                isButton: true,
                isTag: false,
              },
              isGoodsFlag: false,
              isDeleteGoods: false,
              chooseProductList: [],
              chooseProductIds: [],
              defaultList: [
                {
                  id: 0,
                  goods_title: '产品名称',
                  image: '//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/temp-img/default-picture.jpg',
                  min_sell_price: '99.99',
                  goods_description: '这里是产品介绍，产品介绍为不选择状态时，整个模块隐藏，产品介绍为两行，溢出“…”显示。',
                },
                {
                  id: 0,
                  goods_title: '产品名称',
                  image: '//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/temp-img/default-picture.jpg',
                  min_sell_price: '99.99',
                  goods_description: '这里是产品介绍，产品介绍为不选择状态时，整个模块隐藏，产品介绍为两行，溢出“…”显示。',
                },
                {
                  id: 0,
                  goods_title: '产品名称',
                  image: '//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/temp-img/default-picture.jpg',
                  min_sell_price: '99.99',
                  goods_description: '这里是产品介绍，产品介绍为不选择状态时，整个模块隐藏，产品介绍为两行，溢出“…”显示。',
                },
              ],
              default: {
                backgroundColor: "rgba(255, 255, 255, 0)",
              },
              style: {
                backgroundColor: "rgba(255, 255, 255, 0)",
                paddingLeft: 10,
                paddingRight: 10,
                itemPaddingLeft: 10,
                itemPaddingTop: 10,
                paddingBottom: 0,
                paddingTop: '',
                itemWidth: "100%",
                fontSize: '',
                display: '',
                wrap: 'wrap',
                height: ''
              },
              setStyleList: [
                {
                  name: "TemplateReName",
                  curName: txt + len
                },
                {
                  name: "Dropdown",
                  title: "选择展区商品",
                  attr: "",
                  sets: [],
                  drop: [
                    {
                      name: "SingleChoice",
                      attr: "goodstype",
                      title: "商品来源",
                      sets: [
                        { title: '商品', isActive: true, isDisabled: false, opacity: 1 },
                        { title: '分类', isActive: false, isDisabled: true, opacity: 0.5 },
                        { title: '商品分组', isActive: false, isDisabled: true, opacity: 0.5 },
                      ]
                    },
                    {
                      name: "GoodsList",
                      attr: 'showarea'
                    }
                  ]
                },
                {
                  name: "Dropdown",
                  title: "标题设置",
                  attr: "",
                  sets: [],
                  drop: [
                    {
                      name: "ChooseShow",
                      attr: 'showarea',
                      title: '展区标题',
                      selectText: '使用',
                      content: '',
                      isUse: true,
                    },
                    // {
                    //   name: "TwoOptions",
                    //   attr: 'showarea',
                    //   title: '产品组名',
                    //   sets: [
                    //     { name: '显示', isShowGroup: true, isActive: true },
                    //     { name: '隐藏', isShowGroup: false, isActive: false },
                    //   ]
                    // }
                  ]
                },
                {
                  name: "Dropdown",
                  title: "产品布局",
                  attr: "",
                  sets: [],
                  drop: [
                    {
                      name: "MultiChoice",
                      attr: "goodsplot",
                      type: 'single',
                      sets: [
                        {
                          isActive: true,
                          title: "大图模式",
                          width: "100%",
                          fontSize: '14px',
                          flexWrap: 'wrap',
                          opacity: 1,
                          isDisabled: false,
                        },
                        {
                          isActive: false,
                          title: "一行两个",
                          width: "50%",
                          fontSize: '14px',
                          flexWrap: 'wrap',
                          opacity: 1,
                          isDisabled: false,
                        },
                        {
                          isActive: false,
                          title: "一行三个",
                          width: "33.3%",
                          fontSize: '12px',
                          flexWrap: 'wrap',
                          opacity: 1,
                          isDisabled: false,
                        },
                        {
                          isActive: false,
                          title: "一大两小",
                          opacity: '0.5',
                          flexWrap: 'wrap',
                          isDisabled: true,
                        },
                        {
                          isActive: false,
                          title: "详细列表",
                          width: '350px',
                          height: '110px',
                          display: 'flex',
                          paddingTop: '115px',
                          opacity: 1,
                          isDisabled: false,
                        },
                        {
                          isActive: false,
                          title: "横向滑动",
                          width: '30%',
                          fontSize: '12px',
                          flexWrap: 'no-wrap',
                          opacity: 0.5,
                          isDisabled: true,
                        },
                      ]
                    },
                    {
                      name: "SingleChoice",
                      attr: "imagescale",
                      title: "图片比例",
                      sets: [
                        { title: '1:1', scale: 1, isActive: true, isDisabled: false },
                        { title: '3:2', scale: 1.5, isActive: false, isDisabled: false },
                        { title: '3:4', scale: 0.75, isActive: false, isDisabled: false },
                        { title: '16:9', scale: 1.78, isActive: false, isDisabled: false },
                      ]
                    },
                    {
                      name: "SetPadding",
                      title: "页面边距",
                      attr: "paddingLeft",
                      cur: "10"
                    },
                    {
                      name: "SetPadding",
                      title: "图片间距",
                      attr: "itemPaddingLeft",
                      cur: "10"
                    }
                  ]
                },
                {
                  name: "Dropdown",
                  title: "商品元素",
                  attr: "",
                  sets: [],
                  drop: [
                    {
                      name: "MultiChoice",
                      attr: "goodselement",
                      type: 'multi',
                      sets: [
                        {
                          isActive: true,
                          attr: 'isImage',
                          opacity: '0.5',
                          title: "图片",
                          isDisabled: true,
                        },
                        {
                          isActive: true,
                          attr: 'isTitle',
                          title: "标题",
                          isDisabled: false,
                        },
                        {
                          isActive: true,
                          attr: 'isDescription',
                          title: "说明",
                          isDisabled: false,
                        },
                        {
                          isActive: false,
                          attr: 'isFavorite',
                          opacity: '0.5',
                          title: "收藏",
                          isDisabled: true,
                        },
                        {
                          isActive: true,
                          attr: 'isPrice',
                          title: "价格",
                          isDisabled: false,
                        },
                        {
                          isActive: true,
                          attr: 'isButton',
                          title: "按钮",
                          isDisabled: false,
                        },
                        {
                          isActive: false,
                          attr: 'isTag',
                          opacity: '0.5',
                          title: "标签",
                          isDisabled: true,
                        },
                      ]
                    }
                  ]
                },
              ],
              setHighList: [
              ],
            }
          }
          break;
        case "头部":
          obj = {
            url: "./template/header",
            name: "HeaderSet",
            style: {},
            moduleName: "头部",
            reName: "头部",
            copyTime: 0,
            isCopy: false,
            id: this.$store.state.pageList[this.$store.state.pageIndex].comId,
            height: 50,
            setData: {
              setTitle: "头部设置",
              isOnclick: false,
              isShow: true,
              isBaseSet: true,
              tag: '64x64',
              isPageMove: true,
              isAdd: false,
              number: 2,
              imgArr: [],
              twoArr: [
                {
                  name: "headersetting", positionName: "左边位置", displayText: "隐藏", isHide: false, isText: true, isImage: false, isFunction: false,
                  id: 1,
                  chooseList: [{ name: '文本', isActive: true, attr: "isText" },
                  { name: '图片', isActive: false, attr: "isImage" },
                  { name: '功能', isActive: false, attr: "isFunction" }],
                  textObj: {
                    nameTitle: "文本内容", title: "这里是标题", max: 5, limit: true, position: "left", id: 1,
                    function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
                    color: { attr: "leftTextColor", title: "文本颜色", sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"] }
                  },
                  imageObj: { src: "", id: 1, function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' } },
                  functionObj: {
                    name: "搜索框",
                    search: {
                      nameTitle: "搜索文本", title: "搜一搜", default: "请输入搜索内容", max: 10, limit: true,
                      titleStyle: "", keywords: [], id: 1,
                      color: { attr: "leftSearchColor", title: "设置颜色", sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"] }
                    },
                    return: {
                      id: 1,
                      color: { attr: "leftReturnColor", title: "设置颜色", sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"] }
                    }
                  }
                },
                {
                  name: "headersetting", positionName: "右边位置", displayText: "隐藏", isHide: false, isText: false, isImage: true, isFunction: false,
                  id: 2,
                  chooseList: [{ name: '文本', isActive: false, attr: "isText" },
                  { name: '图片', isActive: true, attr: "isImage" },
                  { name: '功能', isActive: false, attr: "isFunction" }],
                  textObj: {
                    nameTitle: "文本内容", title: "这里是标题", max: 5, limit: true, position: "left", id: 2,
                    function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
                    color: { attr: "rightTextColor", title: "文本颜色", sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"] }
                  },
                  imageObj: { src: "", id: 2, function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' } },
                  functionObj: {
                    name: "搜索框",
                    search: {
                      nameTitle: "搜索文本", title: "搜一搜", default: "请输入搜索内容", max: 10, limit: true,
                      titleStyle: "", keywords: [], id: 2,
                      color: { attr: "rightSearchColor", title: "设置颜色", sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"] }
                    },
                    return: {
                      id: 2,
                      color: { attr: "rightReturnColor", title: "设置颜色", sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"] }
                    }
                  }
                },
              ],
              threeArr: [
                {
                  name: "headersetting", positionName: "左边位置", displayText: "隐藏", isHide: false, isText: false, isImage: true, isFunction: false,
                  id: 3,
                  chooseList: [{ name: '文本', isActive: false, attr: "isText" },
                  { name: '图片', isActive: true, attr: "isImage" },
                  { name: '功能', isActive: false, attr: "isFunction" }],
                  textObj: {
                    nameTitle: "文本内容", title: "这里是标题", max: 5, limit: true, position: "left", id: 3,
                    function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
                    color: { attr: "leftTextColor", title: "文本颜色", sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"] }
                  },
                  imageObj: { src: "", id: 3, function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' } },
                  functionObj: {
                    name: "搜索框",
                    search: {
                      nameTitle: "搜索文本", title: "搜一搜", default: "请输入搜索内容", max: 10, limit: true,
                      titleStyle: "", keywords: [], id: 3,
                      color: { attr: "leftSearchColor", title: "设置颜色", sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"] }
                    },
                    return: {
                      id: 3,
                      color: { attr: "leftReturnColor", title: "设置颜色", sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"] }
                    }
                  }
                },
                {
                  name: "headersetting", positionName: "中间位置", displayText: "隐藏", isHide: false, isText: false, isImage: false, isFunction: true,
                  id: 4,
                  chooseList: [{ name: '文本', isActive: false, attr: "isText" },
                  { name: '图片', isActive: false, attr: "isImage" },
                  { name: '功能', isActive: true, attr: "isFunction" }],
                  textObj: {
                    nameTitle: "文本内容", title: "这里是标题", max: 5, limit: true, position: "left", id: 4,
                    function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
                    color: { attr: "centerTextColor", title: "文本颜色", sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"] }
                  },
                  imageObj: { src: "", id: 4, function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' } },
                  functionObj: {
                    name: "搜索框",
                    search: {
                      nameTitle: "搜索文本", title: "搜一搜", default: "请输入搜索内容", max: 10, limit: true,
                      titleStyle: "", keywords: [], id: 4,
                      color: { attr: "centerSearchColor", title: "设置颜色", sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"] }
                    },
                    return: {
                      id: 4,
                      color: { attr: "centerReturnColor", title: "设置颜色", sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"] }
                    }
                  }
                },
                {
                  name: "headersetting", positionName: "右边位置", displayText: "隐藏", isHide: false, isText: false, isImage: true, isFunction: false,
                  id: 5,
                  chooseList: [{ name: '文本', isActive: false, attr: "isText" },
                  { name: '图片', isActive: true, attr: "isImage" },
                  { name: '功能', isActive: false, attr: "isFunction" }],
                  textObj: {
                    nameTitle: "文本内容", title: "这里是标题", max: 5, limit: true, position: "left", id: 5,
                    function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
                    color: { attr: "rightTextColor", title: "文本颜色", sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"] }
                  },
                  imageObj: { src: "", id: 5, function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' } },
                  functionObj: {
                    name: "搜索框",
                    search: {
                      nameTitle: "搜索文本", title: "搜一搜", default: "请输入搜索内容", max: 10, limit: true,
                      titleStyle: "", keywords: [], id: 5,
                      color: { attr: "rightSearchColor", title: "设置颜色", sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"] }
                    },
                    return: {
                      id: 5,
                      color: { attr: "rightReturnColor", title: "设置颜色", sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"] }
                    }
                  }
                },
              ],
              style: {
                backgroundColor: "rgba(255, 255, 255, 1)",
                leftTextColor: "#000",
                rightTextColor: "#000",
                centerTextColor: "#000",
                leftSearchColor: "#333",
                centerSearchColor: "#333",
                rightSearchColor: "#333",
                leftReturnColor: "#333",
                centerReturnColor: "#333",
                rightReturnColor: "#333",
              },
              default: {
                backgroundColor: "rgba(255, 255, 255, 1)",
                leftTextColor: "#000",
                rightTextColor: "#000",
                centerTextColor: "#000",
                leftSearchColor: "#333",
                centerSearchColor: "#333",
                rightSearchColor: "#333",
                leftReturnColor: "#333",
                centerReturnColor: "#333",
                rightReturnColor: "#333",
              },
              setStyleList: [
                {
                  name: "TemplateReName",
                  curName: "头部"
                },
                {
                  name: "Dropdown",
                  title: "展示样式",
                  attr: "",
                  sets: [],
                  drop: [
                    {
                      name: "SelectStyle",
                      title: "",
                      attr: "headerstyle",
                      type: 0,
                      sets: [
                        { isActive: true, con: "", width: "70px", height: "40px", number: 2, src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/title-1.png" },
                        { isActive: false, con: "", width: "70px", height: "40px", number: 3, src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/title-2.png" },
                        { isActive: false, con: "", width: "70px", height: "40px", src: "" },
                      ]
                    }
                  ]
                },
                {
                  name: "Dropdown",
                  title: "外观设置",
                  attr: "",
                  sets: [],
                  drop: [
                    {
                      name: "SetColor",
                      title: "背景颜色",
                      attr: "backgroundColor",
                      sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"]
                    },
                  ]
                },
                {
                  name: "Dropdown",
                  title: "布局设置",
                  attr: "",
                  sets: [],
                  drop: [
                    {
                      name: "ChooseShow",
                      attr: 'header',
                      title: '是否跟随页面移动',
                      selectText: '是',
                      content: '',
                      isUse: false,
                    },
                    {
                      name: "TwoOptions",
                      attr: 'header',
                      title: '占用高度',
                      sets: [
                        { name: '占用', isActive: true, isUseHeight: true },
                        { name: '浮层', isActive: false, isUseHeight: false },
                      ]
                    },
                    {
                      name: "SetHeader",
                      id: 1,
                      limit: true,
                      curLen: 0,
                      setSelect: {
                        title: "功能选择",
                        attr: "chooseFunction",
                        cwidth: "62px",
                        height: "27px",
                        sets: [
                          { name: "搜索框" }, { name: "返回" },
                        ]
                      },
                      setSearchText: {
                        nameTitle: "搜索文本",
                        title: "搜一搜",
                        default: "请输入搜索内容",
                        max: 10,
                        limit: true,
                      },
                      setSearchStyle: {
                        attr: "searchstyle",
                        title: "展示风格",
                        sets: [
                          { title: '风格1', isActive: true, isDisabled: false },
                          { title: '风格2', isActive: false, isDisabled: true },
                        ]
                      },
                    },
                  ]
                },
              ],
              setHighList: [
              ],
            }
          }
          this.$store.state.pageList[this.$store.state.pageIndex].headerData = obj
          break;
        case "分割线":
          obj = {
            url: "./template/line",
            name: "LineCom",
            style: {},
            moduleName: "分割线",
            reName: txt + len,
            copyTime: 0,
            isCopy: false,
            height: 30,
            id: this.$store.state.pageList[this.$store.state.pageIndex].comId,
            setData: {
              setTitle: "文字设置",
              isOnclick: false,
              isShow: true,
              isBaseSet: true,
              isAdd: false,
              default: {
                backgroundColor: "rgba(255, 255, 255, 0)",
                color: "#333",
              },
              style: {
                backgroundColor: "rgba(255, 255, 255, 1)",
                color: "#333",
                paddingLeft: 15,
                paddingTop: 15,
                textAlign: "left",
                solid: 'solid',
                function: { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' }
              },
              setStyleList: [
                {
                  name: "TemplateReName",
                  curName: txt + len
                },
                {
                  name: "SetColor",
                  title: "背景颜色",
                  attr: "backgroundColor",
                  sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"]
                },
                {
                  name: "SetColor",
                  title: "线条颜色",
                  attr: "color",
                  sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"]
                },

                {
                  name: "SetPadding",//doubleselect
                  title: "左右边距",
                  attr: "paddingLeft",
                  cur: 15
                },
                {
                  name: "SetPadding",//doubleselect
                  title: "上下边距",
                  attr: "paddingTop",
                  cur: 15
                },
                {
                  name: "Lineshowstyle",
                  title: "线条样式",
                  attr: "solid",
                  sets: [{
                    con: "实线",
                    value: "solid"
                  },
                  {
                    con: "虚线",
                    value: "dashed"
                  },
                  {
                    con: "点线",
                    value: "dotted"
                  },
                  {
                    con: "空白",
                    value: "none"
                  }
                  ]
                },
              ],
              setHighList: [],
            }
          }
          break;
        default:
          break;
      }
      return obj
    },
    toPointPosition (scrollEL, contentEL, ah, type) {
      if (type == 1) {
        scrollEL.scrollTop(0)
      } else {
        let sh = scrollEL.height();
        let ch = contentEL.height();
        let H = ch + ah;
        scrollEL.animate({ scrollTop: H + 'px' }, 300)
      }
    }
  },
}
