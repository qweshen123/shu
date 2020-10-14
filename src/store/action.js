import {SET_USERNAME} from './mutation-types'

export default{
    onRegisterUser(context,{username,password,nickname}){

        return new Promise((resolve,reject) => {
            let options = { 
                username,
                password,
                nickname,
                appKey: window.WebIM.config.appkey,
                success: function (res) { 
                    resolve(res)
                },  
                error: function (err) {
                    reject(err)
                }, 
                apiUrl: window.WebIM.config.apiURL
            }; 
            window.WebIM.conn.registerUser(options);
        })
    },
    onLoginUser({commit},{username,password}){
        // token登录
        return new Promise((resolve,reject) =>{

            let options = {
            apiUrl: window.WebIM.config.apiURL,
            user: username,
            pwd: password,
            appKey: window.WebIM.config.appkey,
            success: function (res) {
                
                let token = res.access_token
                //登录成功修改vuex username
                commit(SET_USERNAME,username)
                resolve(token)
            },
            error: function(err){
                reject(err)
            }
            };
            window.WebIM.conn.open(options);
        })
    },
    onAutoLoginUser(context,{username,token}){
        var options = {
        apiUrl: window.WebIM.config.apiURL,
        user: username,
        accessToken: token,
        appKey: window.WebIM.config.appkey,
        };
        window.WebIM.conn.open(options);
    }
}