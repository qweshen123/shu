<template>
    <div class="class-book">
        <ClassHeader :htitle="title"/>
        <ClassNav v-if="titleArr"  @setting="getMinor" :titleArr="titleArr"/>
        <div class="book-list" ref="bookwrapper">
            <ul class="wrapper">
            <van-empty
                class="custom-image"
                image="error"
                description="没找到该类小说"
                v-show="isEmpty"
            />
                <router-link tag="li" v-for="(item,index) in books" :key="index" :to="{name:'BookSingle',params:{id:item._id}}" @click.native="showItem(item)">
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
                            {{item.minorCate}}
                        </div>
                        <span class="icon-thumb_up"  @click.stop="showItem(item)" :class="{con:haveCon(item._id)}"></span>
                    </div>
                </router-link>
            </ul>
        </div>
        
        <router-view />
    </div>
</template>

<script>

import {SET_HISTORY} from '../../../store/mutation-types'
import {mapState} from 'vuex'
import ClassHeader from '../../../components/ClassHeader'
import ClassNav from './ClassNav'
import BScroll from 'better-scroll'
export default {
    props:{
        title:{
            type:String
        },
        classname:{
            type:String
        }
    },
    computed:{
        titleArr(){
            console.log(this.classData,'5456456456')
            if(JSON.stringify(this.classData) == '{}'){return}
            console.log(this.classname,'123456')
            let arr = this.classData[this.classname].find(i => {
                if(i.major == this.title){
                    return true
                }
            })

            if(arr){
                return arr.mins
            }
            return false
        },
        ...mapState(['pictureDaim','bookMarkList'])
    },
    components:{
        ClassHeader,
        ClassNav
    },
    data(){
        return{
            classData:{},
            books:[],
            isEmpty:false,
            isCon:false
        }
    },
    
    beforeRouteEnter(to,from,next){

        next((vm)=>{

            vm.axios('/cats/lv2')
            .then(res => {

                vm.classData = res.data
                console.log(vm.classname,vm.title)
                // 获取全部books
                vm.books = []
                for(let i = 0 ;i<vm.titleArr.length;i++){
                    console.log(vm.titleArr[i])
                    vm.axios(`/book/by-categories?gender=${vm.classname}&type=hot&major=${vm.title}&minor=${vm.titleArr[i]}&start=0&limit=20`)
                    .then(res => {
                        
                        for(let j = 0;j < res.data.books.length; j++){
                            vm.books.push(res.data.books[j])
                        }
                        
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
                }
            })
        })
    },
    
    methods:{
        getMinor(minor){
            if(minor == 'all'){
                // 获取全部books
                this.books = []
                for(let i = 0 ;i<this.titleArr.length;i++){
                    console.log(this.titleArr[i])
                    this.axios(`/book/by-categories?gender=${this.classname}&type=hot&major=${this.title}&minor=${this.titleArr[i]}&start=0&limit=20`)
                    .then(res => {
                        for(let j = 0;j < res.data.books.length; j++){
                            this.books.push(res.data.books[j])
                        }

                        this.$nextTick(()=>{
                            if(!this.listScroll){
                                this.listScroll = new BScroll(this.$refs.bookwrapper,{
                                    click:true,
                                    bounce:false
                                })
                            }else{
                                this.listScroll.refresh()
                            }
                        })
                    })
                }
            }else{
                this.axios(`/book/by-categories?gender=${this.classname}&type=hot&major=${this.title}&minor=${minor}&start=0&limit=20`)
                .then(res => {
                    this.books = []
                    
                    console.log(res.data.books)
                    if(res.data.books.length !== 0){
                        this.isEmpty = false
                        for(let j = 0;j < res.data.books.length; j++){
                            this.books.push(res.data.books[j])
                        }

                        this.$nextTick(()=>{
                            if(!this.listScroll){
                                this.listScroll = new BScroll(this.$refs.bookwrapper,{
                                    click:true,
                                    bounce:false
                                })
                            }else{
                                this.listScroll.refresh()
                            }
                        })
                    }else{
                        this.isEmpty = true
                    }

                })
            }
        },
        
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
    watch:{
        books(newValue,oldValue){
            if(newValue !== oldValue){
                if(this.listScroll){
                    this.$nextTick(()=>{
                        this.listScroll.refresh()
                    })
                }
            }
        }
    },
    
    beforeDestroy(){
        this.listScroll.destroy()
    },
}
</script>

<style lang="scss" scoped>
    .class-book{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10;
        background-color: #fff;

        .btn{
            position: absolute;
            z-index: 10;
        }

        .book-list{
            margin-top: 15px;
            padding: 0 15px;
            position: fixed;
            top: 194px;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
        }
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
</style>