<template>
    <div class="mine-item">
        <span :class="`${img} img`"></span>
        <div class="content">
            <h3>{{title}}</h3>
            <p v-if="con">{{con}}</p>
            <div class="icon">{{btn}}</div>
            <span class="icon-keyboard_arrow_right"></span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
        },
        img:{
            type:String
        },
        con:{
            type:String
        },
        btn:{
            type:String
        }
    }
}
</script>

<style lang="scss" scoped>
    .mine-item{
        height: 65px;
        background-color: #fff;
        display: flex;
        align-items: center;
        padding: 0 15px;
        .img{
            display: inline-block;
            font-size: 25px;
            margin-right:20px;
        }

        h3{
            font-size: 17px;
            color:#525252;
            margin-bottom: 5px;
        }

        p{
            font-size: 13px;
            color:#949494;
        }

        .content{
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            flex:1;
            border-bottom: 1px solid #eeeeee;
            .icon-keyboard_arrow_right{
                position: absolute;
                right: 0;
                top:50%;
                transform: translateY(-50%);
                font-size: 15px;
                color:#d4d4d4;
                margin-left: 20px;
            }

            .icon{
                position: absolute;
                right: 30px;
                top:50%;
                transform: translateY(-50%);
                font-size: 15px;
            }
        }
    }
</style>