import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import VueCarousel from 'vue-carousel';  //carousel使うとき必要 追加


Vue.config.productionTip = false

Vue.use(VueCarousel); ////carousel使うとき必要 追加 


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
