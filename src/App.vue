<template>
  <div id="app">
    <div class="bottom-bar">
      <!-- <router-link to="/bookrack" class="bottom-bar-item" :class="{con:currentIndex == 0}" @click.native="changIndex(0)">
        <span class="icon-book icon"></span>
        <span class="bar-font">书架</span>

      </router-link> -->
      <router-link to="/" class="bottom-bar-item" :class="{con:currentIndex == 1}" @click.native="changIndex(1)">
        <span class="icon-briefcase icon"></span>
        <span class="bar-font">书城</span>

      </router-link>
      <router-link to="/community" class="bottom-bar-item" :class="{con:currentIndex == 2}" @click.native="changIndex(2)">
        <span class="icon-folder-plus icon"></span>
        <span class="bar-font">社区</span>

      </router-link>
      <router-link to="/mine" class="bottom-bar-item" :class="{con:currentIndex == 4}" @click.native="changIndex(4)">
        <span class="icon-search icon"></span>
        <span class="bar-font">我的</span>
      </router-link>
      <router-link to="/login" class="bottom-bar-item" :class="{con:currentIndex == 3}" @click.native="changIndex(3)">
        <span class="icon-price-tag icon"></span>
        <span class="bar-font">登录</span>

      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data(){
    return{
      currentIndex:1
    }
  },
  methods:{
    changIndex(index){
      this.currentIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #fff;
  border: 1px solid #f3f3f3;
  display: flex;
  justify-content: space-around;
  align-items: center;
  // background-color: skyblue;
  padding: 7px 0;
  z-index: 0;

  .bottom-bar-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color:#a4a4a4;
    height: 100%;
    text-decoration: none;
    
    &.con{
      color:#a70f0c;
    }

    .icon{
      font-size: 22px;
    }

    .bar-font{
      display: inline-block;
      font-size: 14px;
      height: 28px;
      width: 28px;
      transform: scale(.7);

    }

  }
}
</style>
