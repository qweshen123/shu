<template>
    <div class="book-city">
        <div class="book-city-header">
        <!-- <button @click="show">点击</button> -->
            <div class="book-city-in">
                <input type="text" class="book-city-search" v-model="search" @input="show" id="input-test">
                <div class="classify">
                    
                    <span class="text">关键词</span>
                </div>
                <span class="icon-search"></span>
            </div>
            <div class="book-city-class">
                <div class="book-city-nav">                  
                    <router-link :to="{name:'Male',params:{classname:'male'}}" append class="link-item" :class="{con:currentIndex == 0}" @click.native="changeIndex(0)">男生</router-link>
                    <router-link :to="{name:'Female',params:{classname:'female'}}" append class="link-item" :class="{con:currentIndex == 1}" @click.native="changeIndex(1)">女生</router-link>
                    <router-link :to="{name:'Synthesize',params:{classname:'synthesize'}}" append class="link-item" :class="{con:currentIndex == 2}" @click.native="changeIndex(2)">综合</router-link>
                    <router-link :to="{name:'Else',params:{classname:'else'}}" append class="link-item" :class="{con:currentIndex == 3}" @click.native="changeIndex(3)">其他</router-link>
                </div>
                <span class="icon-plus"></span>
            </div>
            <div class="keywords-list">
                <div class="keywords-item" v-for="(item,index) in searchKeywords" :key="index" @click="toPath(item)">
                    <IndexIcon class="index" :index="index + 1"/>
                    <span class="text">{{item}}</span>
                </div>
            </div>
        </div>
        <keep-alive>
            <router-view :male="data.male" :female='data.female' :synthesize="data.picture" :elseElm="data.press"/>
        </keep-alive>
        
    </div>
</template>

<script>
import IndexIcon from '../../components/IndexIcon'
export default {
    data(){
        return{
            data:{},
            currentIndex:0,
            search:'',
            searchKeywords:[]
        }
    },
    created(){
        this.donwLoadData()
    },
    components:{
        IndexIcon
    },
    methods:{
        toPath(bookname){
            this.$router.push({name:'SearchContent',params:{bookname}})
        },
        show(){
            console.log(this.search)
            // 网络请求
            this.axios(`/book/auto-complete?query=${this.search}`)
            .then(res=>{
                this.searchKeywords=res.data.keywords
            })
            .catch(err=>console.log(err))
        },
        donwLoadData(){
            // 开始网络请求 弹出加载轻提示
            this.$toast.loading({
                message: "加载中...",
                forbidClick: true,
                duration: 0, // 提示框不能关闭,直到网络请求成功/失败
            });
            setTimeout(() => {
                // 关闭加载轻提示
                this.$toast.clear();
                this.axios('/cats/lv2/statistics')
                .then(res=>{
                    this.data = res.data
                    console.log(this.data)
                    this.$router.push({name:'Male',params:{male:this.data.male}})
                })
                .catch(err=>{
                    this.$toast.fail({
                        message: "网络异常",
                        duration: 500,
                    });
                    console.log(err)
                })
            }, 1500);
        },
        changeIndex(value){
            // console.log(value)
            this.currentIndex = value
        }
    }
}
</script>

<style lang="scss" scoped>
    .book-city-header{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: 0 15px 0 20px;
        background-color: #f17b6b;
        z-index: 10;

        .keywords-list{
            position: absolute;
            top: 48px;
            left: 30px;
            right:108px;
            background-color: rgba(0,0,0,.4);
            padding: 0 5px;

            .keywords-item{
                margin: 10px 0;
                color:#eee;
                display: flex;
                align-items: center;
                &:hover{
                    color:orange;
                }
                .index{
                    display: inline-block;
                    width: 24px;
                    height: 20px;
                    border-radius: 5px;
                    line-height: 20px;
                    text-align: center;
                    margin-right: 10px;
                }

                .text{
                    flex: 1;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
            
        }

        .book-city-in{
            position: relative;
            width: 100%;
            padding: 14px 0;
            display: flex;

            .book-city-search{
                flex: 1;
                height: 32px;
                font-size: 14px;
                color:#fff;
                text-indent: 33px;
                line-height: 32px;
                border-radius:20px;
                border:0;
                background-color: rgba(255,255,255,.3);
                outline: none;
            }

            #input-test::-webkit-input-placeholder{
                font-size: 14px;
                color:#fff;
            }

            .classify{
                height: 32px;
                width: 73px;
                border-radius: 20px;
                background-color: rgba(255,255,255,.3);
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 10px;

                .icon-list2{
                    font-size: 17px;
                    color:#fff;
                    margin-right: 2px;
                }

                .text{
                    font-size: 13px;
                    color:#fff;
                }
            }

            .icon-search{
                position: absolute;
                top: 26px;
                left: 14px;
                font-size: 14px;
                color:#fff;

            }
        }

        .book-city-class{
            width: 100%;
            display: flex;
            height: 30px;

            .book-city-nav{
                
                flex:1;
                line-height: 30px;
                
                .link-item{
                    font-size: 18px;
                    color:#fff;
                    margin-right: 35px;
                    text-decoration: none;

                    &.con{
                        font-weight: 700;
                        color:#fff351;
                    }
                }
            }

            .icon-plus{
                width: 20px;
                height: 20px;
                font-size: 20px;
                margin: 0 10px;
                line-height: 30px;
                color:#fff
            }
        }
    }
</style>