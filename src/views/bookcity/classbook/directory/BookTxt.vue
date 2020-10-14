<template>
    <div class="book-txt">
        <div class="book-header" :class="{con:isCon}">
            <span class="back" @click="close">
                &lt;
                返回目录
            </span>
            <span class="tit">{{htitle}}</span>
            <span class="next" v-show="isShow" @click="next">下一章</span>
            <span class="next"  @click="prev">上一章</span>
        </div>
        <div class="book-body" ref="txt">
            <div class="box" ref="box">
                <h3 class="title" ref="top">{{title}}</h3>
                <p v-for="(item,index) in contentArr" :key="index" class="passages" :ref="index">{{item}}</p>
            </div>
            <div class="left" @click="toPrev"></div>
            <div class="right"  @click="toNext"></div>
        </div>
        <div class="book-bottom" :class="{con:isCon}" >
            <span class="time" v-for="(item,index) in time" :key="index" >{{item}}</span>
        </div>
        
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    props:{
        cpContent:{
            type:String
        },
        title:{
            type:String
        },
        index:{
            type:Number
        },
        htitle:{
            type:String
        },
        
    },
    data(){
        return{
            time:"",
            isShow:false,
            isCon:false,
            heightIndex:0
        }
    },
    watch:{
        cpContent(newValue,oldValue){
            if(newValue !== oldValue){
                this.isShow = false
                this.$nextTick(()=>{
                    this.listScroll.refresh()
                })
            }
        }
    },
    computed:{
        contentArr(){
            let arr = this.cpContent.split("\n")
            arr = arr.filter((item)=>{
                if(item != ''){
                    return true
                }
            })
            return arr
        }
    },
    methods:{
        close(){
            this.$emit("close")
        },
        next(){
            // console.log(this.index)
            let nextIndex = this.index
            this.$emit("next",nextIndex)
            this.heightIndex = 0
            this.$nextTick(()=>{
                if(this.listScroll){
                    this.listScroll.scrollToElement(this.$refs.top,0);
                }
            })
        },
        prev(){
            let prevIndex = this.index - 2
            this.$emit("next",prevIndex)
            this.heightIndex = 0
            this.$nextTick(()=>{
                if(this.listScroll){
                    this.listScroll.scrollToElement(this.$refs.top,0);
                }
            })
        },
        toNext(){
            // console.log(this.$refs.txt.clientHeight,this.$refs.box.offsetHeight)
            let maxHeight = this.$refs.txt.clientHeight
            let sumHeight = 0
            let count = 0
            if(this.heightIndex > this.$refs.box.children.length){
                this.heightIndex = this.$refs.box.children.length
                this.listScroll.scrollToElement(this.$refs.box.children[this.heightIndex],0);
            }else{

                for(let i = this.heightIndex;i < this.$refs.box.children.length;i++){
                    if(sumHeight < maxHeight){
                        console.log(this.$refs.box.children[i].offsetHeight)
                        sumHeight += this.$refs.box.children[i].offsetHeight
                        count++
                    }else{
                    
                        break
                    }

                   
                } 
                this.heightIndex = this.heightIndex + count -1
                this.listScroll.scrollToElement(this.$refs.box.children[this.heightIndex],0);
                console.log(this.$refs.box.children[this.heightIndex].offsetHeight)
            }
            
        },
        toPrev(){
            // console.log(this.$refs.txt.clientHeight,this.$refs.box.offsetHeight)
            // console.log(this.$refs.box.children[2])
            let maxHeight = this.$refs.txt.clientHeight
            let sumHeight = 0
            let count = 0
            if(this.heightIndex < 0){
                this.heightIndex = 0
                this.listScroll.scrollToElement(this.$refs.box.children[this.heightIndex],0);
            }else{
                for(let i = this.heightIndex;i > 0;i--){
                    if(sumHeight < maxHeight){
                        console.log(this.$refs.box.children[i].offsetHeight)
                        sumHeight += this.$refs.box.children[i].offsetHeight
                        count++
                    }else{
                        break
                    }

                   
                } 
                this.heightIndex = this.heightIndex - count 
                this.listScroll.scrollToElement(this.$refs.box.children[this.heightIndex],0);
                console.log(this.$refs.box.children[this.heightIndex].offsetHeight)
            }
            
        }
    },
    created(){
        
        if(!this.timer){
            this.timer = setInterval(()=>{
                let myDate = new Date();
                // console.log(myDate.toLocaleString())
                this.time = myDate.toLocaleString().split(' ')
            },1000)
        }

    },
    beforeDestroy(){
        clearInterval(this.timer);
        this.listScroll.destroy();
    },
    mounted(){
        this.$nextTick(()=>{
            if(!this.listScroll){
                this.listScroll = new BScroll(this.$refs.txt,{
                    click:true,
                    bounce:false
                });
                this.listScroll.on("scrollEnd", (pos) => {
                    // console.log(this.$refs.box.offsetHeight,Math.abs(pos.y))
                    if(Math.abs(Math.floor(pos.y))>this.$refs.box.offsetHeight*.9){
                        this.isShow = true
                    }
                    
                });
                this.listScroll.on("scroll", () => {
                    // console.log(123)
                    
                });
            }else{
                this.listScroll.refresh()
            }
        })
    },
}
</script>

<style lang="scss" scoped>
    .book-txt{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #f1eced;
        padding: 0 20px;
        z-index: 50;
        .book-header{
            position: absolute;
            top: 0;
            left:0;
            right: 0;
            height: 55px;
            &.con{
                background-color: rgba(0,0,0,.1);
            }

            &::after{
                content:"";
                display: block;
                clear: both;
            }

            .back,
            .next{
                font-size: 11px;
                color:#696465;
                line-height: 55px;
            }

            .back{
                float: left;
                margin-left: 20px;
            }
            .next{
                float: right;
                margin-right: 20px;
            }

            .tit{
                position: absolute;
                line-height: 55px;
                left: 50%;
                transform: translateX(-50%);
                
                font-size: 14px;
            }
        }

        .book-bottom{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 37px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            &.con{
                background-color: rgba(0,0,0,.1);
            }

            span{

                &:nth-child(1){
                    margin-left: 20px;
                }
                &:nth-child(2){
                    margin-right: 20px;
                }
            }
        }

        .book-body{
            position: absolute;
            left: 20px;
            right: 20px;
            top: 55px;
            bottom: 37px;
            overflow: hidden;

            .left{
                // background-color: rgba(255,0,0,.1);
                position: absolute;
                top: 0;
                left: 0;
                width: 50%;
                height: 100%;
            }
            .right{
                // background-color: rgba(0,255,0,.1);
                position: absolute;
                top: 0;
                right: 0;
                width: 50%;
                height: 100%;
            }

            .box{
                position: absolute;
            }

            .title{
                font-size: 34px;
                font-weight: 700;
                color:#191411;
                text-align: center;
                margin-bottom: 28px;
            }

            .passages{
                font-size: 22px;
                color:#241f1c;
                line-height: 37px;
                text-indent: 2em;
                margin-bottom: 10px;
            }
        }
    }
</style>