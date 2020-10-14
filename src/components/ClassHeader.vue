<template>
    <div class="class-header">
        <div class="btn" @click="goBack">
            <span class="icon-arrow_lift"></span>
            <span class="content">返回</span>
        </div>
        <h3 class="title">{{htitle}}</h3>
    </div>
</template>

<script>
export default {
    props:{
        htitle:{
            type:String
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
    .class-header{
        position: relative;
        height: 50px;
        padding: 0 7.5px;

        h3.title{
            text-align: center;
            font-size: 18px;
            line-height: 50px;
            color:#1d1d1d;
        }

        .btn{
            position: absolute;
            left: 7.5px;
            top:16px;
            color:#d21d29;
            display: flex;
            justify-content: center;
            align-items: center;

            .icon-arrow_lift{
                font-size: 22px;
                margin-right: 6px;
            }

            .content{
                font-size: 14px;
            }
        }

    }
</style>