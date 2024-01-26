<template>
  <el-container>
    <el-header>
      <el-select v-model="person" @change="handleSelect" filterable placeholder="请选择人物">
        <el-option
          v-for="(item, index) in people"
          :key="index"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-header>
    <el-row>
      <el-col v-for="item in photos" :key="item" :span="6">
        <el-card :body-style="{ padding: '10px' }">
          <img
            :src="`/api/image?name=${person}&photo=${item}`"
            class="artist-image"
            alt="Artist Image"
            @click="onClick(item)"
          />
          <div class="artist-details" @click="onClick(item)">
            <p class="artist-name">{{ item }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "fmGallery",
  async mounted() {
    const people = await this.$axios.get("/api/people");
    this.people = people.data;
  },
  props: {
    msg: String,
  },
  data() {
    return {
      person: '',
      people: [],
      photos: [],
      photo: ''
    };
  },
  methods: {
    async handleSelect(key) {
      const photos = await this.$axios.get("api/photos?name=" + key);
      this.photos = photos.data;
      this.person = key;
    },
    onClick(photo) {
      this.photo = photo;
      this.$emit('selected', this.person, this.photo);
      this.$emit('final');
    }
  },
};
</script>

<style scoped>
/* .el-menu-vertical-demo {
  position:fixed
} */
.artist-card-container {
  margin: 20px;
}

.artist-image {
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.artist-details {
  margin-top: 10px;
}

.artist-name {
  font-size: 16px;
  font-weight: bold;
}

.follower-count,
.popularity {
  font-size: 14px;
  color: gray;
}
</style>