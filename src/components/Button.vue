<template>
    <div class="button">
        <h3>{{title}}</h3>
        <p>{{text}}</p>
    </div>
</template>

<script>
export default {
    props:['title','text']
}
</script>

<style lang="scss" scoped>
    .button{
        width: 95px;
        height: 55px;
        box-shadow: 0 0 10px 2px #eaeaea;
        padding: 0 10px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3{
            font-size: 13px;
            color:#3e3e3e;
            margin-bottom: 5px;
        }

        p{
            font-size: 10px;
            color:#777777; 
        }
    }
</style>