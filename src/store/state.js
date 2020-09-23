


const state = { //数据
  designId: '',
  siteId: '',
  siteName: '',
  designName: '',
  siteLink: '',
  userInfo: '',
  pageIndex: 0,
  isDelete: false, //是否进行删除操作
  deleteId: null, //是否进行删除操作
  deleteHeader: null, //是否进行删除头部操作
  globalLoading: false,//全局 loading
  globalMessage: '',//全局 loading message
  globalTime: 2000,//全局 loading  关闭时间
  isAddHtml: false,   // 全局显示 添加模版
  isImageUpload: false,  // 全局显示上传弹框
  isSetProductLink: false,  // 设置产品链接
  currentSelectedProduct: 1, //当前被选中的产品id
  previewPageId: 0, //预览具体页面id
  showViewModal: false,
  isAddTemplate: false,
  globalloadingFlag: false,
  globalloadingMsg: "",
  isDrop: true,
  isSelfPage: true,
  isAdd: false, //当前模块是否需要添加图片
  isProductModalShow: false,
  coverShow: false,
  coverHeight: 550,
  setLinkData: {
    list: [
      {
        type: '本站页面',
        content: [
          {
            name: '首页',
            link: '/'
          },
          {
            name: '登录',
            link: '/login'
          },
          {
            name: '注册',
            link: '/register'
          },
          {
            name: '个人中心',
            link: '/usercenter'
          },
        ]
      },
      {
        type: '常用功能',
        content: [
          {
            name: '返回',
            link: '/'
          }
        ]
      },
      {
        type: '链接地址',
        content: ''
      },
      {
        type: '业务产品',
        content: ''
      },
    ],
  },
  pageList: [
    {
      pageId: 0,
      pageName: '首页',
      isHome: true,
      isActive: true,
      isSystem: false,
      readonly: true,
      showSet: false,
      isPageSet: true,
      isGlobalNav: false,
      isHeader: false,
      setting: {
        title: '页面设置',
        currentIndex: 0,
        default: {
          backgroundColor: "rgba(255, 255, 255, 0)"
        },
        isPageMove: true,
        paddingAttr: 'paddingBottom',
        isUseHeight: false,
        style: {
          backgroundColor: "",
          backgroundImage: "",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "",
          currentText: '自适应',
        },
        share: {
          title: "",
          image: "",
          context: "",
          link: "",
        },
        seo: {
          title: "",
          keywords: "",
          description: "",
        },
        list: [
          {
            id: 0,
            title: '基础设置',
            isShow: true,
            setData: {
              number: [1],
              style: {
                backgroundColor: "",
                backgroundImage: "",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "",
                currentText: '自适应',
              },
              setTitle: "基础设置",
              setStyleList: [
                {
                  name: "Itemtitle",
                  title: "设置背景",
                  attr: "",
                  sets: [],
                  element: [
                    {
                      name: "SetColor",
                      title: "背景颜色",
                      attr: "backgroundColor",
                      default: "rgba(255, 255, 255, 0)",
                      sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"]
                    },
                    {
                      name: "SetImage",
                      title: "背景图片",
                      attr: "backgroundImage",
                    },
                    {
                      name: "SetBackgroundSize",
                      title: "形式",
                      attr: "currentText",
                      width: "130px",
                      height: "23px",
                      sets: [
                        { name: "自适应" },
                        { name: "拉伸" },
                        { name: "平铺" },
                        { name: "居中" },],
                    }
                  ]
                },
              ],
            },
          },
          {
            id: 1,
            title: '分享设置',
            isShow: false,
            setData: {
              number: [1],
              setTitle: "分享设置",
              style: {
                shareImage: "",
              },
              setStyleList: [
                {
                  name: "Itemtitle",
                  title: "默认分享",
                  attr: "",
                  sets: [],
                  element: [
                    {
                      name: "SetImage",
                      title: "",
                      attr: "shareImage",
                    },
                    {
                      name: "SetText",
                      title: "标题",
                      attr: "sharetitle",
                      height: '15px',
                      limit: true,
                      curLen: 0,
                      max: 28,
                      placeholder: "请输入标题"
                    },
                    {
                      name: "SetText",
                      title: "内容",
                      attr: "sharecontent",
                      limit: true,
                      curLen: 0,
                      max: 100,
                      placeholder: "请输入内容"
                    },
                  ]
                },
                {
                  name: "Itemtitle",
                  title: "链接分享",
                  attr: "",
                  sets: [],
                  element: [
                    {
                      name: "SetLink",
                      title: "",
                      attr: "shareLink",
                      link: ""
                    },
                  ]
                }
              ],
            },
          },
          {
            id: 0,
            title: 'SEO设置',
            isShow: false,
            setData: {
              number: [1],
              setTitle: "SEO设置",
              setStyleList: [
                {
                  name: "Itemtitle",
                  title: "SEO优化内容",
                  attr: "",
                  sets: [],
                  element: [
                    {
                      name: "SetText",
                      title: "标题",
                      attr: "seotitle",
                      height: '17px',
                      placeholder: "请输入标题",
                      limit: true,
                      curLen: 0,
                      max: 28,
                    },
                    {
                      name: "SetText",
                      title: "关键字",
                      attr: "seokeywords",
                      placeholder: "请输入关键字",
                      width: "183px",
                      paddingLeft: "54px",
                      limit: true,
                      curLen: 0,
                      max: 10,
                    },
                    {
                      name: "SetText",
                      title: "描述",
                      attr: "seodescription",
                      placeholder: "请输入描述",
                      limit: true,
                      curLen: 0,
                      max: 100,
                    },
                  ]
                }
              ]
            },
          },
        ]
      },
      copyTime: 0,
      nowCommponent: null,//当前组件
      addCommponent: null,//当前将要添加的组件
      comId: 0,//自增id
      templateList: [//编辑器当前的模板列表
      ],
      headerData: null
    },
    {
      pageId: 100,
      pageName: '登录',
      isActive: true,
      showSet: false,
      isSystem: true,
      isPageSet: true,
      isGlobalNav: false,
      isNoGlobal: true,
      setting: {
        title: '页面设置',
        currentIndex: 0,
        default: {
          backgroundColor: "rgba(255, 255, 255, 0)"
        },
        style: {
          backgroundColor: "",
          backgroundImage: "",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "",
          currentText: '自适应',
        },
        share: {
          title: "",
          image: "",
          context: "",
          link: "",
        },
        seo: {
          title: "",
          keywords: "",
          description: "",
        },
        list: [
          {
            id: 0,
            title: '基础设置',
            isShow: true,
            setData: {
              number: [1],
              style: {
                backgroundColor: "",
                backgroundImage: "",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "",
                currentText: '自适应',
              },
              setTitle: "基础设置",
              setStyleList: [
                {
                  name: "Itemtitle",
                  title: "设置背景",
                  attr: "",
                  sets: [],
                  element: [
                    {
                      name: "SetColor",
                      title: "背景颜色",
                      attr: "backgroundColor",
                      default: "rgba(255, 255, 255, 0)",
                      sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"]
                    },
                    {
                      name: "SetImage",
                      title: "背景图片",
                      attr: "backgroundImage",
                    },
                    {
                      name: "SetBackgroundSize",
                      title: "形式",
                      attr: "currentText",
                      width: "130px",
                      height: "23px",
                      sets: [
                        { name: "自适应" },
                        { name: "拉伸" },
                        { name: "平铺" },
                        { name: "居中" },],
                    }
                  ]
                },
              ],
            },
          },
          {
            id: 1,
            title: '分享设置',
            isShow: false,
            setData: {
              number: [1],
              setTitle: "分享设置",
              style: {
                shareImage: "",
              },
              setStyleList: [
                {
                  name: "Itemtitle",
                  title: "默认分享",
                  attr: "",
                  sets: [],
                  element: [
                    {
                      name: "SetImage",
                      title: "",
                      attr: "shareImage",
                    },
                    {
                      name: "SetText",
                      title: "标题",
                      attr: "sharetitle",
                      height: '15px',
                      limit: true,
                      curLen: 0,
                      max: 28,
                      placeholder: "请输入标题"
                    },
                    {
                      name: "SetText",
                      title: "内容",
                      attr: "sharecontent",
                      limit: true,
                      curLen: 0,
                      max: 100,
                      placeholder: "请输入内容"
                    },
                  ]
                },
                {
                  name: "Itemtitle",
                  title: "链接分享",
                  attr: "",
                  sets: [],
                  element: [
                    {
                      name: "SetLink",
                      title: "",
                      attr: "shareLink",
                      link: ""
                    },
                  ]
                }
              ],
            },
          },
          {
            id: 0,
            title: 'SEO设置',
            isShow: false,
            setData: {
              number: [1],
              setTitle: "SEO设置",
              setStyleList: [
                {
                  name: "Itemtitle",
                  title: "SEO优化内容",
                  attr: "",
                  sets: [],
                  element: [
                    {
                      name: "SetText",
                      title: "标题",
                      attr: "seotitle",
                      height: '17px',
                      placeholder: "请输入标题",
                      limit: true,
                      curLen: 0,
                      max: 28,
                    },
                    {
                      name: "SetText",
                      title: "关键字",
                      attr: "seokeywords",
                      placeholder: "请输入关键字",
                      width: "183px",
                      paddingLeft: "54px",
                      limit: true,
                      curLen: 0,
                      max: 10,
                    },
                    {
                      name: "SetText",
                      title: "描述",
                      attr: "seodescription",
                      placeholder: "请输入描述",
                      limit: true,
                      curLen: 0,
                      max: 100,
                    },
                  ]
                }
              ]
            },
          },
        ]
      },
      nowCommponent: null,//当前组件
      addCommponent: null,//当前将要添加的组件
      templateList: [],
    },
    {
      pageId: 101,
      pageName: '注册',
      isActive: false,
      showSet: false,
      isSystem: true,
      isPageSet: true,
      isGlobalNav: false,
      isNoGlobal: true,
      setting: {
        title: '页面设置',
        currentIndex: 0,
        default: {
          backgroundColor: "rgba(255, 255, 255, 0)"
        },
        style: {
          backgroundColor: "",
          backgroundImage: "",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "",
          currentText: '自适应',
        },
        share: {
          title: "",
          image: "",
          context: "",
          link: "https://baidu.com",
        },
        seo: {
          title: "",
          keywords: "",
          description: "",
        },
        list: [
          {
            id: 0,
            title: '基础设置',
            isShow: true,
            setData: {
              number: [1],
              style: {
                backgroundColor: "",
                backgroundImage: "",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "",
                currentText: '自适应',
              },
              setTitle: "基础设置",
              setStyleList: [
                {
                  name: "Itemtitle",
                  title: "设置背景",
                  attr: "",
                  sets: [],
                  element: [
                    {
                      name: "SetColor",
                      title: "背景颜色",
                      attr: "backgroundColor",
                      default: "rgba(255, 255, 255, 0)",
                      sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"]
                    },
                    {
                      name: "SetImage",
                      title: "背景图片",
                      attr: "backgroundImage",
                    },
                    {
                      name: "SetBackgroundSize",
                      title: "形式",
                      attr: "currentText",
                      width: "130px",
                      height: "23px",
                      sets: [
                        { name: "自适应" },
                        { name: "拉伸" },
                        { name: "平铺" },
                        { name: "居中" },],
                    }
                  ]
                },
              ],
            },
          },
          {
            id: 1,
            title: '',
            isShow: false,
            setData: {
              number: [1],
              setTitle: "分享设置",
              style: {
                shareImage: "",
              },
              setStyleList: [
                {
                  name: "Itemtitle",
                  title: "默认分享",
                  attr: "",
                  sets: [],
                  element: [
                    {
                      name: "SetImage",
                      title: "",
                      attr: "shareImage",
                    },
                    {
                      name: "SetText",
                      title: "标题",
                      attr: "sharetitle",
                      height: '15px',
                      limit: true,
                      curLen: 0,
                      max: 28,
                      placeholder: "请输入标题"
                    },
                    {
                      name: "SetText",
                      title: "内容",
                      attr: "sharecontent",
                      limit: true,
                      curLen: 0,
                      max: 100,
                      placeholder: "请输入内容"
                    },
                  ]
                },
                {
                  name: "Itemtitle",
                  title: "链接分享",
                  attr: "",
                  sets: [],
                  element: [
                    {
                      name: "SetLink",
                      title: "",
                      attr: "shareLink",
                      link: ""
                    },
                  ]
                }
              ],
            },
          },
          {
            id: 0,
            title: '',
            isShow: false,
            setData: {
              number: [1],
              setTitle: "SEO设置",
              setStyleList: [
                {
                  name: "Itemtitle",
                  title: "SEO优化内容",
                  attr: "",
                  sets: [],
                  element: [
                    {
                      name: "SetText",
                      title: "标题",
                      attr: "seotitle",
                      height: '17px',
                      placeholder: "请输入标题",
                      limit: true,
                      curLen: 0,
                      max: 28,
                    },
                    {
                      name: "SetText",
                      title: "关键字",
                      attr: "seokeywords",
                      placeholder: "请输入关键字",
                      width: "183px",
                      paddingLeft: "54px",
                      limit: true,
                      curLen: 0,
                      max: 10,
                    },
                    {
                      name: "SetText",
                      title: "描述",
                      attr: "seodescription",
                      placeholder: "请输入描述",
                      limit: true,
                      curLen: 0,
                      max: 100,
                    },
                  ]
                }
              ]
            },
          },
        ]
      },
      nowCommponent: null,//当前组件
      addCommponent: null,//当前将要添加的组件
      templateList: [],
    },
    {
      pageId: 102,
      pageName: '个人中心',
      isActive: false,
      showSet: false,
      isSystem: true,
      isPageSet: true,
      isGlobalNav: false,
      setting: {
        title: '页面设置',
        currentIndex: 0,
        default: {
          backgroundColor: "rgba(255, 255, 255, 0)"
        },
        style: {
          backgroundColor: "",
          backgroundImage: "",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "",
          currentText: '自适应',
        },
        share: {
          title: "",
          image: "",
          context: "",
          link: "",
        },
        seo: {
          title: "",
          keywords: "",
          description: "",
        },
        list: [
          {
            id: 0,
            title: '基础设置',
            isShow: true,
            setData: {
              number: [1],
              style: {
                backgroundColor: "",
                backgroundImage: "",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "",
                currentText: '自适应',
              },
              setTitle: "基础设置",
              setStyleList: [
                {
                  name: "Itemtitle",
                  title: "设置背景",
                  attr: "",
                  sets: [],
                  element: [
                    {
                      name: "SetColor",
                      title: "背景颜色",
                      attr: "backgroundColor",
                      default: "rgba(255, 255, 255, 0)",
                      sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"]
                    },
                    {
                      name: "SetImage",
                      title: "背景图片",
                      attr: "backgroundImage",
                    },
                    {
                      name: "SetBackgroundSize",
                      title: "形式",
                      attr: "currentText",
                      width: "130px",
                      height: "23px",
                      sets: [
                        { name: "自适应" },
                        { name: "拉伸" },
                        { name: "平铺" },
                        { name: "居中" },],
                    }
                  ]
                },
              ],
            },
          },
          {
            id: 1,
            title: '分享设置',
            isShow: false,
            setData: {
              number: [1],
              setTitle: "分享设置",
              style: {
                shareImage: "",
              },
              setStyleList: [
                {
                  name: "Itemtitle",
                  title: "默认分享",
                  attr: "",
                  sets: [],
                  element: [
                    {
                      name: "SetImage",
                      title: "",
                      attr: "shareImage",
                    },
                    {
                      name: "SetText",
                      title: "标题",
                      attr: "sharetitle",
                      height: '15px',
                      limit: true,
                      curLen: 0,
                      max: 28,
                      placeholder: "请输入标题",
                    },
                    {
                      name: "SetText",
                      title: "内容",
                      attr: "sharecontent",
                      limit: true,
                      curLen: 0,
                      max: 100,
                      placeholder: "请输入内容",
                    },
                  ]
                },
                {
                  name: "Itemtitle",
                  title: "链接分享",
                  attr: "",
                  sets: [],
                  element: [
                    {
                      name: "SetLink",
                      title: "",
                      attr: "shareLink",
                      link: ""
                    },
                  ]
                }
              ],
            },
          },
          {
            id: 0,
            title: 'SEO设置',
            isShow: false,
            setData: {
              number: [1],
              setTitle: "SEO设置",
              setStyleList: [
                {
                  name: "Itemtitle",
                  title: "SEO优化内容",
                  attr: "",
                  sets: [],
                  element: [
                    {
                      name: "SetText",
                      title: "标题",
                      attr: "seotitle",
                      height: '17px',
                      placeholder: "请输入标题",
                      limit: true,
                      curLen: 0,
                      max: 28,
                    },
                    {
                      name: "SetText",
                      title: "关键字",
                      attr: "seokeywords",
                      placeholder: "请输入关键字",
                      width: "183px",
                      paddingLeft: "54px",
                      limit: true,
                      curLen: 0,
                      max: 10,
                    },
                    {
                      name: "SetText",
                      title: "描述",
                      attr: "seodescription",
                      placeholder: "请输入描述内容",
                      limit: true,
                      curLen: 0,
                      max: 100,
                    },
                  ]
                }
              ]
            },
          },
        ]
      },
      nowCommponent: null,//当前组件
      addCommponent: null,//当前将要添加的组件
      templateList: [],
    },
  ],
  showNowPagecurTemplateList: true,
  curTemplateList: [//默认的模板组件列表
    {
      title: "文字",
      id: 1,
      curName: '标题组件',
      icon: 'iconwenzi',
      name: '标题组件',
      isDisabled: false,
    },
    {
      title: "图片",
      curName: '标题组件',
      name: '标题组件',
      icon: 'icontupian1',
      id: 2,
      isDisabled: false,
    },
    {
      title: "轮播海报",
      curName: '标题组件',
      name: '标题组件',
      icon: 'icondibudaohang',
      id: 3,
      isDisabled: false,
    },
    {
      title: "分类导航",
      curName: '标题组件',
      name: '标题组件',
      icon: 'icondibudaohang',
      id: 4,
      isDisabled: false,
    },
    {
      title: "展区",
      curName: '标题组件',
      name: '标题组件',
      icon: 'icondibudaohang',
      id: 5,
      isDisabled: false,
    },
    {
      title: "头部",
      curName: '标题组件',
      name: '标题组件',
      icon: 'icondibudaohang',
      id: 6,
      isDisabled: false,
    },
    {
      title: "分割线",
      curName: '标题组件',
      name: '标题组件',
      icon: 'icondibudaohang',
      id: 7,
      isDisabled: false,
    },
    // {
    //   title: "轮播海报",
    //   curName: '标题组件',
    //   name: '标题组件',
    //   id: 4
    // },
    // {
    //   title: "自定义",
    //   curName: '标题组件',
    //   name: '标题组件',
    //   id: 5
    // },
  ],
  myTemplateList: [],
  myPageList: [],
  colorPickers: [],
  colorPickersId: 0,
  elHeight: 0,
  pageData: {
    pageId: 0,
    pageName: '首页',
    isHome: true,
    isActive: true,
    readonly: true,
    showSet: false,
    isPageSet: true,
    isGlobalNav: false,
    isHeader: false,
    isUseHeight: false,
    setting: {
      title: '页面设置',
      currentIndex: 0,
      paddingAttr: 'paddingBottom',
      isUseHeight: false,
      isPageMove: true,
      style: {
        backgroundColor: "",
        backgroundImage: "",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "",
        currentText: '自适应',
      },
      share: {
        title: "",
        image: "",
        context: "",
        link: "",
      },
      seo: {
        title: "",
        keywords: "",
        description: "",
      },
      list: [
        {
          id: 0,
          title: '基础设置',
          isShow: true,
          setData: {
            number: [1],
            style: {
              backgroundColor: "",
              backgroundImage: "",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "",
              currentText: '自适应',
            },
            setTitle: "基础设置",
            setStyleList: [
              {
                name: "Itemtitle",
                title: "设置背景",
                attr: "",
                sets: [],
                element: [
                  {
                    name: "SetColor",
                    title: "背景颜色",
                    attr: "backgroundColor",
                    default: "rgba(255, 255, 255, 0)",
                    sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"]
                  },
                  {
                    name: "SetImage",
                    title: "背景图片",
                    attr: "backgroundImage",
                  },
                  {
                    name: "SetBackgroundSize",
                    title: "形式",
                    attr: "currentText",
                    width: "130px",
                    height: "23px",
                    sets: [
                      { name: "自适应" },
                      { name: "拉伸" },
                      { name: "平铺" },
                      { name: "居中" }],
                  },
                ]
              },
            ],
          },
        },
        {
          id: 1,
          title: '分享设置',
          isShow: false,
          setData: {
            number: [1],
            setTitle: "分享设置",
            setStyleList: [
              {
                name: "Itemtitle",
                title: "默认分享",
                attr: "",
                sets: [],
                element: [
                  {
                    name: "SetImage",
                    title: "背景图片",
                    attr: "shareImage",
                  },
                  {
                    name: "SetText",
                    title: "标题",
                    attr: "sharetitle",
                    height: '15px',
                    limit: true,
                    curLen: 0,
                    max: 28,
                    placeholder: "请输入标题"
                  },
                  {
                    name: "SetText",
                    title: "内容",
                    attr: "sharecontent",
                    limit: true,
                    curLen: 0,
                    max: 100,
                    placeholder: "请输入内容"
                  },
                ]
              },
              {
                name: "Itemtitle",
                title: "链接分享",
                attr: "",
                sets: [],
                element: [
                  {
                    name: "SetLink",
                    title: "",
                    attr: "shareLink",
                    link: ""
                  },
                ]
              }
            ],
            style: {
              shareImage: ""
            }
          },
        },
        {
          id: 0,
          title: 'SEO设置',
          isShow: false,
          setData: {
            number: [1],
            setTitle: "SEO设置",
            setStyleList: [
              {
                name: "Itemtitle",
                title: "SEO优化内容",
                attr: "",
                sets: [],
                element: [
                  {
                    name: "SetText",
                    title: "标题",
                    attr: "seotitle",
                    height: '17px',
                    placeholder: "请输入标题"
                  },
                  {
                    name: "SetText",
                    title: "关键字",
                    attr: "seokeywords",
                    placeholder: "请输入关键字",
                    width: "183px",
                    paddingLeft: "54px",
                  },
                  {
                    name: "SetText",
                    title: "描述",
                    attr: "seodescription",
                    placeholder: "请输入描述"
                  },
                ]
              }
            ]
          },
        },
      ]
    },
    copyTime: 0,
    nowCommponent: null,//当前组件
    addCommponent: null,//当前将要添加的组件
    comId: 0,//自增id
    templateList: [//编辑器当前的模板列表
    ],
    headerData: null,
  },
  globalNavData: {
    url: "./template/globalnav",
    name: "GlobalNav",
    style: {},
    moduleName: "全局导航",
    reName: "全局导航",
    copyTime: 0,
    isCopy: false,
    id: 9901,
    setData: {
      setTitle: "全局导航",
      imgArr: [
        {
          name: "setGlobalNav", title: "标题", id: 1, max: 5, activeImg: "", normalImg: "",
          isActive: true, isClick: false,
          function:
            { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
          children: []
        },
        {
          name: "setGlobalNav", title: "标题", id: 2, max: 5, activeImg: "", normalImg: "",
          isActive: false, isClick: false,
          function:
            { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
          children: []
        },
        {
          name: "setGlobalNav", title: "标题", id: 3, max: 5, activeImg: "", normalImg: "",
          isActive: false, isClick: false,
          function:
            { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
          children: []
        },
        {
          name: "setGlobalNav", title: "标题", id: 4, max: 5, activeImg: "", normalImg: "",
          isActive: false, isClick: false,
          function:
            { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
          children: []
        },
      ],
      setImgArr: [
        {
          name: "setGlobalNav", title: "标题", id: 1, max: 5, activeImg: "", normalImg: "",
          isActive: true, isClick: false,
          function:
            { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
          children: []
        },
        {
          name: "setGlobalNav", title: "标题", id: 2, max: 5, activeImg: "", normalImg: "",
          isActive: false, isClick: false,
          function:
            { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
          children: []
        },
        {
          name: "setGlobalNav", title: "标题", id: 3, max: 5, activeImg: "", normalImg: "",
          isActive: false, isClick: false,
          function:
            { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
          children: []
        },
        {
          name: "setGlobalNav", title: "标题", id: 4, max: 5, activeImg: "", normalImg: "",
          isActive: false, isClick: false,
          function:
            { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
          children: []
        },
      ],
      isOnclick: false,
      isImage: true,
      isText: true,
      isShow: true,
      isBaseSet: true,
      isGlobalNav: true,
      isAdd: true,
      tag: '60x60',
      style: {
        textMainColor: "#027BFF",
        textSecondaryColor: "#999",
        position: 'bottom',
        secondPosition: 'bottom',
        height: '50px',
      },
      default: {
        textMainColor: "#027BFF",
        textSecondaryColor: "#999",
      },
      setStyleList: [
        // {
        //   name: "TemplateReName",
        //   curName: "全局导航",
        //   flag: false
        // },
        {
          name: "Dropdown",
          title: "使用界面",
          attr: "",
          sets: [],
          drop: [
            {
              name: "UsePage",
              attr: "usepage",
              type: 'multi',
              isMore: true,
            },
          ]
        },
        {
          name: "Dropdown",
          title: "导航类型",
          attr: "",
          sets: [],
          drop: [
            {
              name: "SingleChoice",
              attr: "navstyle",
              title: "导航样式",
              sets: [
                { title: '图文', isImage: true, isText: true, isActive: true, isDisabled: false, opacity: 1 },
                { title: '纯文字', isImage: false, isText: true, isActive: false, isDisabled: false, opacity: 1 },
                { title: '纯图片', isImage: true, isText: false, isActive: false, isDisabled: false, opacity: 1 },
              ]
            },
            {
              name: "NavPosition",
              attr: "navposition",
              title: "导航位置",
              sets: [
                { title: '', src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/global-1.png", styleAttr: 'paddingBottom', position: 'bottom', isActive: true },
                { title: '', src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/global-4.png", styleAttr: 'paddingTop', position: 'top', isActive: false },
              ]
            },
            {
              name: "SetColor",
              title: "文本主色",
              attr: "textMainColor",
              sets: ["#f90220", "#6236FF", "#0091FF", "#FDD713"]
            },
            {
              name: "SetColor",
              title: "文本辅色",
              attr: "textSecondaryColor",
              sets: ["#666", "#C8CDD1", "#D8D8D8", "#E5E5E5"]
            },
          ]
        },
        {
          name: "Dropdown",
          title: "导航列表",
          attr: "",
          sets: [],
          drop: [
            {
              name: "SetNav",
              title: "背景颜色",
              attr: "backgroundColor",
              sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"]
            },
          ]
        },
        {
          name: "SetAdd",
        }
      ],
      setHighList: [
      ],
    }
  },
  initGlobalNavData: {
    url: "./template/globalnav",
    name: "GlobalNav",
    style: {},
    moduleName: "全局导航",
    reName: "全局导航",
    copyTime: 0,
    isCopy: false,
    id: 9901,
    setData: {
      setTitle: "全局导航",
      imgArr: [
        {
          name: "setGlobalNav", title: "标题", id: 1, max: 5, activeImg: "", normalImg: "",
          isActive: true, isClick: false,
          function:
            { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
          children: []
        },
        {
          name: "setGlobalNav", title: "标题", id: 2, max: 5, activeImg: "", normalImg: "",
          isActive: false, isClick: false,
          function:
            { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
          children: []
        },
        {
          name: "setGlobalNav", title: "标题", id: 3, max: 5, activeImg: "", normalImg: "",
          isActive: false, isClick: false,
          function:
            { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
          children: []
        },
        {
          name: "setGlobalNav", title: "标题", id: 4, max: 5, activeImg: "", normalImg: "",
          isActive: false, isClick: false,
          function:
            { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
          children: []
        },
      ],
      setImgArr: [
        {
          name: "setGlobalNav", title: "标题", id: 1, max: 5, activeImg: "", normalImg: "",
          isActive: true, isClick: false,
          function:
            { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
          children: []
        },
        {
          name: "setGlobalNav", title: "标题", id: 2, max: 5, activeImg: "", normalImg: "",
          isActive: false, isClick: false,
          function:
            { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
          children: []
        },
        {
          name: "setGlobalNav", title: "标题", id: 3, max: 5, activeImg: "", normalImg: "",
          isActive: false, isClick: false,
          function:
            { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
          children: []
        },
        {
          name: "setGlobalNav", title: "标题", id: 4, max: 5, activeImg: "", normalImg: "",
          isActive: false, isClick: false,
          function:
            { pageId: 0, pageName: "", isSystem: true, link: false, production: false, type: '' },
          children: []
        },
      ],
      isOnclick: false,
      isImage: true,
      isText: true,
      isShow: true,
      isBaseSet: true,
      isGlobalNav: true,
      isAdd: true,
      tag: '60x60',
      style: {
        textMainColor: "#027BFF",
        textSecondaryColor: "#999",
        position: 'bottom',
        secondPosition: 'bottom',
        height: '50px',
      },
      default: {
        textMainColor: "#027BFF",
        textSecondaryColor: "#999",
      },
      setStyleList: [
        // {
        //   name: "TemplateReName",
        //   curName: "全局导航",
        //   flag: false
        // },
        {
          name: "Dropdown",
          title: "使用界面",
          attr: "",
          sets: [],
          drop: [
            {
              name: "UsePage",
              attr: "usepage",
              type: 'multi',
              isMore: true,
            },
          ]
        },
        {
          name: "Dropdown",
          title: "导航类型",
          attr: "",
          sets: [],
          drop: [
            {
              name: "SingleChoice",
              attr: "navstyle",
              title: "导航样式",
              sets: [
                { title: '图文', isImage: true, isText: true, isActive: true, isDisabled: false, opacity: 1 },
                { title: '纯文字', isImage: false, isText: true, isActive: false, isDisabled: false, opacity: 1 },
                { title: '纯图片', isImage: true, isText: false, isActive: false, isDisabled: false, opacity: 1 },
              ]
            },
            {
              name: "NavPosition",
              attr: "navposition",
              title: "导航位置",
              sets: [
                { title: '', src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/global-1.png", styleAttr: 'paddingBottom', position: 'bottom', isActive: true },
                { title: '', src: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/global-4.png", styleAttr: 'paddingTop', position: 'top', isActive: false },
              ]
            },
            {
              name: "SetColor",
              title: "文本主色",
              attr: "textMainColor",
              sets: ["#f90220", "#6236FF", "#0091FF", "#FDD713"]
            },
            {
              name: "SetColor",
              title: "文本辅色",
              attr: "textSecondaryColor",
              sets: ["#666", "#C8CDD1", "#D8D8D8", "#E5E5E5"]
            },
          ]
        },
        {
          name: "Dropdown",
          title: "导航列表",
          attr: "",
          sets: [],
          drop: [
            {
              name: "SetNav",
              title: "背景颜色",
              attr: "backgroundColor",
              sets: ["#f2f3f4", "#d8d8d8", "#7d8694", "#434f77"]
            },
          ]
        },
        {
          name: "SetAdd",
        }
      ],
      setHighList: [
      ],
    }
  },
  // 聊天
  nowChatList:
    [
      {
        ismy: true,
        con: "减肥的快乐是机房课到拉萨",
        type: "mes",
        to: 2,
        id: 1,
      },
      {
        ismy: false,
        con: "减肥的快乐是机房课到拉萨",
        type: "img",
        to: 2,
        id: 1,
      },
      {
        ismy: true,
        con: "减肥的快乐是机房课到拉萨",
        type: "mes",
        to: 2,
        id: 1,
      },
      {
        ismy: true,
        con: "减肥的快乐是机房课到拉萨",
        type: "mes",
        to: 2,
        id: 1,
      },
      {
        ismy: true,
        con: "减肥的快乐是机房课到拉萨",
        type: "mes",
        to: 2,
        id: 1,
      },
      {
        ismy: true,
        con: "减肥的快乐是机房课到拉萨",
        type: "mes",
        to: 2,
        id: 1,
      },
      {
        ismy: true,
        con: "减肥的快乐是机房课到拉萨",
        type: "mes",
        to: 2,
        id: 1,
      },
      {
        ismy: true,
        con: "减肥的快乐是机房课到拉萨",
        type: "mes",
        to: 2,
        id: 1,
      },
      {
        ismy: true,
        con: "减肥的快乐是机房课到拉萨",
        type: "mes",
        to: 2,
        id: 1,
      },
    ],
  nowChatId: 1,
  nowChatIndex: 0,
  isShowChat: false,
  isShowChatBtn: false,
  isShowLinkMan: false,
  linkManRight: -300,
  leftChattingList: [],
  linkList: [
    {
      type: "知名人物",
      list: [
        {
          name: "刘德华",
          con: "你在干什么？",
          img: "",
          id: 1,
        },
        {
          name: "罗玉凤",
          con: "",
          img: "",
          id: 2,
        },
      ],
      showList: false,
    },
  ],
  mesList: [
    {
      name: "罗玉凤",
      con: "",
      img: "",
      type: "mes",
      id: 2,
    },
    {
      name: "刘德华",
      con: "你在干什么？",
      img: "",
      type: "mes",
      id: 1,
    },
  ],
  searchList: [
  ],
  addzIndex: 99999,
  noticezIndex: 99999,
  isChatSearch: false,
}
export default state