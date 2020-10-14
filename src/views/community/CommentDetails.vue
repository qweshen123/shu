<template>
    <div class="comment-details" ref="wrapper" @click="show">
        <div class="box">
            <!-- <button @click="show">点击</button> -->
            <ClassHeader htitle="评论区"/>
            <div class="header">
                <img :src="`${pictureDaim}${post.author.avatar}`" class="avatar"/>
                <div class="name">
                    {{post.author.nickname}}
                </div>
                <div class="type" v-show="isType">官方</div>
                <div class="level">lv{{post.author.lv}}</div>
                <Tag ttag="关注" class="adjustment"/>
            </div>
            
            <div class="title">
                {{post.title}}
            </div>

            <div class="content">
                {{post.content}}
            </div>

            <div class="title-comment">
                仰望神评论
            </div>
            <van-empty
                class="custom-image"
                image="error"
                description="没有相关评论"
                v-show="isEmpty"
            />
            <GodItem v-for="(item,index) in comments" :key="index" :itemComent="item" :index="index"/>
        </div>
    </div>
</template>

<script>
import ClassHeader from '../../components/ClassHeader'
import Tag from '../../components/Tag'
import {mapState} from 'vuex'
import GodItem from '../../components/GodItem'
import BScroll from 'better-scroll'
export default {
    props:{
        post:{
            type:Object
        },
        restday:{
            type:String
        }
    },
    methods:{
      show(){
          console.log(this.comments)
          this.comScroll.refresh()
      }
    },
    components:{
        ClassHeader,
        Tag,
        GodItem
    },
    computed:{
        isEmpty(){
            if(this.comments.length == 0){
                return true
            }
            return false
        },
        isType(){
            return this.post.author.type == 'official' ? true : false
        },
        ...mapState(['pictureDaim'])
    },
    data(){
        return{
            comments:[]
        }
    },
    beforeRouteEnter(to,from,next){
        next((vm)=>{

            vm.axios(`/post/${vm.post._id}/comment`)
            .then(res => {
                console.log(res)
                vm.comments = res.data.comments
                
                vm.$nextTick(()=>{
                if(!vm.comScroll){
                    vm.comScroll = new BScroll(vm.$refs.wrapper,{
                        click:true,
                        bounce:false
                    })
                    console.log(vm.comScroll)
                    
                }else{
                    vm.comScroll.refresh()
                }
            })

        })

        })
    },
    
    beforeDestroy(){
        this.comScroll.destroy()
    },
}
</script>

<style lang="scss" scoped>
    .comment-details{
        position: fixed;
        top:0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 5;
        background-color: #fff;
        overflow: hidden;

        .box{
            margin-bottom: 50px;
        }
        .header{
            position: relative;
            display: flex;
            align-items: center;
            height: 33px;
            padding: 0 15px;
            margin-bottom: 15px;
            img.avatar{

                height: 33px;
                width: 33px;
            }

            // .level,
            // .type,
            .name{
                margin-left: 10px;
            }

            .name{
                font-size: 17px;
                color:#8f827b;
            }

            .type{
                color:#fa5456;
                width: 44px;
                height: 26px;
                transform: scale(.5);
                transform-origin: center;
                font-size:18px;
                padding: 4px;
                text-align: center;

                border-radius: 3px;
                background-color: #ffd1d1;
            }

            .level{
                color:#e6924b;
                width: 44px;
                height: 26px;
                transform: scale(.5);
                transform-origin: center;
                font-size:18px;
                padding: 4px;
                text-align: center;

                border-radius: 3px;
                background-color: #fde0c8;
            }

            .adjustment{
                position: absolute;
                top:50%;
                right: 15px;
                transform: translateY(-50%);
                font-size: 10px;
                padding: 7px;
            }

            
        }

        .title{
            font-size: 17px;
            color:#404040;
            font-weight: 600;
            margin-bottom: 18px;
            padding: 0 15px;
            line-height: 21px;
            
        }

        .content{
            font-size: 16px;
            color:#858585;
            margin-bottom: 12px;
            padding: 0 15px;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
        }

        .title-comment{
            padding: 0 15px;
            font-size: 19px;
            color:#050505;
            height: 57px;
            line-height: 57px;
            font-weight: 700;
        }
    }
</style>