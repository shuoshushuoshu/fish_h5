<template>
  <div id="game">
    <div id="platform">
      <div id="cannon">
      </div>
    </div>
    <Fish />
  </div>
</template>

<script>
import Fish from './Fish.vue'
export default {
  name: 'HelloWorld',
  components: {
    Fish
  },
  data() {
    return {
    }
  },
  props: {
    
  },

  mounted() {
    this.resizeUI()

  },
  methods: {

    resizeUI() {
      let width = document.documentElement.clientWidth;
      let height =  document.documentElement.clientHeight;
      if( width < height ){
        let con = document.getElementById('game');
        con.style.width = height;
        con.style.height = width;
        con.style.top = (height-width)/2;
        con.style.left = 0-(height-width)/2;
        
        con.style.transform = 'rotate(90deg)';
      }

      var evt = "onorientationchange" in window ? "orientationchange" : "resize";
      window.addEventListener(evt, function() {
        console.log(evt);
        var width = document.documentElement.clientWidth;
        var height =  document.documentElement.clientHeight;
        var con = document.getElementById('game');
        if( width > height ){
          con.style.width = width;
          con.style.height = height;
          con.style.top = 0;
          con.style.left = 0;
          con.style.transform = 'none';
          con.style.transformOrigin = '50% 50%';
        } else {
          con.style.width = height;
          con.style.height = width;
          con.style.top = (height-width)/2;
          con.style.left = 0-(height-width)/2;
          con.style.transform = 'rotate(90deg)';
          con.style.transformOrigin = '50% 50%';
        }
      }, false);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../css/rem";

#game {
  width: 100vh;
  height: 100vh;
  background: url('../assets/images/game_bg_2_hd.jpg') no-repeat;
  background-size: auto 100%;
  // background-size: 100% auto;
  background-position: center center;
  overflow: hidden;
}
#platform {
  position: absolute;
  bottom: 0px;
  width: 100vh;
  height: 1rem;
  background: url('../assets/images/bottom-bar.png') no-repeat;
  background-size: 50vh auto;
  background-position: center bottom;
  img {
    width: 1rem;
    height: auto;
    position: absolute;
    right: 44vh;
    bottom: 0;
  }
}
#cannon {
  width: .74rem;
  height: .74rem;
  background: url('../assets/images/cannon1.png') no-repeat;
  background-size: 100% auto;
  background-position: 0 -2.22rem;
  position: absolute;
  bottom: 0;
  right: 7.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
// .bullet {
//   width: .3rem;
//   height: .3rem;
//   background: url('../assets/images/bullet1.png') no-repeat;
//   background-size: 100% auto;
//   animation: bulletmove 5s linear;
//   position: absolute;
// }
@keyframes bulletmove {
  from {
    transform: translate(0,0);
  }
  to {
    transform: translateY(-1000px);
  }
}
</style>
