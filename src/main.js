import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import { OpenAI } from "@langchain/openai";


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.prototype.$axios = axios;

Vue.prototype.$gpt = new OpenAI({
  openAIApiKey: 'sk-FmvfPsWM1ayjZuw8EeBbC89c6aAb4a5d8e15CeF01dD28dFd',
  modelName: "gpt-3.5-turbo",
}, { baseURL: 'https://d1.xiamoai.top/' })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
