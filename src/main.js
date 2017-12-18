import Vue from 'vue'
import App from './App'
import router from './router'
// import 'framework7';
import   'babel-polyfill';
import   'framework7/dist/css/framework7.ios.min.css';
import   'framework7/dist/css/framework7.ios.colors.min.css';
import './assets/css/main.css';
import Vuex from 'vuex'
import store from './assets/js/lib/store.js';
import d from './assets/js/lib/framework7.js';
import er from 'eruda';
import axios from 'axios';
// Vue.config.productionTip = false
window.f7 = new Framework7({
    router:false,
})
// er.init()
// axios.defaults.baseURL = 'http://192.168.1.106:8080/';
// axios.defaults.data = new Date();
Vue.prototype.$ajax = axios;

window.addEventListener('resize', function() {
			if (document.activeElement.tagName == 'INPUT'|| document.activeElement.tagName == 'TEXTAREA') {
				window.setTimeout(function() {
					document.activeElement.scrollIntoView(false);
				},0);
			}
		});
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
});
    