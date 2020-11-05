import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    }]
})