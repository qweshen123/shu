<template>
    <div class="chapter">
        <div class="title">
            {{title}}
        </div>
        <div class="chapter-left">
            <span class="txt">{{leftCon}}</span>
            <span class="tag">&gt;</span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String
        },
        leftCon:{
            type:String
        }
    }
}
</script>

<style lang="scss" scoped>
    .chapter{
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 42px;
        .title{
            font-size: 15px;
            color:#5d5d5d;
            font-weight: 700;
        }

        .chapter-left{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .txt{
            font-size: 12px;
            margin-right: 12px;
            color:#a7a7a7;
        }

        .tag{
            font-size: 13px;
            color:#a7a7a7;
        }
    }
</style>