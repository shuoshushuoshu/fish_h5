<template>
  <div id="fish-wrap" @click.passive="shotClick">
    
  </div>
</template>

<script>
import { getFishList } from '../js/fish'
import { getCannonList } from '../js/cannon'
export default {
  data() {
    return {
      cannonX: 0,
      cannonY: 0,
      cannonDom: '',
      currentNum: 1,
      fishHeight: .59,
      fishList: [],
      cannonList: [],
      fishDomlist: [],
      hasShot:false
    }
  },
  props: {
    cannonType: {
      default: 1,
      type: Number
    }
  },
  mounted(){
    this.fishList = getFishList()
    this.cannonList = getCannonList()
    this.cannonDom = document.querySelector('#cannon')
    this.cannonX = this.cannonDom.offsetLeft
    this.cannonY = this.cannonDom.offsetTop
    this.fishStart()
    this.clearFishList()
  },
  methods: {
    bulletBoom(x,y) {
      // bulletDom.style.
      let platformDom = document.getElementById('game')
      let boomDom = document.createElement('div')
      boomDom.className = 'boom'
      platformDom.appendChild(boomDom)
      boomDom.style.left = x + 'px'
      boomDom.style.bottom = y + 'px'
  
      setTimeout(() => {
        boomDom.remove()
      }, 500);
    },

    ifFishCatch(fishType, bulletType) {
      let bulletRandom = Math.random()
      let fishRandom = Math.random()
      let bulletOk = bulletRandom < this.cannonList[bulletType - 1].chance
      let fishOk = fishRandom < this.fishList[fishType - 1].chance
      let ifHiton = bulletOk || fishOk
      return ifHiton
    },

    deadFishSwim(fishDom, cunrrentPos, fishNum) {
      let pos = cunrrentPos > 8 ?  4 : cunrrentPos
      try {
        let height = this.fishList[fishNum-1 < 0 ? 0 : fishNum-1].height
        fishDom.style.backgroundPositionY = -pos * height + 'rem'
        // console.log(fishNum)
      } catch (error) {
        
      }
      pos += 1
      setTimeout(() => {
        this.fishSwim(fishDom, pos,fishNum)
      }, 200);
    },

    fishDead(x, y) {
      let wrapDom = document.getElementById('game')
      let deadFishDom = document.createElement('div')
      deadFishDom.className = 'dead-fish fish-'+ this.currentNum
      wrapDom.appendChild(deadFishDom)
      deadFishDom.style.left = x + 'px'
      deadFishDom.style.bottom = y + 'px'
      try {
        fishDom.style.height = this.fishList[this.currentNum-1].height + 'rem'
        fishDom.style.width = this.fishList[this.currentNum-1].width + 'rem'
      } catch (error) {
        
      }
      this.deadFishSwim(deadFishDom, 4, this.currentNum);

    },

    addCoin(x, y, fishType) {
      // this.fishDead(x,y)
      let wrapDom = document.getElementById('game')
      let coinDom = document.createElement('div')
      coinDom.className = 'coin'
      wrapDom.appendChild(coinDom)
      coinDom.style.left = x + 'px'
      coinDom.style.bottom = y + 'px'

      let coinPos = 1
      setTimeout(() => {
        coinDom.remove()
        this.$emit('changeScore', this.fishList[fishType -1].score)
      }, 1600);
      // let pos = cunrrentPos > 3 ? 0 : cunrrentPos
      try {
        setInterval(() => {
          coinDom.style.backgroundPositionY = -0.7 * coinPos + 'rem'
          coinPos +=2
          if(coinPos > 7) coinPos = 1
        }, 200);
        // console.log(fishNum)
      } catch (error) {
        
      }
    },

    fishSwim(fishDom, cunrrentPos, fishNum) {
      let pos = cunrrentPos > 3 ? 0 : cunrrentPos
      try {
        let height = this.fishList[fishNum-1 < 0 ? 0 : fishNum-1].height
        fishDom.style.backgroundPositionY = -pos * height + 'rem'
        // console.log(fishNum)
      } catch (error) {
        
      }
      pos += 1
      setTimeout(() => {
        this.fishSwim(fishDom, pos,fishNum)
      }, 100);
    },

    shotClick(e) {
      this.gunRotate(e)
    },


    gunRotate(e) {
      // debugger
      let clickX = e.layerY
      let clickY = e.layerX
      let y = clickY - this.cannonY
      let x = clickX - this.cannonX -120
      let deg = Math.atan(x/y)*180/Math.PI
      // console.log(deg)
      console.log(clickX,clickY,this.cannonX,this.cannonY, x, y, deg)
      // this.cannonDom.style.transform = 'rotate(90deg)'
      
      this.cannonDom.style.transform = 'rotate(' + deg +'deg)'
      this.bulletShot(deg)
    },
    
    shotAni() {
      let cannonDom = document.getElementById('cannon')
      let pos = 1
      let cannonAni = setInterval(() => {
        cannonDom.style.backgroundPositionY = -pos * this.cannonList[this.cannonType - 1].height + 'rem'
        pos = pos + 1
        if(pos > 4) {
          clearInterval(cannonAni)
          cannonDom.style.backgroundPositionY = 0
        } 
      }, 100);
    },

    bulletShot(deg) {
      if(this.hasShot) return
      this.shotAni()
      this.hasShot = true
      this.$emit('changeScore', this.cannonType * -1)
      setTimeout(() => {
        this.hasShot = false 
      }, 500);
      let platformDom = document.getElementById('platform')
      let bulletDom = document.createElement('div')
      let bulletWarpDom = document.createElement('div')
      bulletWarpDom.className = 'bullet-wrap'
      bulletWarpDom.style.transform = 'rotate(' + deg +'deg)'
      // console.log(deg)
      // this.addBulletEvent(bulletWarpDom)
      bulletDom.className = 'bullet bullet-' + this.cannonType
      platformDom.appendChild(bulletWarpDom)
      bulletWarpDom.appendChild(bulletDom)
      bulletDom.style.transform = 'translate3d(0, 10px, 0)'
      this.hitonObserver(bulletDom, this.cannonType)
      setTimeout(() => {
        bulletDom.style.transform = 'translate3d(0, -600px, 0)'
      }, 10);
       
      
      // bulletDom.style.transform = 'rotate(' + deg +'deg)'
      // bulletDom.style.transition = 'transform 2s ease .5s'
      this.currentNum += 1
      bulletDom.addEventListener('transitionend', function(){
        bulletWarpDom.remove()
        bulletDom.remove()
      })
    },

    hitonObserver(bulletDom, cannonNum) {
      setInterval(() => {
        let bulletX = bulletDom.getBoundingClientRect().top
        let bulletY = bulletDom.getBoundingClientRect().left
        this.fishDomlist.forEach(e => {
          let fishX1 =  e.getBoundingClientRect().top + e.offsetWidth/2
          let fishX2 =  e.getBoundingClientRect().top + e.offsetWidth/4
          let fishX3 =  e.getBoundingClientRect().top
          let fishY1=  e.getBoundingClientRect().left
          let fishY2=  e.getBoundingClientRect().left + e.offsetHeight/4
          let fishY3=  e.getBoundingClientRect().left + e.offsetHeigh/2
          let fishY4=  e.getBoundingClientRect().left + (e.offsetHeigh/4)*3
          let fishY5=  e.getBoundingClientRect().left + e.offsetHeigh
          let isHiton = false
          if(Math.abs(bulletX - fishX1) < 20 && Math.abs(bulletY - fishY3) < 20) {
            isHiton = true
          } else if(Math.abs(bulletX - fishX1) < 20 && Math.abs(bulletY - fishY2) < 20) {
            isHiton = true
          } else if(Math.abs(bulletX - fishX1) < 20 && Math.abs(bulletY - fishY4) < 20){
            isHiton = true
          } else if(Math.abs(bulletX - fishX2) < 20 && Math.abs(bulletY - fishY1) < 20){
            isHiton = true
          } else if(Math.abs(bulletX - fishX2) < 20 && Math.abs(bulletY - fishY2) < 20){
            isHiton = true
          } else if(Math.abs(bulletX - fishX2) < 20 && Math.abs(bulletY - fishY3) < 20){
            isHiton = true
          } else if(Math.abs(bulletX - fishX2) < 20 && Math.abs(bulletY - fishY4) < 20){
            isHiton = true
          } else if(Math.abs(bulletX - fishX2) < 20 && Math.abs(bulletY - fishY5) < 20){
            isHiton = true
          } else if(Math.abs(bulletX - fishX3) < 20 && Math.abs(bulletY - fishY3) < 20){
            isHiton = true
          } else if(Math.abs(bulletX - fishX3) < 20 && Math.abs(bulletY - fishY2) < 20){
            isHiton = true
          } else if(Math.abs(bulletX - fishX3) < 20 && Math.abs(bulletY - fishY4) < 20){
            isHiton = true
          }
          // console.log(Math.abs(bulletX - fishX), Math.abs(bulletY - fishY))
          // console.log(bulletX , bulletY)
          if(isHiton && bulletX && fishY2) {
            // console.log(bulletX, bulletY,fishX, fishY1)
            this.bulletBoom(bulletX,bulletY)
            // console.log(e.getBoundingClientRect().top)
            let translates = document.defaultView.getComputedStyle(e,null).transform;
          
            let translateX = parseFloat(translates.substring(6).split(',')[4]);
            
            let fishType = parseInt(e.className.split('-')[1])
            // e.style.transform = 'translate3d('+ translateX + 'px, 0px, 0px) !important'
            bulletDom.remove()
            if(this.ifFishCatch(fishType,cannonNum)) {
              e.remove()
              this.addCoin(fishX2, fishY2, fishType)
            }
            // console.log(e.getBoundingClientRect().bottom)
          }
        });
        // console.log(bulletDom.getBoundingClientRect().x,bulletDom.getBoundingClientRect().y)
      }, 100);
      // const config = { attributes: true, childList: true, subtree: true };
      // const callback = (mutationsList, observer) => {
      //   let getBoundingClientRect = bulletDom.getBoundingClientRect()
      //   console.log('postion', `x: ${getBoundingClientRect.x}`, `y: ${getBoundingClientRect.y}`, mutationsList)

      // };
      // const observer = new MutationObserver(callback);
      // observer.observe(bulletDom, config);

    },


    // addBulletEvent(bulletDom) {
    //   const config = { attributes: true, childList: true, subtree: true };
    //   const callback = (mutationsList, observer) => {
    //       mutationsList.forEach(e => {
    //         console.log(e)
    //       });
    //       let getBoundingClientRect = bulletDom.getBoundingClientRect()
    //       if(getBoundingClientRect.bottom > 460) {
    //         debugger
    //       }
    //       console.log('postion', `left: ${getBoundingClientRect.left}`, `bottom: ${getBoundingClientRect.bottom}`, mutationsList)
    //   };
    //   const observer = new MutationObserver(callback);
    //   observer.observe(bulletDom, config);
    // },

    getFishNum(fishMath) {
      if(fishMath > 0 && fishMath < 4) {
        return 1
      } else if(fishMath > 0 && fishMath < 5) {
        return 2
      }else if(fishMath > 5 && fishMath < 10) {
        return 3
      }else if(fishMath > 10 && fishMath < 16) {
        return 4
      }else if(fishMath > 16 && fishMath < 20) {
        return 5
      }else if(fishMath > 20 && fishMath < 25) {
        return 6
      }else if(fishMath > 25 && fishMath < 29) {
        return 7
      }else if(fishMath > 29 && fishMath < 32) {
        return 8
      }else if(fishMath > 33 && fishMath < 35) {
        return 9
      }else if(fishMath > 35 && fishMath < 37) {
        return 10
      }else if(fishMath > 37 && fishMath < 38) {
        return 11
      }else if(fishMath > 38 && fishMath < 39) {
        return 12
      } else {
        return 6
      }
    },
    fishStart() {
      let direction = Math.random() > 0.5 ? 1 : -1
      let fishMath = Math.random() * 39
      let fishNum = this.getFishNum(fishMath)
      // let fishNum = 9
      // console.log(fishNum)
      let fishWrapDom = document.getElementById('fish-wrap')
      let fishDom = document.createElement('div')
      let fishDomHeight = fishWrapDom.clientHeight
      let fishStartY = Math.random() * fishDomHeight / 3
      fishDom.className = 'fish fish-' + fishNum
      // fishDom.className = 'fish fish-1'
      fishWrapDom.appendChild(fishDom)
      fishDom.style.bottom = fishStartY + 'px'
      try {
        fishDom.style.height = this.fishList[fishNum-1].height + 'rem'
        fishDom.style.width = this.fishList[fishNum-1].width + 'rem'
      } catch (error) {
        
      }

        // console.log(fishNum)
      // console.log(fishDom.style.width, fishDom.style.height)
      let domLength = this.fishDomlist.length
      this.fishDomlist.push(fishDom)
      // console.log(domLength)
      if(this.fishDomlist.length - domLength !== 1) {
        fishDom.remove()
      }
      if (direction === 1) {
        fishDom.style.right = '0px'
        // fishDom.classList.add('fish-rotate')
      } else {
        fishDom.style.left = '0px'
      }
      // if(!this.fishList[fishNum-1].width) return

      this.fishSwim(fishDom, 0, fishNum)
      this.fishTranslate(fishDom,direction)

      setTimeout(() => {
        this.fishStart()
      }, 1000);
    },


    fishSwim(fishDom, cunrrentPos, fishNum) {
      let pos = cunrrentPos > 3 ? 0 : cunrrentPos
      try {
        let height = this.fishList[fishNum-1 < 0 ? 0 : fishNum-1].height
        fishDom.style.backgroundPositionY = -pos * height + 'rem'
        // console.log(fishNum)
      } catch (error) {
        
      }
      pos += 1
      setTimeout(() => {
        this.fishSwim(fishDom, pos,fishNum)
      }, 200);
    },
    clearFishList() {
      setTimeout(() => {
        setInterval(() => {
          this.fishDomlist.shift()
          
        }, 2000);
      }, 1000 * 30);
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
.coin {
  width: .7rem;
  height: .7rem;
  background: url('../assets/images/coinAni2.png') no-repeat;
  background-size: 100% auto;
  position: absolute;
  animation: coinDrop 2s 1;
}
#fish-wrap {
  width: 100%;
  height: calc(100% - 1rem);
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
.boom {
  width: 1.5rem;
  height: 1.5rem;
  background: url('../assets/images/web1.png') no-repeat;
  position: absolute;
  background-size: 100% 100%;
  animation: boom .5s 1;
  z-index: 200;
}
.bullet {
  width: .3rem;
  height: .3rem;
  position: absolute;
  top: 0;
  left: 0;
  // animation: bulletGo 5s linear;
  z-index: 0;
    // transform: translate3d(0, -200px, 0);
  transition: 2s linear;
  z-index: 10;
}
.bullet-1 {
  background: url('../assets/images/bullet1.png') no-repeat;
  background-size: 100% auto;
}
.bullet-2 {
  background: url('../assets/images/bullet2.png') no-repeat;
  background-size: 100% auto;
}
.bullet-3 {
  background: url('../assets/images/bullet3.png') no-repeat;
  background-size: 100% auto;
}
.bullet-4 {
  background: url('../assets/images/bullet4.png') no-repeat;
  background-size: 100% auto;
}
.bullet-5 {
  background: url('../assets/images/bullet5.png') no-repeat;
  background-size: 100% auto;
}
.bullet-6 {
  background: url('../assets/images/bullet6.png') no-repeat;
  background-size: 100% auto;
}
.bullet-7 {
  background: url('../assets/images/bullet7.png') no-repeat;
  background-size: 100% auto;
}

.bullet-wrap{
  width: .3rem;
  height: .3rem;
  // background: black;
  position: absolute;
  bottom: .3rem;
  left: 5.85rem;
  // position: absolute;
  // bottom: 0rem;
  // left: 0;
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
  bottom: 2rem;
  z-index: 100;
  pointer-events: none;
}
.dead-fish {
  position: absolute;
  // right: 2rem;
  z-index: 100;
  pointer-events: none;
}
.netDom {
 width: 1rem;
 height: 1rem; 
 background: url('../assets/images/web1.png') no-repeat;
 background-size: 100% 100%;
}
.fish-1, .fish-2, .fish-3, .fish-4, .fish-5, .fish-6, .fish-7, .fish-8 {
  background-size: 100% auto !important;
  // transition: transform 30s;
  // background: url('../assets/images/fish1.png') no-repeat;
  // width: 1.1rem;
}
.fish-rotate {
  // animation: rotateFish 1s;
}
.fish-1 {
  background: url('../assets/images/fish1.png') no-repeat;
  // height: .74rem;
  background-size: 100% auto !important;
  transition: transform 30s;
}
.fish-2 {
  background: url('../assets/images/fish2.png') no-repeat;
  // height: .74rem;
  background-size: 100% auto !important;
  transition: transform 30s;
}
.fish-3 {
  background: url('../assets/images/fish3.png') no-repeat;
  // height: .74rem;
  background-size: 100% auto !important;
  transition: transform 30s;
}
.fish-4 {
  background: url('../assets/images/fish4.png') no-repeat;
  // height: .74rem;
  background-size: 100% auto !important;
  transition: transform 30s;
}
.fish-5 {
  background: url('../assets/images/fish5.png') no-repeat;
  // height: .74rem;
  background-size: 100% auto !important;
  transition: transform 30s;
}
.fish-6 {
  background: url('../assets/images/fish6.png') no-repeat;
  // height: .74rem;
  background-size: 100% auto !important;
  transition: transform 30s;
}
.fish-7 {
  background: url('../assets/images/fish7.png') no-repeat;
  // height: .74rem;
  background-size: 100% auto !important;
  transition: transform 30s;
}
.fish-8 {
  background: url('../assets/images/fish8.png') no-repeat;
  // height: .74rem;
  background-size: 100% auto !important;
  transition: transform 30s;
}
.fish-9 {
  background: url('../assets/images/fish9.png') no-repeat;
  // height: .74rem;
  background-size: 100% auto !important;
  transition: transform 30s;
}
.fish-10 {
  background: url('../assets/images/fish10.png') no-repeat;
  // height: .74rem;
  background-size: 100% auto !important;
  transition: transform 30s;
}
.fish-11 {
  background: url('../assets/images/fish11.png') no-repeat;
  // height: .74rem;
  background-size: 100% auto !important;
  transition: transform 30s;
}
.fish-12 {
  background: url('../assets/images/fish12.png') no-repeat;
  // height: .74rem;
  background-size: 100% auto !important;
  transition: transform 30s;
}

@keyframes rotateFish {
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(180deg)
  }
}

@keyframes coinDrop {
  0% {
    transform: translate3d(0, 0, 0);
  }
  10% {
    transform: translate3d(0, -1.5rem, 0);
  }
  70% {
    transform: translate3d(0, 400px, 0);
  }
  100% {
    transform: translate3d(0, 500px, 0);
  }
}
@keyframes boom {
  0% {
    transform: scale(1.2);
  }
  20% {
    transform: scale(1);
  }
   20% {
    transform: scale(0.8);
  }
  70% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
}

</style>