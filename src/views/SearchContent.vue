<template>
    <div class="search-content" >
        <ClassHeader htitle="搜索结果"/>
        <div class="book-list" ref="bookwrapper">

        <ul class="wrapper" >
            <van-empty
                class="custom-image"
                image="error"
                description="没找到该类小说"
                v-show="isEmpty"
            />
                <router-link tag="li" v-for="(item,index) in bookList" :key="index" :to="{name:'BookSingles',params:{id:item._id}}">
                    <img :src="`${pictureDaim}${item.cover}`" alt="图片">
                    <div class="content">
                        <h3 class="content-title">
                            {{item.title}}
                        </h3>
                        <p class="content-shortIntro">
                            {{item.shortIntro}}
                        </p>
                        <p class="content-author">
                            {{item.author}}
                        </p>
                        <div class="tag">
                            {{item.cat}}
                        </div>
                        <span class="icon-thumb_up"  @click.stop="showItem(item)" :class="{con:haveCon(item._id)}"></span>
                    </div>
                </router-link>
        </ul>
        </div>

        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<script>
import {SET_HISTORY} from '../store/mutation-types'
import {mapState} from 'vuex'
import ClassHeader from '../components/ClassHeader'
import BScroll from 'better-scroll'
export default {
    props:{
        bookname:{
            type:String
        },
        
    },
    data() {
        return {
            bookList:[],
        }
    },
    components:{
        ClassHeader
    },
    beforeRouteEnter(to,from,next){
        // console.log(to,from);
        next((vm)=>{
            vm.axios(`/book/fuzzy-search?query=${vm.bookname}`)
            .then(res => {
                
                vm.bookList = res.data.books

                vm.$nextTick(()=>{
                    if(!vm.listScroll){
                        vm.listScroll = new BScroll(vm.$refs.bookwrapper,{
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
    computed: {
        isEmpty(){
            if(this.bookList.length == 0){
                return true
            }

            return false
        },
        ...mapState(['pictureDaim','bookMarkList'])
    },
    methods: {
        showItem(item){
            console.log(item)
            this.$store.commit(SET_HISTORY,item)
        },
        haveCon(id){
            let isFlag = false
            if(this.bookMarkList.length != 0){
                for(let i = 0 ;i<this.bookMarkList.length;i++){
                    if(this.bookMarkList[i]._id == id){
                        isFlag = true
                        break
                    }
                }
            }
            return isFlag
        }
    },
}
</script>

<style lang="scss" scoped>
    .search-content{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 10;
        .book-list{
            
            padding: 0 15px;
            position: fixed;
            top: 50px;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            
        }

        .wrapper{
            
            
        li{
            margin-top: 23px;
            height: 107px;
            display: flex;
            
            img{
                height: 100%;
                width: 78px;
                margin-right: 13px;
            }

            .content{
                position: relative;
                padding-top: 4px;

                .icon-thumb_up{
                    position: absolute;
                    right:0;
                    top: 0;

                    &.con{
                        color:orange
                    }
                }

                .content-title{
                    font-size: 15px;
                    font-weight: 700;
                    color: #383838;
                    margin-bottom: 18px;
                }

                .content-shortIntro{
                    overflow : hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    font-size: 12px;
                    color: #858585;
                    margin-bottom: 18px;
                    line-height: 15px;
                }

                .content-author{
                    font-size: 10px;
                    color:#323232;
                }

                .tag{
                    position: absolute;
                    right: 0;
                    bottom: 2px;
                    font-size: 8px;
                    padding: 6px;
                    background-color: #eeedf2;
                    border-radius: 4px;
                    color:#9a999e;
                }
            }
        }
    }
    }
</style>