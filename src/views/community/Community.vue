<template>
    <div class="community">

        <div class="community-header fix">
            <h3 class="title">热门</h3>
            <div class="item">关注</div>
            <div class="item">热门</div>
        </div>

        <div class="po">
            <Blank/>

            <div class="community-header con">
                <div class="item-con">爱写文的看这里</div>
                <div class="item-con">同学都在这里</div>
            </div>

            <Blank/>

            <div class="comments">
                <CommentsItem v-for="(item,index) in posts" :key="index" :item="item" />
            </div>
        </div>
        <keep-alive>
            <router-view/>
        </keep-alive>

    </div>
</template>

<script>
import Blank from '../../components/Blank'
import CommentsItem from './CommentsItem'
export default {
    components:{
        Blank,
        CommentsItem
    },
    created(){
        this.axios('/post/by-block?block=ramble&duration=all&sort=updated&type=all&start=0&limit=20&distillate=')
        .then(res => {
            // console.log(res.data.posts)
            this.posts = res.data.posts
        })
    },
    data(){
        return{
            posts:[]
        }
    }

}
</script>

<style lang="scss" scoped>
    .community{
        position: relative;
    }
    .po{
        position: absolute;
        top: 52px;
        left: 0;
        right: 0;
        z-index: -1;
        margin-bottom: 50px;
        
    }
    .community-header{
        height: 44px;
        padding: 0 24px;
        display: flex;
        align-items: center;

        &.fix{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background-color: #fff;
        }

        &.con{
            

            .item-con:nth-child(1){
                font-size: 13px;
                color:#cf625b;
            }

            .item-con:nth-child(2){
                font-size: 13px;
                color:#313131;
                margin-left: 27px;
            }
        }

        h3{
            font-size: 20px;
            font-weight: 700;
            color:#000000;
        }

        .item{
            font-size: 15px;
            margin-left: 10px;
        }
    }
</style>