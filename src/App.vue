<template>
  <div id="app">
    <Login v-if="showLogin" @changeShowLogin="changeLogin" />
    <HelloWorld v-else @changeShowLogin="changeLogin" />
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
      showLogin: false
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    changeLogin(show) {
      this.showLogin = show
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
      document.body.addEventListener('touchmove', function (e) {
  e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
}, {passive: false});
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
</style>
