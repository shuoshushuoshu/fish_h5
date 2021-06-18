<template>
  <div id="fish-wrap" @click="shotClick">
    
  </div>
</template>

<script>
import { getFishList } from '../js/fish'
export default {
  data() {
    return {
      cannonX: 0,
      cannonY: 0,
      cannonDom: '',
      currentNum: 1,
      fishHeight: .59,
      fishList: []
    }
  },
  mounted(){
    this.fishList = getFishList()
    this.cannonDom = document.querySelector('#cannon')
    this.cannonX = this.cannonDom.offsetLeft
    this.cannonY = this.cannonDom.offsetTop
    this.fishStart()
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
      // console.log(clickX,clickY,this.cannonX,this.cannonY, x, y, deg)
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
      // this.addBulletEvent(bulletWarpDom)
      bulletDom.className = 'bullet bullet-' + this.currentNum
      platformDom.appendChild(bulletWarpDom)
      bulletWarpDom.appendChild(bulletDom)
      bulletDom.style.transform = 'translate3d(0, 10px, 0)'
      setTimeout(() => {
        bulletDom.style.transform = 'translate3d(0, -600px, 0)'
      }, 100);


      // bulletDom.style.transform = 'rotate(' + deg +'deg)'
      // bulletDom.style.transition = 'transform 2s ease .5s'
      this.currentNum += 1
      bulletDom.addEventListener('transitionend', function(){
        bulletWarpDom.remove()
      })
    },


    addBulletEvent(bulletDom) {
      const config = { attributes: true, childList: true, subtree: true };
      const callback = (mutationsList, observer) => {
          mutationsList.forEach(e => {
            console.log(e)
          });
          let getBoundingClientRect = bulletDom.getBoundingClientRect()
          if(getBoundingClientRect.bottom > 460) {
            debugger
          }
          console.log('postion', `left: ${getBoundingClientRect.left}`, `bottom: ${getBoundingClientRect.bottom}`, mutationsList)
      };
      const observer = new MutationObserver(callback);
      observer.observe(bulletDom, config);
    },


    fishStart() {
      let direction = Math.random() > 0.5 ? 1 : -1
      let fishNum = Math.floor(Math.random()*10)
      let fishWrapDom = document.getElementById('fish-wrap')
      let fishDom = document.createElement('div')
      let fishDomHeight = fishWrapDom.clientHeight
      let fishStartY = Math.random() * fishDomHeight / 3
      fishDom.className = 'fish fish-' + fishNum
      // fishDom.className = 'fish fish-1'
      fishWrapDom.appendChild(fishDom)
      fishDom.style.bottom = fishStartY + 'px'
      if(direction === 1) {
        fishDom.style.right = '0px'
        fishDom.style.transform = 'rotate(180deg)'
      } else {
        fishDom.style.left = '0px'
      }
      // if(!this.fishList[fishNum-1].width) return
      try {
        fishDom.style.height = this.fishList[fishNum-1].width + 'rem'
        console.log(fishNum)
      } catch (error) {
        
      }
      this.fishSwim(fishDom, 0, fishNum)
      this.fishTranslate(fishDom,direction)

      setTimeout(() => {
        this.fishStart()
      }, 1000);
    },


    fishSwim(fishDom, cunrrentPos, fishNum) {
      let pos = cunrrentPos > 3 ? 0 : cunrrentPos
      try {
        let width = this.fishList[fishNum-1 < 0 ? 0 : fishNum-1].width
        fishDom.style.backgroundPositionY = -pos * width + 'rem'
        console.log(fishNum)
      } catch (error) {
        
      }
      pos += 1
      setTimeout(() => {
        this.fishSwim(fishDom, pos,fishNum)
      }, 200);
    },


    fishTranslate(fishDom,direction) {
      setTimeout(() => {
        fishDom.style.transform = 'translate3d(' + -1000 *direction + 'px, 0px, 0)'
        fishDom.addEventListener('transitionend', function(){
          fishDom.remove()
        })
      }, 100);
    }
  }
}
</script>

<style lang="scss">
@import "../css/rem";
#fish-wrap {
  width: 100%;
  height: calc(100% - 1rem);
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
.bullet {
  width: .3rem;
  height: .3rem;
  background: url('../assets/images/bullet1.png') no-repeat;
  background-size: 100% auto;
  position: absolute;
  // animation: bulletGo 5s linear;
  z-index: 0;
    // transform: translate3d(0, -200px, 0);
    transition: 2s;
}
.bullet-wrap{
  width: .3rem;
  height: .3rem;
  position: absolute;
  bottom: 0;
  right: 7.25rem;
}
// @keyframes bulletGo {
//   from {
//     transform: translate(0, 0);
//   }
//   to {
//     transform: translateY(-1000px);
//   }
// }

.fish {
  position: absolute;
  // right: 2rem;
  width: 1rem;
  bottom: 2rem;
  height: 1rem;
  z-index: 100;
}
.fish-1, .fish-2, .fish-3, .fish-4, .fish-5, .fish-6, .fish-7, .fish-8 {
  background-size: 100% auto !important;
  transition: transform 10s;
  background: url('../assets/images/fish1.png') no-repeat;
  width: 1.1rem;
}
// .fish-1 {
//   background: url('../assets/images/fish1.png') no-repeat;
//   // height: .74rem;
//   width: 1.1rem;
//   transition: transform 10s;
// }
// .fish-2 {
//   background: url('../assets/images/fish2.png') no-repeat;
//   // height: .74rem;
//   width: 1.1rem;
//   transition: transform 10s;
// }
// .fish-3 {
//   background: url('../assets/images/fish3.png') no-repeat;
//   // height: .74rem;
//   width: 1.1rem;
//   transition: transform 10s;
// }
// .fish-4 {
//   background: url('../assets/images/fish4.png') no-repeat;
//   // height: .74rem;
//   width: 1.1rem;
//   transition: transform 10s;
// }
// .fish-5 {
//   background: url('../assets/images/fish5.png') no-repeat;
//   // height: .74rem;
//   width: 1.1rem;
//   transition: transform 10s;
// }
// .fish-6 {
//   background: url('../assets/images/fish6.png') no-repeat;
//   // height: .74rem;
//   width: 1.1rem;
//   transition: transform 10s;
// }
// .fish-7 {
//   background: url('../assets/images/fish7.png') no-repeat;
//   // height: .74rem;
//   width: 1.1rem;
//   transition: transform 10s;
// }
// .fish-8 {
//   background: url('../assets/images/fish8.png') no-repeat;
//   // height: .74rem;
//   width: 1.1rem;
//   transition: transform 10s;
// }
// .fish-9 {
//   background: url('../assets/images/fish9.png') no-repeat;
//   // height: .74rem;
//   width: 1.1rem;
//   transition: transform 10s;
// }
// .fish-10 {
//   background: url('../assets/images/fish10.png') no-repeat;
//   // height: .74rem;
//   width: 1.1rem;
//   transition: transform 10s;
// }
// .fish-11 {
//   background: url('../assets/images/fish11.png') no-repeat;
//   // height: .74rem;
//   width: 1.1rem;
//   transition: transform 10s;
// }
// .fish-12 {
//   background: url('../assets/images/fish12.png') no-repeat;
//   // height: .74rem;
//   width: 1.1rem;
//   transition: transform 10s;
// }


</style>