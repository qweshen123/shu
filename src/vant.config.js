import { Toast,Empty,Button   } from 'vant'

const vants = [ Toast,Empty,Button  ]

export default {
    /**
     * Vue.use 方法会自动调用install函数
     * Install Vant Component plugin
     * @param Vue
     */
    install(Vue) {
        vants.forEach(Component => {
            Vue.use(Component)
        })
    }

}