const port = 8080; // dev port
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  devServer: {
    port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 配置代理 （以接口 https://www.easy-mock.com/mock/5ce2a7854c85c12abefbae0b/api 说明）
    proxy: {
      /* 获取综合讨论区帖子列表
       * http://api.zhuishushenqi.com/post/by-block
       * 获取综合讨论区帖子详情
       * http://api.zhuishushenqi.com/post/{disscussionId}
      */
      "/post": {
        target: 'http://api.zhuishushenqi.com',
        changeOrigin: true, // 是否改变域名
      },
      /* 获取所有排行榜
       * http://api.zhuishushenqi.com/ranking/gender
       * 获取单一排行榜
       * http://api.zhuishushenqi.com/ranking/{rankingId}
      */
      "/ranking": {
        target: 'http://api.zhuishushenqi.com',
        changeOrigin: true, // 是否改变域名
      },
      /* 获取主题书单列表
       * http://api.zhuishushenqi.com/book-list?duration=all&sort=collectorCount&start=0&limit=20&tag=古代&gender=male
       * 获取主题书单标签列表
       * http://api.zhuishushenqi.com/book-list/tagType
       * 获取书单详情
       * http://api.zhuishushenqi.com/book-list/{bookListId}
      */
      "/book-list": {
        target: 'http://api.zhuishushenqi.com',
        changeOrigin: true, // 是否改变域名
      },
      /* 获取分类
       * http://api.zhuishushenqi.com/cats/lv2/statistics
       * 获取二级分类
       * http://api.zhuishushenqi.com/cats/lv2
      */
      "/cats": {
        target: 'http://api.zhuishushenqi.com',
        changeOrigin: true, // 是否改变域名
      },
      /* 获取主题书单列表
       * http://api.zhuishushenqi.com/book/by-categories
       * 书籍详情
       * http://api.zhuishushenqi.com/book/{bookid}
      */
      "/book": {
        target: 'http://api.zhuishushenqi.com',
        changeOrigin: true, // 是否改变域名
      },
      // /* 章节详情
      //  * http://chapter2.zhuishushenqi.com/chapter/{link}
      // */
      // "/chapter": {
      //   target: 'http://api.zhuishushenqi.com',
      //   changeOrigin: true, // 是否改变域名
      // },

      /* 分类背景图
       * http://statics.zhuishushenqi.com/agent/http://img.1391.com/api/v1/bookcenter/cover/1/3419086/3419086_9a68defd6a764a4c8c15a4c30fb474f4.jpg/
      */
      "/agent": {
        target: 'http://statics.zhuishushenqi.com',
        changeOrigin: true, // 是否改变域名
      },
      /* 章节列表
       * http://api.zhuishushenqi.com/mix-atoc/{bookid}?view=chapters
      */
      "/mix-atoc": {
        target: 'http://api.zhuishushenqi.com',
        changeOrigin: true, // 是否改变域名
      },
      /* 章节列表
       * http://api.zhuishushenqi.com/atoc?view=summary&book=548d9c17eb0337ee6df738f5
      */
      "/atoc": {
        target: 'http://api.zhuishushenqi.com',
        changeOrigin: true, // 是否改变域名
      },
      /* 章节内容
       * http://chapterup.zhuishushenqi.com/chapter/http://vip.zhuishushenqi.com/chapter/5817f1161bb2ca566b0a5973?cv=1481275033588
       * 需要使用encodeURIComponent()对link进行编码
      */
      "/chapter": {
        target: 'http://chapterup.zhuishushenqi.com',
        changeOrigin: true, // 是否改变域名
      },
      /* 自动补充
       * http://api.zhuishushenqi.com/book/auto-complete?query=%E6%96%97%E7%BD%97
      */
      "/book/auto-complete": {
        target: 'http://api.zhuishushenqi.com',
        changeOrigin: true, // 是否改变域名
      },

      
    }
    // 下边这个， 如果你是本地自己mock 的话用after这个属性，线上环境一定要干掉
    // after: require("./mock/mock-server.js")
  }
}