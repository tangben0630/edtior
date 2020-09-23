export default {
  props: {
    setData: {
      type: Object,
    },
    item: {
      type: Object,
    },
  },
  methods: {
    itemClick (v) {
      this.setData.style[this.item.attr] = v;
    },
    // 根据行列 设置容器显示
    setContainer () {
      let len = this.setData.imgArr.length;
      let c_num = this.setData.style['column'];
      let r_num = this.setData.style['row'];
      let a = c_num * r_num;
      let t = Math.ceil(len / (c_num * r_num));
      this.setData.style['times'] = t;
    },
  },
}