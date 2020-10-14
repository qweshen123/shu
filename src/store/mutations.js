import * as types from './mutation-types'

export default {
    [types.SET_USERNAME](state,username){
        state.userName = username
    },
    [types.SET_HISTORY](state,bookitem){
        // console.log(state,bookitem,123)
        // state.bookMarkList.push(bookitem)
        let flag = false
        for(let i =0 ;i<state.bookMarkList.length;i++){
            if(state.bookMarkList[i]._id == bookitem._id){
                flag = true
            }
        }

        if(!flag){
            state.bookMarkList.push(bookitem)
        }
    }

}