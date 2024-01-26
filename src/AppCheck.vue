<template>
  <el-container>
    <el-header> 
      
      <el-button @click="onClick">拍照</el-button>
    </el-header>
    <video class="video" ref="videoPlayer" autoplay></video>
    <canvas class="canvas" ref="canvas" height="720px" width="960px"></canvas>
  </el-container>
</template>

<script>
export default {
  mounted() {
    // 打开摄像头
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        const videoPlayer = this.$refs.videoPlayer;
        videoPlayer.srcObject = stream;
        videoPlayer.play();
      })
      .catch(err => {
        console.log("访问摄像头失败：", err);
      });
  },
  methods: {
    async onClick() {
      // 分别拿到两个html的组件
      const canvas = this.$refs.canvas;
      const videoPlayer = this.$refs.videoPlayer;
      // 把摄像头拍到的照片显示在canvas
      await canvas.getContext("2d").drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
      // 把canvas转化成图像
      const image = await canvas.toDataURL('image/jpeg');
      console.log(image);
      // 把图像发给后端
      const response = await this.$axios.post('/api/upload', image);
      console.log(response);
      // 把接收的图像渲染出来
      const new_image = new Image();
      new_image.src = response.data;
      // 把canvas图像清理掉
      await canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      // 把canvas贴上新图片
      await canvas.getContext("2d").drawImage(new_image, 0, 0, canvas.width, canvas.height);
      console.log(new_image);
    }
  }
};
</script>

<style scoped>
.video {
  height: 50%;
  width: 50%;
}
/* .canvas{
  height: 50%;
  width: 50%；
} */
</style>
