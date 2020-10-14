<template>
    <div class="female" ref="wrapper">
        <ul class="box">
            <li v-for="(item,index) in female" :key="index" class="item" @click="toClassBook(item.name)">
                <div class="text">
                    <h3>{{item.name}}</h3>
                    <p>热度:{{item.bookCount}}</p>
                    <p>月点击量:{{item.monthlyCount}}</p>
                </div>
                <ul class="item-box">
                    <li v-for="(img,index) in  item.bookCover" :key="index" class="item-box-item" :class="`img-${index}`">
                        <img :src="`${pictureDaim}${img}`" alt="背景图" class="cover">
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>

import {mapState} from 'vuex'
import BScroll from 'better-scroll'
export default {
    props:{
        female:{
            type:Array
        }
    },
    computed:mapState(['pictureDaim']),
    
    data(){
        return{
            className:'female',
        }
    },
    mounted(){
        this.$nextTick(()=>{
            if(!this.listScroll){
                this.listScroll = new BScroll(this.$refs.wrapper,{
                    click:true,
                    bounce:false
                })
            }else{
                this.listScroll.refresh()
            }
        })
    },
    beforeDestroy(){
        this.listScroll.destroy()
    },
    methods:{
        toClassBook(name){
            this.$router.push({name:'ClassBook',params:{title:name,classname:this.className}})
        }
    },
    
}
</script>

<style lang="scss" scoped>
    .female{
        position: fixed;
        top: 92px;
        left: 0;
        right: 0;
        bottom: 50px;
        overflow: hidden;

        .box{
            padding: 0 10px;
            display: flex;
            flex-wrap: wrap;
            

            .item{
                
                width: 100%;
                margin-top: 10px;
                height: 20vh;
                position: relative;
                display: flex;
                background-color: #f8f8f8;
                border-radius: 10px;

                &:last-child{
                    margin-bottom: 10px;
                }

                

                .text{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding-left: 20px;;
                    h3{
                        font-size: 24px;
                        line-height: 34px;
                        font-weight: 700;
                        color:#666
                    }
                    p{
                        font-size: 14px;
                        line-height: 22px;
                        color:#666
                    }
                }

                .item-box{
                    flex: 1;
                    position: relative;

                    .item-box-item{
                        position: absolute;

                        &.img-1{
                            bottom:5px;
                            right: 20px;
                        }
                        &.img-0{
                            top:5px;
                            right: 40px;
                            z-index: 10;
                        }
                        &.img-2{
                            bottom:10px;
                            right: 60px;
                        }

                        .cover{
                            width: 80px;
                            box-shadow:3px 4px 8px #333333;

                            
                        }
                    }
                }
            }
        }
    }
</style>