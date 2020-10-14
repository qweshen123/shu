<template>
    <div class="chapters">
        <span class="text">
            {{index}}.&nbsp;&nbsp;正文&nbsp;第00{{index}}章&nbsp;{{title}}
        </span>
        <span class="icon-circle-down">

        </span>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String
        },
        index:{
            type:Number
        }
    }
}
</script>

<style lang="scss" scoped>
    .chapters{
        height: 50px;
        padding: 0 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .text{
            font-size: 13px;
            color:#989898;
            overflow:hidden; //超出的文本隐藏
            text-overflow:ellipsis; //溢出用省略号显示
            white-space:nowrap; //溢出不换行（一行内容
        }

        .icon-circle-down{
            font-size: 17px;
            color:#a1a1a1;
        }
    }
</style>