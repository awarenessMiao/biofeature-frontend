<template>
  <el-container>
    <el-header>
      <el-button @click="dialogPhotoVisible = true">选择图片</el-button>
      <el-button @click="dialogCameraVisible = true">拍照</el-button>
    </el-header>
    <div
      style="
        background: #eeeeee;
        height: 100px;
        text-align: center;
        line-height: 30px;
      "
    >
      <p>姓名：付苗</p>
      <p>学号：21122119</p>
    </div>
    <el-dialog title="请选择图片" :visible.sync="dialogPhotoVisible">
      <gallery
        @selected="onSelected(arguments)"
        @final="dialogPhotoVisible = false"
      />
    </el-dialog>
    <el-dialog title="请拍照" :visible.sync="dialogCameraVisible">
      <camera
        @selected="onSelected(arguments)"
        @final="dialogCameraVisible = false"
      />
    </el-dialog>
    <div class="image-container">
      <el-row>
        <el-col :span="12">
          <img
            :src="`/api/test?name=${person}&photo=${photo}`"
            :alt="photo"
            style="max-width: 50%"
          />
          <div class="image-description">
            <p>人物：{{ person }}</p>
            <p>照片名：{{ photo }}</p>
            <gpt ref="gpt" :feature="result" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="image-info">
            <h3>图片信息：</h3>
            <p>年龄：{{ result.age }}</p>
            <p>主要情绪：{{ result.dominant_emotion }}</p>
            <p>主要性别：{{ result.dominant_gender }}</p>
            <p>主要人种：{{ result.dominant_race }}</p>
            <h4>情绪分布：</h4>
            <ul>
              <li v-for="(value, key) in result.emotion" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
            <p>人脸置信度：{{ result.face_confidence }}</p>
            <h4>性别分布：</h4>
            <ul>
              <li v-for="(value, key) in result.gender" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
            <h4>人种分布：</h4>
            <ul>
              <li v-for="(value, key) in result.race" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
            <h4>人脸位置：</h4>
            <p>宽度：{{ result?.region?.w }}</p>
            <p>高度：{{ result?.region?.h }}</p>
            <p>X坐标：{{ result?.region?.x }}</p>
            <p>Y坐标：{{ result?.region?.y }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-footer> </el-footer>
  </el-container>
</template>

<script>
import Camera from "./components/Camera.vue";
import Gpt from './components/Gpt.vue';
import Gallery from "./components/Gallery.vue";
export default {
  components: {
    Gallery,
    Camera,
    Gpt
  },
  mounted() {
    this.getRepresent();
  },
  data() {
    return {
      dialogPhotoVisible: false,
      dialogCameraVisible: false,
      person: "Aaron_Guiel",
      photo: "Aaron_Guiel_0001.jpg",
      path: "",
      result: {},
    };
  },
  methods: {
    async onSelected(msg) {
      this.person = msg[0];
      this.photo = msg[1];
      this.getRepresent();
    },
    async getRepresent() {
      this.path = `/data/lfw/${this.person}/${this.photo}`;
      const response = await this.$axios.post("/app/analyze", {
        img_path: this.path,
        enforce_detection: false,
      });
      console.log(response.data);
      this.result = response.data.results[0];
      await this.$refs.gpt.rhyme();
    },
  },
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
.image-container {
  padding: 20px;
}

.image-description {
  margin-top: 10px;
}

.image-info {
  margin-top: 10px;
}
</style>
