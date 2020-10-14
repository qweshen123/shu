<template>
    <div class="directory">
        <ClassHeader :htitle="title"/>
        <div class="wrapper" ref="chaptersList">
            <div class="box">
                <Chapters v-for="(item,index) in chapters" :key="index" :title="item.title" :index="index" @click.native="toTxt(index)"/>
            </div>
        </div>
        <BookTxt :cpContent="cpContent" :index="curIndex" :title="heading" v-if="isShow" @close="close" @next="toTxt" :htitle="title"/>
    </div>
</template>

<script>
import BookTxt from './BookTxt'
import ClassHeader from '../../../../components/ClassHeader'
import Chapters from '../../../../components/Chapters'
import BScroll from 'better-scroll'
export default {
    props:{
        bookid:{
            type:String
        },
        title:{
            type:String
        }
    },
    data(){
        return{
            chapters:[],
            cpContent:"",
            curIndex:0,
            heading:"",
            isShow:false
        }
    },
    beforeRouteEnter(to,from,next){
        console.log(to,from);
        next((vm)=>{
            console.log(vm.bookid)
            vm.axios(`/atoc?view=summary&book=${vm.bookid}`)
            .then(res => {
                console.log(res.data[0]._id)
                vm.axios(`/atoc/${res.data[0]._id}?view=chapters`)
                .then(res => {
                    console.log(res)
                    vm.chapters = res.data.chapters

                    vm.$nextTick(()=>{
                            if(!vm.listScroll){
                                vm.listScroll = new BScroll(vm.$refs.chaptersList,{
                                    click:true,
                                    bounce:false
                                })
                            }else{
                                vm.listScroll.refresh()
                            }
                    })
                })
                
            })
        })
    },
    beforeDestroy(){
        this.listScroll.destroy()
    },
    components:{
        ClassHeader,
        Chapters,
        BookTxt
    },
    methods:{
        toTxt(index){
            if(index<0){return}
            let link = encodeURIComponent(this.chapters[index].link)
            console.log(link)
            this.axios(`/chapter/${link}`)
            .then(res => {
                console.log(res)
                this.cpContent = res.data.chapter.cpContent
                this.curIndex = res.data.chapter.order
                this.heading = res.data.chapter.title

                this.$nextTick(()=>{
                    this.isShow = true
                })
            })
            .catch(err => console.log(err))
        },
        close(){
            this.isShow = false
        }
    }
}
</script>

<style lang="scss" scoped>
    .directory{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #fff;

        .wrapper{
            position: absolute;
            top: 50px;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
        }
    }
</style>