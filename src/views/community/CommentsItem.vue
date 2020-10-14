<template>
    <div class="comments-item" @click="toDetail">
        <div class="header">
            <img :src="`${pictureDaim}${item.author.avatar}`" class="avatar"/>
            <div class="name">
                {{item.author.nickname}}
            </div>
            <div class="type" v-show="isType">官方</div>
            <div class="level">lv{{item.author.lv}}</div>
            <!-- <button @click="show">点击</button> -->
            <Tag ttag="关注" class="adjustment"/>
        </div>
        
        <div class="title">
            {{item.title}}
        </div>

        <div class="content">
            {{content}}
        </div>

        <div class="tag-comment">
            综合讨论&gt;
        </div>

        <div class="date">
            <div class="time" v-if="workout">
                {{workout[4]}} · 3667阅读
            </div>
            <div class="count">
                <span class="icon-remove_circle_outline"></span>
                <span class="comtment-count">{{item.commentCount}}</span>
                <span class="icon-thumb_up"></span>
                <span class="like-count">{{item.likeCount}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Tag from '../../components/Tag'
import {mapState} from 'vuex'
import {changTime} from '../../assets/js/changtime'
export default {
    props:{
        item:{
            type:Object
        },
    },
    methods:{
        show(){
            console.log(this.item)
        },
        toDetail(){
            this.$router.push({name:'CommentDetails',params:{post:this.post,restday:this.workout[4]}})
        }
    },
    computed: {
        isType(){
            return this.item.author.type == 'official' ? true : false
        },
        workout(){
            if(this.createdTime == ""){return}  
            return changTime(this.createdTime)
        },
        ...mapState(['pictureDaim'])
    },
    components:{
        Tag,
    },
    created(){
        this.axios(`/post/${this.item._id}`)
        .then(res => {
            // console.log(res.data)
            this.post = res.data.post
            this.content = res.data.post.content
            this.createdTime = res.data.post.created
        })
    },
    data(){
        return{
            content:'',
            createdTime:'',
            post : {}
        }
    }
}
</script>

<style lang="scss" scoped>
    .comments-item{
        padding: 10px 20px;

        .header{
            position: relative;
            display: flex;
            align-items: center;
            height: 44px;
            img.avatar{

                height: 25px;
                width: 25px;
                border-radius: 50%;
            }

            // .level,
            // .type,
            .name{
                margin-left: 10px;
            }

            .name{
                font-size: 12px;
                color:#86858a;
            }

            .type{
                color:#fa5456;
                width: 32px;
                height: 20px;
                transform: scale(.5);
                transform-origin: center;
                font-size:12px;
                padding: 4px;
                border-radius: 3px;
                background-color: #ffd1d1;
            }

            .level{
                color:#e6924b;
                width: 32px;
                height: 20px;
                transform: scale(.5);
                transform-origin: center;
                font-size: 12px;
                padding: 4px;
                border-radius: 3px;
                background-color: #fde0c8;
            }

            .adjustment{
                position: absolute;
                top:50%;
                right: 0;
                transform: translateY(-50%);
                font-size: 10px;
                padding: 7px;
            }

            
        }

        .title{
            font-size: 15px;
            color:#404040;
            font-weight: 600;
            margin-bottom: 9px;
        }

        .content{
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;

            font-size: 12px;
            color:#858585;
            margin-bottom: 12px;
        }

        .tag-comment{
            height: 20px;
            width: 70px;
            background-color: #efeef3;
            color:#c5c4c9;
            font-size: 10px;
            text-align: center;
            line-height: 20px;
        }

        .date{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 37px;
            border-bottom: 1px solid #d2d1d6;
            .count{
                vertical-align: bottom;
                display: flex;
                align-items: center;

                .icon-thumb_up{
                    margin-left: 17px;
                    font-size: 13px;
                    color:#c3c2c7;
                }

                .icon-remove_circle_outline{
                    font-size: 13px;
                    color:#c3c2c7;
                }

                .comtment-count,
                .like-count{
                    display: inline-block;
                    font-size: 16px;
                    transform: scale(.5);
                    transform-origin: center;
                    
                }
            }

            .time{
                font-size: 12px;
                color:#c0c0c0;
            }
        }
    }
</style>