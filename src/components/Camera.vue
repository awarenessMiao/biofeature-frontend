<template>
  <el-container mode="horizon">
    <el-header>
      <el-switch
        v-model="newPerson"
        inactive-text="搜索人物"
        active-text="添加人物"
      >
      </el-switch>
      <el-input
        v-if="newPerson"
        size="small"
        style="float: right; width: 200px"
        v-model="person"
        placeholder="请输入人物名(英文)"
      ></el-input>
      <el-select
        v-if="!newPerson"
        size="small"
        style="float: right"
        v-model="person"
        @change="handleSelect"
        filterable
        placeholder="请选择人物"
      >
        <el-option
          v-for="(item, index) in people"
          :key="index"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-header>
    <el-header>
      <el-input
        size="small"
        style="width: 80%"
        v-model="photo"
        placeholder="请输入照片名(英文)"
      ></el-input>
      <el-button size="small" style="float: right" @click="onClick"
        >拍照</el-button
      >
    </el-header>
    <video class="video" ref="videoPlayer" autoplay></video>
    <canvas
      style="display: none"
      class="canvas"
      ref="canvas"
      height="720px"
      width="960px"
    ></canvas>
  </el-container>
</template>

<script>
export default {
  name: "fmCamera",
  async mounted() {
    // 打开摄像头
    await navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const videoPlayer = this.$refs.videoPlayer;
        videoPlayer.srcObject = stream;
        videoPlayer.play();
      })
      .catch((err) => {
        console.log("访问摄像头失败：", err);
      });
    const people = await this.$axios.get("/api/people");
    this.people = people.data;
  },
  data() {
    return {
      people: [],
      person: "",
      photo: "",
      newPerson: true,
    };
  },
  methods: {
    async onClick() {
      // 分别拿到两个html的组件
      const canvas = this.$refs.canvas;
      const videoPlayer = this.$refs.videoPlayer;
      // 把摄像头拍到的照片显示在canvas
      await canvas
        .getContext("2d")
        .drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
      // 把canvas转化成图像
      const image = await canvas.toDataURL("image/jpeg");
      console.log(image);
      // 把图像发给后端
      const data = {
        person: this.person,
        photo: this.photo + '.jpg',
        img: image,
      };
      const response = await this.$axios.post("/api/upload", data);
      console.log(response);
      this.$emit("selected", this.person, this.photo + '.jpg');
      this.$emit("final");
    },
  },
};
</script>

<style scoped>
.video {
  height: 50%;
  width: 50%;
  align-self: center;
}
</style>
