<template>
  <div class="fish-wrap" @click="shotClick">
  </div>
</template>

<script>
export default {
  data() {
    return {
      cannonX: 0,
      cannonY: 0,
      cannonDom: '',
      currentNum: 1,
    }
  },
  mounted(){
    this.cannonDom = document.querySelector('#cannon')
    this.cannonX = this.cannonDom.offsetLeft
    this.cannonY = this.cannonDom.offsetTop
  },
  methods: {
    shotClick(e) {
      this.gunRotate(e)
    },
    gunRotate(e) {
      let clickX = e.layerY
      let clickY = e.layerX
      let y = clickY - this.cannonY
      let x = clickX - this.cannonX
      let deg = Math.atan(x/y)*180/Math.PI
      console.log(clickX,clickY,this.cannonX,this.cannonY, x, y, deg)
      // this.cannonDom.style.transform = 'rotate(90deg)'a
      this.cannonDom.style.transform = 'rotate(' + deg +'deg)'
      this.bulletShot(deg)
    },
    bulletShot(deg) {
      let platformDom = document.getElementById('platform')
      let bulletDom = document.createElement('div')
      let bulletWarpDom = document.createElement('div')
      bulletWarpDom.className = 'bullet-wrap'
      bulletWarpDom.style.transform = 'rotate(' + deg +'deg)'
      bulletDom.className = 'bullet bullet-' + this.currentNum
      platformDom.appendChild(bulletWarpDom)
      bulletWarpDom.appendChild(bulletDom)
      // bulletDom.style.transform = 'rotate(' + deg +'deg)'
      // bulletDom.style.transition = 'transform 2s ease .5s'
      this.currentNum += 1
    }
  }
}
</script>

<style lang="scss">
@import "../css/rem";
.fish-wrap {
  width: 100%;
  height: calc(100% - 1rem);
  position: absolute;
  top: 0;
  left: 0;
}
.bullet {
  width: .3rem;
  height: .3rem;
  background: url('../assets/images/bullet1.png') no-repeat;
  background-size: 100% auto;
  position: absolute;
  animation: bulletGo 5s linear;
  z-index: 0;
}
.bullet-wrap{
  width: .3rem;
  height: .3rem;
  position: absolute;
  bottom: 0;
  right: 7.25rem;
}
@keyframes bulletGo {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translateY(-1000px);
  }
}
</style>