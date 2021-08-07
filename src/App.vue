<template>
  <div id="app">
    <img v-if="isMute" @click="showBgm" class="mute_img" src="./assets/icons/mute.png" alt="">
    <img v-if="!isMute" @click="closeBgm" class="mute_img" src="./assets/icons/hear.png" alt="">
    <Login v-if="showLogin" @changeShowLogin="changeLogin" />
    <HelloWorld :isMute="isMute" v-else @addTouchMove="addTouchMove" @removeTouchMove="removeTouchMove" @changeShowLogin="changeLogin" />
    <audio id="bgm" ref="bgm" src="./assets/audio/bgm.mp3" muted preload='auto' autoplay="autoplay" loop="loop"></audio>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components: {
    Login,
    HelloWorld
  },
  data() {
    return {
      showLogin: false,
      isMute: true
      // bgmSrc: require('/static/media/coin.mp3'),
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    closeBgm () {
      this.isMute = !this.isMute
      let bgmDom = document.getElementById('bgm')
      bgmDom.pause()
    },
    showBgm() {
      this.isMute = !this.isMute
      let bgmDom = document.getElementById('bgm')
      bgmDom.play()
    },
    bgmPlay() {
      let bgmDom = document.getElementById('bgm')
        bgmDom.addEventListener("canplaythrough", function(){
      });
    },
    changeLogin(show) {
      this.showLogin = show
    },
    addTouchMove() {
      // document.body.addEventListener('touchmove',this.noScroll,false);
    },
    // removeTouchMove() {
    //   document.body.addEventListener('touchmove',this.noScroll,false);
    // },
    noScroll(e){
      e.preventDefault();
    },
    getUserInfo() {
      if(document.cookie) {
        let url = "/fishing/v1/user/current"
        this.$axios.get(url).then(res=>{
          // this.$router.push({path:'/',replace: true})
          this.showLogin = false
        }).catch(err=>{
          this.showLogin = true
        })
      } else {
          this.showLogin = true
        // this.$router.push({path:'/',replace: true})
      }
    },
  },
  mounted() {
    this.bgmPlay()
    window.onload = function() {
      document.body.addEventListener('touchstart',function (event) {
          if(event.touches.length>1){ 
              event.preventDefault();  
          }  
      })
      document.body.addEventListener('dblclick',function (event) {
          if(event.touches.length>1){ 
              event.preventDefault();  
          }  
      })
        document.body.addEventListener('gesturestart',function (event) {
          if(event.touches.length>1){ 
              event.preventDefault();  
          }  
      }) 
      let lastTouchEnd=0;  
      document.body.addEventListener('touchend',function (event) {  
          let now=(new Date()).getTime();  
          if(now-lastTouchEnd<=300){  
              event.preventDefault();  
          }  
          lastTouchEnd=now;  
      },false) 
      // document.body.addEventListener('touchmove',this.noScroll,false);

      // this.addTouchMove()
    }
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  margin: 0;
  font-size: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
body {
  margin: 0;
}
.mute_img {
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: .2rem;
  right: .2rem;
}
</style>
