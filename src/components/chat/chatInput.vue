<template>
  <div>
    <div class="toolbar">
      <i class="iconfont icontupian">
        <input type="file" @change="upload($event)" ref="img" />
      </i>
      <i class="iconfont iconbofang">
        <input type="file" @change="uploadVideo($event)" ref="video" />
      </i>
    </div>
    <textarea name id="textarea" @keydown="keydown($event)" cols="30" rows="10"></textarea>
    <div class="send">发送</div>
  </div>
</template>
<script>
export default {
  name: "chatInput",
  data() {
    return {
      formData: {},
      formDataVideo: {},
      fileData: []
    };
  },
  methods: {
    keydown(e) {
      if (e.ctrlKey && e.keyCode === 13) {
        e.target.value += "\n";
      } else if (e.target.value) {
        e.preventDefault();
        if (e.keyCode === 13) {
          let obj = {
            ismy: true,
            con: e.target.value,
            type: "mes",
            to: 2,
            id: 1
          };
          this.$store.commit("chat", obj);
          e.target.value = "";
        }
      }
    },
    createDOM(currFile, i) {
      let img = new Image();
      img.src = currFile.result;
      img.onload = () => {
        if (img.width > img.height) {
          let obj = {
            ismy: true,
            src: img.src,
            type: "img",
            width: "350px",
            height: (img.height * 350) / img.width,
            preImg: true,
            onloadImg: false
          };
          this.$store.commit("chat", obj);
        } else {
          let obj = {
            ismy: true,
            src: img.src,
            type: "img",
            width: "200px",
            height: (img.height * 200) / img.width + "px",
            preImg: true,
            onloadImg: false
          };
          this.$store.commit("chat", obj);
        }
        this.$store.state.nowChatIndex =
          this.$store.state.nowChatList.length - 1;
      };
    },
    createVideoDOM() {
      let obj = {
        ismy: true,
        src: "",
        type: "video",
        width: "350px",
        height: "196px",
        preImg: true,
        onloadImg: false
      };
      this.$store.commit("chat", obj);
      this.$store.state.nowChatIndex = this.$store.state.nowChatList.length - 1;
    },
    upload(e) {
      const files = e.target.files;
      this.formData = new FormData();
      let list = [];
      for (let i = 0; i < files.length; i++) {
        this.photoCompress(files[i], i);
      }
      e.target.setAttribute("type", "text");
    },
    uploadVideo(e) {
      this.createVideoDOM();
      const files = e.target.files;
      this.formDataVideo = new FormData();
      this.formDataVideo.append("video", files[0]);
      const xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
      xhr.open(
        "post",
        "http://test.api.zhihuokeji.com/api/common/upload/video",
        true
      ); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
      xhr.onload = this.uploadVideoComplete; //请求完成
      xhr.upload.onprogress = this.progressFunction;
      xhr.onerror = this.uploadFailed; //请求失败

      xhr.send(this.formDataVideo); //开始上传，发送form数据
      e.target.setAttribute("type", "text");
    },
    photoCompress(file, i) {
      //图片压缩
      let reader = new FileReader();
      let currFile = file;
      reader.readAsDataURL(currFile);
      reader.onload = e => {
        currFile.result = e.target.result;
        this.fileData.push({
          //格式整理
          name: currFile.name,
          type: currFile.type,
          size: currFile.size,
          lastModified: currFile.lastModified,
          result: currFile.result
        });
        this.createDOM(currFile, i);
        this.canvasDataURL(currFile.result, {}, this.resolve, i);
      };
      reader.onerror = function() {};
    },
    canvasDataURL(path, obj, callback, i) {
      const me = this;
      var img = new Image();
      img.src = path;
      this.imgIndex++;
      img.onload = function() {
        var that = this;
        // 默认按比例压缩
        var w = that.width,
          h = that.height,
          scale = w / h;
        w = obj.width || w;
        h = obj.height || w / scale;
        var quality = 0.7; // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
          quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊

        var base64 = canvas.toDataURL("image/jpeg", quality);
        me.fileData[i].base64 = base64;
        // 回调函数返回base64的值
        callback(i);
      };
    },
    resolve(i) {
      if (i >= this.fileData.length - 1) {
        this.fileData.forEach(item => {
          const bl = this.convertBase64UrlToBlob(item.base64);
          bl.lastModified = this.fileData[0].lastModified;
          bl.name = this.fileData[0].name;
          this.formData.append("images[]", bl); // 文件对象
        });
        const xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
        xhr.open(
          "post",
          "http://test.api.zhihuokeji.com/api/common/upload/images",
          true
        ); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
        xhr.onload = this.uploadComplete; //请求完成
        xhr.onerror = this.uploadFailed; //请求失败
        xhr.send(this.formData); //开始上传，发送form数据
      }
    },
    uploadFailed() {
      alert("请求失败了");
    },
    uploadComplete(evt) {
      this.$refs.img.setAttribute("type", "file");
      const { body } = JSON.parse(evt.target.responseText);
      this.$store.state.nowChatList[this.$store.state.nowChatIndex].src =
        body[0].file_url;
      this.$store.state.nowChatList[
        this.$store.state.nowChatIndex
      ].preImg = false;
      this.fileData = [];
    },
    uploadVideoComplete(evt) {
      const { body } = JSON.parse(evt.target.responseText);
      this.$refs.video.setAttribute("type", "file");
      this.formDataVideo = {};
      this.$store.state.nowChatList[this.$store.state.nowChatIndex].src =
        body.file_url;
      this.$store.state.nowChatList[
        this.$store.state.nowChatIndex
      ].preImg = false;
      this.fileData = [];
    },
    progressFunction(evt) {},
    convertBase64UrlToBlob(urlData) {
      var arr = urlData.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.toolbar {
  height: 40px;
  display: flex;
  i {
    margin-left: 20px;
    font-size: 20px;
    display: block;
    float: left;
    cursor: pointer;
    color: #646566;
  }
  .icontupian {
    margin-left: 5px;
    position: relative;
    cursor: pointer;
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      left: 0;
      top: 0;
      cursor: pointer;
    }
  }
  .iconbofang {
    font-size: 30px;
    margin-top: -7px;
    position: relative;
    input {
      position: absolute;
      width: 40px;
      height: 100%;
      opacity: 0;
      left: 0;
      top: 0;
      cursor: pointer;
    }
  }
}
textarea {
  display: block;
  height: 85px;
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  padding-left: 5px;
}
.send {
  width: 70px;
  height: 32px;
  line-height: 30px;
  font-size: 14px;
  padding: 0 16px;
  border-radius: 3px;
  border: 1px solid #dcdee0;
  text-align: center;
  vertical-align: middle;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s;
  background: #155bd4;
  color: #fff;
  position: absolute;
  right: 30px;
  bottom: 20px;
  &:hover {
    opacity: 0.8;
  }
}
</style>
