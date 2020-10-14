<template>
    <div class="book-single">
        <ClassHeader/>
        <div class="singel-wrapper" ref="single">
            <div class="box">
                <div class="content-picture">
                    <img :src="`${pictureDaim}${BookDetails.cover}`" alt="图片">
                    <div class="content">
                        <h3 class="content-title">
                            {{BookDetails.title}}
                        </h3>
                        <p class="content-author">
                            {{BookDetails.author}}
                        </p>
                        <p class="content-shortIntro">
                            5书币/千字
                        </p>
                        <p class="tag">
                            开通vip,免广告
                        </p>                     
                    </div>
                </div>

                <div class="book-data">
                    <div class="item">
                        <div class="num" v-if="!(Object.keys(BookDetails).length == 0)">
                            {{BookDetails.rating.score}}
                        </div>
                        <div class="txt" v-if="!(Object.keys(BookDetails).length == 0)">
                            {{BookDetails.rating.tip}}
                        </div>
                    </div>
                    <div class="item">
                        <div class="num" v-if="!(Object.keys(BookDetails).length == 0)">
                            {{BookDetails.retentionRatio}}
                        </div>
                        <div class="txt">
                            读者留存
                        </div>
                    </div>
                    <div class="item">
                        <div class="num" v-if="!(Object.keys(BookDetails).length == 0)">
                            {{BookDetails.totalFollower|division}}万
                        </div>
                        <div class="txt">
                            7日人气
                        </div>
                    </div>
                    <div class="item">
                        <div class="num" v-if="!(Object.keys(BookDetails).length == 0)">
                            {{BookDetails.wordCount|division}}万
                        </div>
                        <div class="txt">
                            累计人气
                        </div>
                    </div>
                </div>

                <div class="book-raking">
                    <div class="wrapper">
                        <span class="icon-accessibility"></span>
                        <span class="content">热搜榜</span>
                    </div>
                    <span class="tag">&gt;</span>
                </div>

                <Blank/>

                <div class="introduce">
                    <h3>简介</h3>
                    <div class="tags">
                        <ul v-if="!(Object.keys(BookDetails).length == 0)">
                            <Tag tag="li" v-for="(item,index) in BookDetails.tags" :key="index"  :ttag="item"/>
                            
                        </ul>
                    </div>
                    <p class="long-intro" v-if="!(Object.keys(BookDetails).length == 0)">
                        {{BookDetails.longIntro}}
                    </p>
                </div>

                <Chapter title="目录" leftCon="马上阅读" @click.native="toDir"/>

                <Blank/>

            </div>
        </div>
        
            <router-view/>
        
        
    </div>
</template>

<script>
import ClassHeader from '../../../components/ClassHeader'
import {mapState} from 'vuex'
import Blank from '../../../components/Blank'
import Tag from '../../../components/Tag'
import Chapter from '../../../components/Chapter'
import BScroll from 'better-scroll'
export default {
    props:{
        id:{
            type:String
        }
    },
    computed:{
        ...mapState(['pictureDaim'])
    },
    data(){
        return{
            BookDetails:{},
            fromName:''
        }
    },
    beforeRouteEnter(to,from,next){
        console.log(from);
        next((vm)=>{
            vm.axios(`/book/${vm.id}`)
            .then(res => {
                // console.log(res)
                vm.BookDetails = res.data
                vm.fromName = from.name
                vm.$nextTick(()=>{
                    if(!vm.listScroll){
                        vm.listScroll = new BScroll(vm.$refs.single,{
                            click:true,
                            bounce:false
                        })
                    }else{
                        vm.listScroll.refresh()
                    }
                })

            })
        })
    },
    beforeDestroy(){
        this.listScroll.destroy()
    },
    components:{
        ClassHeader,
        Blank,
        Tag,
        Chapter
    },
    filters:{
        division(value){
            return Math.floor(Number(value)/10000)
        }
    },
    methods:{
        toDir(){
            
            if(this.fromName == 'SearchContent'){
                this.$router.push({name:'Directorys',params:{bookid:this.BookDetails._id,title:this.BookDetails.title}})
            }else if(this.fromName == 'Mine'){
                this.$router.push({name:'Directorym',params:{bookid:this.BookDetails._id,title:this.BookDetails.title}})
            }else{
                this.$router.push({name:'Directory',params:{bookid:this.BookDetails._id,title:this.BookDetails.title}})
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .book-single{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #fff;
        

        .content-picture{
            margin-top: 23px;
            display: flex;
            padding: 0 20px;

            position: relative;
            .content{

                .icon-thumb_up{
                    position: absolute;
                    right: 20px;
                    bottom: 0;
                }
            }
            img{
                
                height: 124px;
                width: 86px;
                margin-right: 28px;
                
            }

            h3{
                margin-top: 2px;
                font-size: 16px;
                font-weight: 700;
                color:#292929;
                margin-bottom: 14px;
            }

            p{
                font-size: 14px;
                color:#b96567;
                margin-bottom: 14px;
            }
        }

        .book-data{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 77px;
            border-bottom: 1px solid #ebebeb;
            padding: 0 20px;

            
            .num{
                margin-top: 6px;
                font-size: 14px;
                color:#b0b0b0;
                font-weight: 700;
            }

            .txt{
                font-size: 16px;
                color:#a1a0a5;
                transform: scale(.5);
                transform-origin: left;
            }
        }

        .book-raking{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 44px;
            padding: 0 20px;

            .wrapper{
                display: flex;
                align-items: center;
                .icon-accessibility{
                    font-size: 22px;
                    color:#fec619;
                    margin-right: 21px;
                }

                .content{
                    display: inline-block;
                    height: 14px;
                    font-size: 14px;
                    color:#1b1b1b;
                    font-weight: 600;
                    line-height: 14px;
                }
            }

            .tag{
                font-size: 12px;
                color:#808080
            }
        }

        .introduce{
            padding: 22px 20px;
            border-bottom: 1px solid #ebebeb;
            h3{
                font-size: 14px;
                color:#5f5f5f;
                font-weight: 700;
                margin-bottom: 12px;
            }

            .tags{
                margin-bottom: 15px;

                ul{
                    
                    display: flex;
                    flex-wrap: wrap;
                    align-content: center;
                }
            }

            .long-intro{
                width: 100%;
                font-size: 14px;
                line-height: 18px;
                color:#757575;
                display: -webkit-box;
                -webkit-box-orient: vertical;       
                -webkit-line-clamp: 3;
                overflow: hidden;
            }
        }

        .singel-wrapper{
            position: absolute;
            top: 50px;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
        }
    }
</style>