<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
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
</style>
