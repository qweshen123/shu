<template>
    <div class="index-icon" :class="{con:isCon}">
        {{index}}
    </div>
</template>

<script>
export default {
    props:['index'],
    computed:{
        isCon(){
            return this.index<4?true:false
        }
    }
}
</script>

<style lang="scss" scoped>
    .index-icon{
        background-color: #39393e;
        &.con{
            background-color: #00cd57;
        }
    }
</style>