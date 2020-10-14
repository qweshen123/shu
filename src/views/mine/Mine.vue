<template>
    <div class="mine">
        <div class="header">
            <img src="../../assets/images/7b98000079646a6e5b78.jpg" alt="头像">
            <div class="context">
                <div class="user-name">{{userName}}</div>
                <div class="welcome">尊敬会员</div>
                <span class="icon-keyboard_arrow_right po"></span>
            </div>
        </div>
        <div class="vip">
            <div class="text">
                <h2>开通追书尊享会员</h2>
                <p>十万书库免费看, 8大权益开通即可享受</p>
            </div>
            <div class="button">立即开通</div>
        </div>
        <div class="changs">
            <Button title="专享限免" text="VIP书籍免费"/>
            <Button title="专享限免" text="VIP书籍免费"/>
            <Button title="专享限免" text="VIP书籍免费"/>
        </div>
        <div class="nav">
            <div class="item">
                <span class="icon-favorite"></span>
                <h3>话题</h3>
            </div>
            <div class="item">
                <span class="icon-favorite"></span>
                <h3>话题</h3>
            </div>
            <div class="item">
                <span class="icon-favorite"></span>
                <h3>话题</h3>
            </div>
        </div>

        <div class="class-item">
            <MineItem title="我的账户" img="icon-book" con="书币:0 书卷0" btn="充值"/>
            <MineItem title="我的账户" img="icon-book" con="书币:0 书卷0" btn="充值"/>
            <MineItem title="我的收藏" img="icon-book" con="书币:0 书卷0" btn="充值" @click.native="changes"/>
        </div>

        <History v-if="isHistory" @isShow="changes"/>

        <router-view/>
    </div>
</template>

<script>
import History from './History'
import Button from '../../components/Button'
import MineItem from '../../components/MineItem'
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState(['userName'])
    },
    components:{
        Button,
        MineItem,
        History
    },
    data(){
        return{
            isHistory:false
        }
    },
    methods: {
        changes(){
            this.isHistory = !this.isHistory
        }
    },
}
</script>

<style lang="scss" scoped>
    .mine{
        background-image: linear-gradient(to left top, #f17063, #f58573);;
        // background-color: #f56565;
        z-index: 20;
        .header{
            position: relative;
            padding:0 20px;
            display: flex;
            align-items: center;
            height: 94px;
            img{
                height: 55px;
                width: 55px;
                border-radius: 50%;
                margin-right: 17px;
            }

            .context{
                .welcome,
                .user-name{
                    font-size: 15px;
                    color:#ffded2;
                    line-height: 24px;
                }

                .po{
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 15px;
                    color:#fffbd9;
                }
            }
        }

        .vip{
            height: 60px;
            padding: 0 15px;
            margin: 0 20px;
            background-image: linear-gradient(to right bottom,#c2c7d1,#a5b1bb);
            border-radius: 20px 20px 0 0;
            display: flex;
            align-items: center;
            box-shadow:0px -9px 18px -3px rgba(0,0,0,.1); 

            h2{
                font-size: 14px;
                font-weight: 450;
                color:#696d77;
                margin-bottom: 5px;
            }

            p{
                
                font-size: 12px;
                color:#696d77;
                line-height: 14px;
                
            }

            .button{
                background-image: linear-gradient(to right,#9a9baf,#606175);
                height: 25px;
                width: 70px;
                font-size: 12px;
                text-align: center;
                line-height: 25px;
                border-radius: 15px;
                color:#fff;
                margin-left: 20px;
            }
        }

        .changs{
            height: 95px;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-around;
            border-bottom:1px solid rgb(240, 240, 240)
        }

        .nav{
            display: flex;
            justify-content: space-around;
            align-items: center;
            background-color: #fff;
            height: 84px;
            border-bottom:1px solid rgb(240, 240, 240);
            .item{
                display: flex;
                flex-direction: column;
                align-items: center;

                span{
                    display: inline-block;
                    font-size: 20px;
                    margin-bottom: 8px;
                }

                h3{
                    font-size: 12px;
                    color:#c7c7c7;
                }
            }
        }
    }
</style>