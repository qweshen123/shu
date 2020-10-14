<template>
    <div class="tag">
        {{ttag}}
    </div>
</template>

<script>
export default {
    props:{
        ttag:{
            type:String
        }
    }
}
</script>

<style lang="scss" scoped>
    .tag{
        display: inline-block;
        font-size: 16px;
        padding: 12px;
        background-color: #efeef3;
        color: #99989d;
        border-radius: 12px;
        transform: scale(.5);
        transform-origin: left top;
    }
</style>