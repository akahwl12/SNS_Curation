import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './vuex/store'
import axios from 'axios'
import vuetify from './plugins/vuetify';
import moment from "moment"
import VueMomentJS from "vue-momentjs"


const firebase = require('firebase/app');
require('firebase/firestore');



Vue.use(VueMomentJS, moment)
Vue.prototype.$Axios = axios;
Vue.config.productionTip = false

var firebaseConfig = {
    apiKey: "AIzaSyCNDvs7Di9f-WF7Yd9tQBX7k-Sz5jOBknA",
    authDomain: "fooddeuk-11372.firebaseapp.com",
    databaseURL: "https://fooddeuk-11372.firebaseio.com",
    projectId: "fooddeuk-11372",
    storageBucket: "fooddeuk-11372.appspot.com",
    messagingSenderId: "736918572934",
    appId: "1:736918572934:web:03f1f18053a6c74b346607",
    measurementId: "G-CEZ93CF22Y"
};
firebase.initializeApp(firebaseConfig);

export const fireDB = firebase.firestore();

new Vue({
    router,
    store,
    vuetify,
    beforeCreate() {
        this.$store.dispatch('getMemberInfo')
    },
    render: h => h(App)
}).$mount('#app');