<template>
    <div class="comment-item">
        <img :src="`${pictureDaim}${itemComent.author.avatar}`" alt="">
        <div class="content">
            <h3 class="user-name">{{itemComent.author.nickname}} <span>{{itemComent.author.lv}}</span></h3>
            <div class="text">{{itemComent.content}}</div>
            <div class="time">

                <div class="rest-day">
                    {{workout[4]}} {{index+1}}楼
                </div>
                <div class="wrapper">
                    <span class="icon-thumb_up"></span>
                    <span class="like-count">{{itemComent.likeCount}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {changTime} from '../assets/js/changtime'
export default {
    props:{
        itemComent:{
            type:Object
        },
        index:{
            type:Number
        }
    },
    computed:{
        workout(){
            if(this.itemComent.created == ""){return}  
            return changTime(this.itemComent.created)
        },
        ...mapState(['pictureDaim'])
    }
}
</script>

<style lang="scss" scoped>
    .comment-item{
        display: flex;
        margin: 0 15px;
        border-bottom:1px solid #cacaca ;
        margin-top: 14px;

        img{
            height: 37px;
            width: 37px;
            border-radius: 50%;
            margin-right: 15px;
        }

        .content{
            .user-name{
                font-size: 15px;
                color:#a6a6a6;
                margin-bottom: 8px;
                margin-top: 4px;
            }

            .text{
                font-size: 15px;
                color:#68686a;
                margin-bottom: 16px;

                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;

            }

            .time{
                display: flex;
                justify-content: space-between;
                margin-bottom: 25px;
            }
        }
    }
</style>