import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import mutations from './mutations'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        pictureDaim:'http://statics.zhuishushenqi.com',
        userName:"",
        bookMarkList:[]
    },
    actions,
    mutations
})