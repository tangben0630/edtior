export default {

  methods: {
    down (e) {
      const X = e.clientX;
      const Y = e.clientY;
      const left = this.left;
      const top = this.top;
      document.onmousemove = (ev) => {
        ev = ev || event;
        let nowX = ev.clientX - X + left;
        let nowY = ev.clientY - Y + top;
        nowX < -187 && (nowX = -187);
        nowY < 0 && (nowY = 0);
        nowX > this.pageWidth - 600 && (nowX = this.pageWidth - 600);
        nowY > this.pageHeight - 450 && (nowY = this.pageHeight - 450);
        this.left = nowX;
        this.top = nowY;
      };
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null;
      };
    },
    changezIndex (m) {
      if (m) {//notice
        this.$store.state.addzIndex = 99999;
        this.$store.state.noticezIndex = 999999;
      } else {//add
        this.$store.state.addzIndex = 999999;
        this.$store.state.noticezIndex = 99999;
      }
    }
  },
  mounted () {
    this.pageWidth = document.documentElement.clientWidth;
    this.pageHeight = document.documentElement.clientHeight;
    this.left = this.pageWidth / 2 - 500;
    this.top = this.pageHeight / 2 - 350;
  },
}