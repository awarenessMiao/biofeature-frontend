<template>
  <div v-html="response"></div>
</template>

<script>
export default {
  name: "fmGpt",
  props: { feature: Object },
  async mounted() {
      await this.rhyme();
  },
  data() {
    return {
      response: "",
    };
  },
  methods: {
    async fetchChatGPTResponse(inputText) {
      const api_key = "sk-FmvfPsWM1ayjZuw8EeBbC89c6aAb4a5d8e15CeF01dD28dFd";
      const api_url = "https://d1.xiamoai.top/v1/completions";
      const prompt = `请回答以下问题：\n问题：${inputText}\n回答：`;

      const response = await fetch(api_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_key}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo-instruct",
          prompt: prompt,
          max_tokens: 1000,
          n: 1,
          stop: null,
          temperature: 1,
        }),
      });

      const data = await response.json();
      console.log(data);
      return data.choices[0].text.trim();
    },
    async rhyme() {
      const template = String.raw`
        如今有一人，年龄为${this.feature.age}，性别为${this.feature.dominant_gender}，种族为${this.feature.dominant_race}，心情为${this.feature.dominant_emotion}，写出一首"""中国古典诗歌"""，不要解释，不要额外信息，不要指出字段，仅输出如下格式：
        <p>(在这里输出诗歌)</p>
        `;
      const res = await this.fetchChatGPTResponse(template);
      console.log(res);
      this.response = res;
    },
  },
};
</script>
