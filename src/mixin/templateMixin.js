

export default {
  data () {
    return {
      upTimer: null,
      downTimer: null,
      up: true,
      down: true,
      sTop: 0,
      speed: 0,
      fast: 6,
      common: 2
    }
  },
  props: {
    msg: {
      type: Object
    },
    top: Number,
    comIndex: Number
  },
  methods: {
    select () {
      this.$store.state.pageList[this.$store.state.pageIndex].templateList.forEach(item => {
        item.setData.isOnclick = false;
      });
      if(this.$store.state.pageList[this.$store.state.pageIndex].headerData){
        this.$store.state.pageList[this.$store.state.pageIndex].headerData.setData.isOnclick = false;
      }
      if (this.$store.state.pageList[this.$store.state.pageIndex].isGlobalNav) {
        this.$store.state.globalNavData.setData.isOnclick = false;
      }
      if(this.comIndex < 9901){
        this.msg.id = typeof this.comIndex == "number" ? this.$store.state.pageList[this.$store.state.pageIndex].templateList[this.comIndex].id: this.$store.state.pageList[this.$store.state.pageIndex].headerData.id;
      }
      if(this.comIndex > -1){
        if(this.comIndex == 9901){
          this.$store.state.globalNavData.setData.isOnclick = true;
        }else{
          this.$store.state.pageList[this.$store.state.pageIndex].templateList[this.comIndex].setData.isOnclick = true;
        }
      }else{
        this.$store.state.pageList[this.$store.state.pageIndex].headerData.setData.isOnclick = true;
      }
      this.$store.commit("changeNowComponent", this.msg);
    },
    //鼠标点击下去
    comDown () {
      this.select()
      const body = document.getElementsByClassName('main-content')[0]
      const height = this.getDom('html').offsetHeight
      const scrollDownHeight = 130;
      const scrollUpHeight = height - 90;
      this.sTop = body.scrollTop;
      document.onmousemove = e => {//拖拽事件，拖拽到上下某个地方  body scrollTop  随着变化
        if (e.clientY > scrollUpHeight) { //被拖拽组件靠近底部
          e.clientY > scrollUpHeight + 60 && (this.speed = this.fast);
          clearInterval(this.upTimer)
          this.down && (this.downTimer = setInterval(() => {
            body.scrollTop = (this.sTop += this.speed);
          }, 5), (this.down = false))
        } else if (e.clientY < scrollDownHeight) {//被拖拽组件靠近顶部
          clearInterval(this.downTimer)
          e.clientY < scrollDownHeight - 50 && (this.speed = this.fast)
          this.up && (this.upTimer = setInterval(() => {
            body.scrollTop = (this.sTop -= this.speed);
          }, 5), (this.up = false))
        } else {
          this.reset(body) //初始化逻辑
        }
      };
      document.onmouseup = () => {//初始化所有逻辑
        document.onmousemove = document.onmouseup = null
        this.reset(body)
      };
    },
    reset (body) {//初始化逻辑
      clearInterval(this.downTimer)
      clearInterval(this.upTimer)
      this.sTop = body.scrollTop
      this.speed = this.common
      this.up = this.down = true
      this.upTimer = this.downTimer = null
    },
    getDom (tag) {
      return document.getElementsByTagName(tag)[0]
    }
  }
}