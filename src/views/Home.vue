<template>
  <div class="show-info">
    <div class="test test1">
      <vueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :info="true"
        :full="option.full"
        :canMove="option.canMove"
        :canScale="option.canScale"
        :canMoveBox="option.canMoveBox"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber"
        :fixedBox="option.fixedBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :centerBox="option.centerBox"
        :high="option.high"
        :infoTrue="option.infoTrue"
        :enlarge="option.enlarge"
        @realTime="realTime"
        @imgLoad="imgLoad"
      ></vueCropper>
      <div class="upload_box">
        <input
          type="file"
          id="uploads"
          title=""
          accept="image/png, image/jpeg, image/gif, image/jpg"
          @change="uploadImg"
        />
        点击上传头像
      </div>
    </div>
    <!-- 预览 -->
    <div class="show-preview">
      <div class="preview">
        <img :src="previews" class="preview-img" />
      </div>
      <span class="previews-txt"> 预览</span>
    </div>
  </div>
</template>

<script>
import { fileByBase64, base64ByBlob } from "@/utils/files.js";
export default {
  name: "Home",
  data() {
    return {
      // 裁剪参数
      option: {
        img:
          "https://pic2.zhimg.com/v2-3be05963f5f3753a8cb75b6692154d4a_1440w.jpg?source=172ae18b", // 裁剪图片的地址	空	url 地址 || base64 || blob
        outputSize: 1, // 裁剪生成图片的质量	1	0.1 - 1
        outputType: "jepg", //	裁剪生成图片的格式	jpg (jpg 需要传入jpeg)	jpeg || png || webp
        info: true, //	裁剪框的大小信息	true	true || false
        canScale: false, // 图片是否允许滚轮缩放	true	true || false
        autoCrop: true, //是否默认生成截图框	false	true || false
        autoCropWidth: 200, //默认生成截图框宽度	容器的80%	0~max
        autoCropHeight: 200, //默认生成截图框高度	容器的80%	0~max
        fixed: true, //是否开启截图框宽高固定比例	true	true | false
        fixedNumber: [1, 1], //截图框的宽高比例	[1, 1]	[宽度, 高度]
        full: false, //是否输出原图比例的截图	false	true | false
        fixedBox: false, //固定截图框大小 不允许改变	false	true | false
        canMove: false, //上传图片是否可以移动	true	true | false
        canMoveBox: true, //截图框能否拖动	true	true | false
        original: false, //上传图片按照原始比例渲染	false	true | false
        centerBox: true, //截图框是否被限制在图片里面	false	true | false
        high: true, //是否按照设备的dpr 输出等比例图片	true	true | false
        infoTrue: true, //true 为展示真实输出图片宽高 false 展示看到的截图框宽高	false	true | false
        maxImgSize: 2000, //限制图片最大宽度和高度	2000	0-max
        enlarge: 1, //图片根据截图框输出比例倍数	1	0-max(建议不要太大不然会卡死的呢)
        mode: "contain" //图片默认渲染方式	contain	contain , cover, 100px, 100% auto
      },
      // 样式
      previews: "",
      previewStyle1: {},
      previewStyle2: {},
      previewStyle3: {},
      previewStyle4: {}
    };
  },
  methods: {
    // 预览
    realTime() {
      // 获取裁剪图片的base64
      this.$refs.cropper.getCropData(base64 => {
        // do something
        this.previews = base64;
        console.log("裁剪后的base64", base64);
      });
      // 获取截图的blob数据
      this.$refs.cropper.getCropBlob(blob => {
        // do something
        let url = window.URL.createObjectURL(blob);
        console.log("截图的blob", url);
      });
    },
    // 上传图片
    uploadImg(e) {
      console.log("imgLoad", e.target.files[0]);
      let file = e.target.files[0];
      // 上传图片转base64再转blob
      fileByBase64(file, base64 => {
        base64ByBlob(base64, blob => {
          let url = window.URL.createObjectURL(blob);
          console.log("base64,blob", base64, blob, url);
          this.option.img = url;
        });
      });
    },
    // 图片加载成功事件
    imgLoad(e) {
      console.log("imgLoad", e);
    }
  }
};
</script>
<style scoped>
/* 最外层容器 */
.show-info {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 上传文件 */
.test {
  margin-top: 50px;
}
/* 图片裁剪 */
.vue-cropper {
  width: 200px;
  height: 200px;
  /* background-image: none;
  background: #000; */
  margin: 0 auto;
}
/* 上传文件按钮外层 */
.upload_box {
  position: relative;
  width: 200px;
  height: 26px;
  line-height: 26px;
  margin: 0 auto;
  margin-top: 20px;
  font-size: 12px;
  color: #fff;
  background: #8091df;
  border-radius: 5px;
  cursor: pointer;
}
/* 上传文件 */
#uploads {
  position: absolute;
  left: 0;
  font-size: 0;
  width: 200px;
  height: 20px;
  opacity: 0;
  cursor: pointer;
}
/* 预览 */
.show-preview {
  display: grid;
  /* flex-direction: column; */
  place-items: center;
  height: 200px;
  margin-left: 100px;
}
.previews-txt {
}
.preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.preview-img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  border-radius: 50%;
}
</style>
