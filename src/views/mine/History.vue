<template>
  <div class="history" >
    <div class="class-header">
      <div class="btn" @click="goBack">
        <span class="icon-arrow_lift"></span>
        <span class="content">返回</span>
      </div>
      <h3 class="title">收藏</h3>
    </div>
    <div class="book-list" ref="bookwrapper">
      <ul class="wrapper">
        <van-empty
          class="custom-image"
          image="error"
          description="没找到该类小说"
          v-show="isEmpty"
        />
        <li
          tag="li"
          v-for="(item, index) in bookMarkList"
          :key="index"
          :to="{ name: 'BookSingle', params: { id: item._id } }"
          @click="toPath(item._id)"
        >
          <img :src="`${pictureDaim}${item.cover}`" alt="图片" />
          <div class="content">
            <h3 class="content-title">
              {{ item.title }}
            </h3>
            <p class="content-shortIntro">
              {{ item.shortIntro }}
            </p>
            <p class="content-author">
              {{ item.author }}
            </p>
            <div class="tag">
              {{ item.minorCate ||  item.cat}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapState } from "vuex";
export default {
  methods: {
    goBack() {
      this.$emit("isShow");
    },
    toPath(id) {
        this.$router.push({name:'BookSinglem',params: {id}})
    }
  },
  mounted() {
    
    this.$nextTick(() => {
        if (!this.listScroll) {
            this.listScroll = new BScroll(this.$refs.bookwrapper, {
            click: true,
            bounce: false,
            });
        } else {
            this.listScroll.refresh();
        }
     
    });
  },
  watch: {
    bookMarkList(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (this.listScroll) {
          this.$nextTick(() => {
            this.listScroll.refresh();
          });
        }
      }
    },
  },
  beforeDestroy() {
    this.listScroll.destroy();
  },
  data() {
    return {
      isEmpty: false,
    };
  },
  computed: {
    ...mapState(["bookMarkList", "pictureDaim"]),
  },
};
</script>

<style lang="scss" scoped>
.history {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: #fff;

  .class-header {
    position: relative;
    height: 50px;
    padding: 0 7.5px;

    h3.title {
      text-align: center;
      font-size: 18px;
      line-height: 50px;
      color: #1d1d1d;
    }

    .btn {
      position: absolute;
      left: 7.5px;
      top: 16px;
      color: #d21d29;
      display: flex;
      justify-content: center;
      align-items: center;

      .icon-arrow_lift {
        font-size: 22px;
        margin-right: 6px;
      }

      .content {
        font-size: 14px;
      }
    }
  }

  .book-list {
    padding: 0 15px;
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }

  .wrapper {
    padding-bottom: 50px;
    li {
      margin-top: 23px;
      height: 107px;
      display: flex;

      img {
        height: 100%;
        width: 78px;
        margin-right: 13px;
      }

      .content {
        position: relative;
        padding-top: 4px;

        .content-title {
          font-size: 15px;
          font-weight: 700;
          color: #383838;
          margin-bottom: 18px;
        }

        .content-shortIntro {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 12px;
          color: #858585;
          margin-bottom: 18px;
          line-height: 15px;
        }

        .content-author {
          font-size: 10px;
          color: #323232;
        }

        .tag {
          position: absolute;
          right: 0;
          bottom: 2px;
          font-size: 8px;
          padding: 6px;
          background-color: #eeedf2;
          border-radius: 4px;
          color: #9a999e;
        }
      }
    }
  }
}
</style>