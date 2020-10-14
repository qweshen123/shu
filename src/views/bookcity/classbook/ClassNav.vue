<template>
    <div class="class-nav-box">
        <div class="class-nav border-bottom-1px">
            <div class="nav-all" :class="{con:currentIndex == 10}" @click="chang(10,'all')">全部</div>
            <ul class="nav-wrapper">
                <li v-for="(item,index) in titleArr" :key="index" :class="{con:currentIndex == index}" @click="chang(index,item)">{{item}}</li>
            </ul>
        </div>
        <div class="class-nav">
            <div class="nav-all" :class="{con:payIndex == 10}" @click="changPay(10)">全部</div>
            <ul class="nav-wrapper">
                <li :class="{con:payIndex == 0}" @click="changPay(0)">vip</li>
                <li :class="{con:payIndex == 1}" @click="changPay(1)">付费</li>
                <li :class="{con:payIndex == 2}" @click="changPay(2)">免费</li>
            </ul>
        </div>
        <div class="class-nav">
            <div class="nav-all" :class="{con:heatIndex == 10}" @click="changHeat(10)">人气</div>
            <ul class="nav-wrapper">
                <li :class="{con:heatIndex == 0}" @click="changHeat(0)">留存</li>
                <li :class="{con:heatIndex == 1}" @click="changHeat(1)">评分</li>
                <li :class="{con:heatIndex == 2}" @click="changHeat(2)">字数</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            currentIndex:10,
            payIndex:10,
            heatIndex:10
        }
    },
    props:{
        titleArr:{
            type:Array
        }
    },
    methods:{
        chang(index,minor){
            console.log(minor)
            this.$emit('setting',minor)
            this.currentIndex = index;
        },
        changPay(index){
            this.payIndex = index;
        },
        changHeat(index){
            this.heatIndex = index;
        }
    },
    // computed:{
    //     titleArr(){
    //         // console.log(this.classData)
    //         if(JSON.stringify(this.classData) == '{}'){return}
    //         // console.log('123')
    //         let arr = this.classData[this.className].find(i => {
    //             if(i.major == this.htitle){
    //                 return true
    //             }
    //         })
            
    //         return arr.mins

    //     }
    // }
}
</script>

<style lang="scss" scoped>
    .class-nav{
        height: 48px;
        padding: 0 18px;
        display: flex;
        align-items: center;
        border-bottom: 1px ;
        position: relative;

        &::after{
            content:'';
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1px;
            background-color: #f6f6f6;

           
        }

        .nav-all{
            display: inline-block;
            font-size: 12px;
            width: 44px;
            height: 23px;
            line-height: 23px;
            color:#535353;
            margin-right: 18px;
            border-radius: 8px;
            text-align: center;
            font-weight: 700;

            &.con{
                color:#f18d8c;
                background-color: #feeced;
            }

        }

        .nav-wrapper{

            &::after{
                content:"";
                display: block;
                clear: both;
            }

            li{
                float: left;
                font-size: 12px;
                padding: 6px 10px;
                border-radius: 8px;
                color: #535353;

                &.con{
                    color:#f18d8c;
                    background-color: #feeced;
                }
            }
        }

    }
</style>