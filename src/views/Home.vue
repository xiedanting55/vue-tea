<template>
  <div class="home">
    <div class="headers">
      <div class="headers-main">
        <Header />
        <ly-tab
          v-model="selectedId"
          :items="items"
          :options="options"
          @change="changeTab"
        ></ly-tab>
      </div>
    </div>
    <section ref="wrapper">
      <div>
        <div v-for="(item, index) in newData" :key="index">
          <Swiper v-if="item.type == 'swiperList'" :swiperList="item.data" />
          <Icons v-if="item.type == 'iconsList'" :iconsList="item.data" />
          <Recommend
            v-if="item.type == 'recommendList'"
            :recommendList="item.data"
          />
          <Like v-if="item.type == 'likeList'" :likeList="item.data" />
          <Ad v-if="item.type == 'adList'" :adList="item.data" />
        </div>
      </div>
    </section>
    <Tabbar />
  </div>
</template>

<script>
import Header from '@/components/home/Header'
import Swiper from '@/components/home/Swiper'
import Icons from '@/components/home/Icons'
import Recommend from '@/components/home/Recommend'
import Like from '@/components/home/Like'
import Ad from '@/components/home/Ad'
import Tabbar from '@/components/common/Tabbar'
//引入插件
import BetterScroll from 'better-scroll'
import http from '@/common/api/request.js'
export default {
  name: "Home",
  data () {
    return {
      selectedId: 0,
      items: [],
      options: {
        activeColor: '#b0352f'
      },
      oBetterScroll: '',
      tBetterScroll: '',
      newData: [],
    }
  },
  components: { Header, Swiper, Icons, Recommend, Like, Ad, Tabbar },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      let { data, topBar } = (await http.$axios({ url: '/api/index_list/0/data/1' }))
      this.items = Object.freeze(topBar)
      this.newData = Object.freeze(data)
      // 当dom都加载完毕了再去执行
      this.$nextTick(() => {
        this.oBetterScroll = new BetterScroll(this.$refs.wrapper, {
          movable: true,
          zoom: true,
          click: true
        })
      })
    },
    async addData (index) {
      let res = await http.$axios({ url: `/api/index_list/${index}/data/1` })
      res.constructor != Array ? this.newData = res.data : this.newData = res
      // 当dom都加载完毕了再去执行
      this.$nextTick(() => {
        this.tBetterScroll = new BetterScroll(this.$refs.wrapper, {
          movable: true,
          zoom: true,
          click: true
        })
      })
    },
    changeTab (item, index) {
      this.addData(index)
    }
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.headers {
  width: 100%;
  height: 2.88rem;
}
.headers-main {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
section {
  flex: 1;
  overflow: hidden;
}
::v-deep .ly-tabbar {
  box-shadow: none;
  border-bottom: none;
}
</style>
