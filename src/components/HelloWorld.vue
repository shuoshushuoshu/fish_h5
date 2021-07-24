<template>
  <div id="game">
     
    <div id="platform">
      <div id="cannon" :class="cannonType ?  'cannon-' + cannonType : ''">
      </div>
      <div class="add-btn" @click="addCannon"></div>
      <div class="sub-btn" @click="subCannon"></div>
      <div class="bottom-score">{{userScoreString}}</div>
    </div>
    <div class="game-before-wrap" v-if="toastType">
      <div class="login-wrap" v-if="toastType === 'gameStart'">
        <p class="login-text">Sign in</p>
        <div class="email">
          <img src="../assets/icons/user_name.png" alt="">
          <input v-model="email" placeholder="Usurname or email" />

        </div>
        <div class="password">
          <img src="../assets/icons/user_pass.png" alt="">
          <input v-model="password" placeholder="Password" type="password" />
        </div>
        <div class="warn-line">{{warnText}}</div>

        <div class="okBtn">
          <img v-if="!loading" @click="login" class="ok-text" src="../assets/icons/login-btn.png" alt="">
          <div v-else class="loading">
            <div class="loading-item" :class="loadingIndex === 1 ? 'load-on' : ''"></div>
            <div class="loading-item" :class="loadingIndex === 2 ? 'load-on' : ''"></div>
            <div class="loading-item" :class="loadingIndex === 3 ? 'load-on' : ''"></div>
          </div>
        </div>
        <p class="login-bottom">アカウント持っていませんか？新規登録へ</p>
      </div>
      <div class="rank-wrap" v-else-if="toastType === 'showRank'">
        <div class="close-btn" @click="toastType = ''">
          ×
        </div>
        <div class="rank-list" @scroll="listScroll">
          <div class="rank-list-wrap">
          <div class="rank-item" v-for="(item,index) in rankList" :key="index">
            <div class="rank-left">
              <div class="crown-img" v-if="index < 3" :class="index < 3 ? 'crown-' + parseInt(index+1) : ''" alt=""></div>
              <p v-else class="rank-index">{{index + 1}}</p>
              <img class="rank-avatar" :src="item.avatar" />
              <p>{{item.username}}</p>
            </div>
            <div class="rank-right">
              <p>{{item.totalPoints}}point</p>
            </div>
          </div>
          </div>

        </div>

      </div>
      <div class="log-out" v-else>
        <p @click="logout">Log out</p>
        <div class="cancel-btn" @click="toastType = ''">Cancel</div>
      </div>
    </div>
    <Fish @changeScore="changeScore" v-if="gameStart" :cannonType="cannonType" />
    <!-- <div class="gameStart-btn" v-else-if="!gameStart && !toastType" @click="gameOpen">Start</div> -->
    <div class="rankBtn" @click="showRankList">
      <p>排行榜</p>
    </div>
    <div class="userInfoBtn" :style="{background: `url('${userInfo.icon}') no-repeat `, backgroundSize: '100% 100%'}" @click="showLogout">
      <img src="../assets/icons/avatar_border.png" alt="">
    </div>
  </div>
</template>

<script>
import Fish from './Fish.vue'
import axios from 'axios'
export default {
  name: 'HelloWorld',
  components: {
    Fish
  },
  data() {
    return {
      gameStart: false,
      userScore: 200,
      toastType: '',
      password: '',
      email: '',
      loading: false,
      loadingIndex: false,
      cannonType: 1,
      pageIndex: 1,
      pageSize: 10,
      rankList: [],
      warnText:'',
      userInfo: {}
    }
  },
  
  mounted() {
    this.getUserInfo()
    this.resizeUI()
    this.getRankList()
    this.gameOpen()
  },
  computed: {
    userScoreString() {
      return this.numfix(this.userScore, 6)
    },
    cannonback() {
      return "url('../assets/images/cannon" + this.cannonType +".png') no-repeat"
    }
  },
  methods: {
    transformData(data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    },
    getUserInfo() {
      let url = "/fishing/v1/user/current/"
      this.$axios.get(url).then(res=>{
        this.userInfo = res.data.data
        this.userScore = res.data.data.seasonTotalPoints
      }).catch(err=>{
        // this.getUserInfo()
        this.$emit('changeShowLogin', true)
      })
    },
    gameOpen() {
      this.gameStart = true
      let startTime = Date.parse(new Date())
      setInterval(() => {
        let url = `/fishing/v1/game/${this.userInfo.userId}`
        let endTime = Date.parse(new Date())
        let data = JSON.stringify({
          'gameId': this.userInfo.userId,
          'gamePoints': this.userScore,
          'startTime':startTime,
          'endTime': endTime
        })
        this.$axios.put(url, data)
      }, 1000 * 5);
    },
    logout() {
      let url = "/fishing/logout"
      this.$axios.post(url).then(res=>{
        this.userInfo = {}
        this.$emit('changeShowLogin', true)
        location.reload()
      }).catch(err=>{
      })
    },
    listScroll(e) {
      if(this.rankList.length%10 !== 0) return

      if(e.currentTarget.scrollTop +  e.currentTarget.clientHeight > (e.currentTarget.scrollHeight -10)) {
        pageNo += 1
        this.getRankList()
        // console.log('到底了')
      }
    },
    getRankList() {
      let url = "/fishing/v1/game/rank"
      let data = {
        pageNo: this.pageIndex,
        pageSize:this.pageSize
      }
      axios({
        method: 'get',
        url: url,
        params: data,
        transformRequest: [
            function (data) {
              let ret = ''
              for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              ret = ret.substring(0, ret.lastIndexOf('&'));
              return ret
            }
          ],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      }).then(res=>{
        this.rankList.push(...res.data.data.list)
        
      })
    },
    addCannon() {
      this.cannonType = this.cannonType + 1
      if(this.cannonType > 7) this.cannonType = 1
    },
    subCannon() {
      this.cannonType = this.cannonType - 1
      if(this.cannonType < 1) this.cannonType = 7
    },
    showLogout() {
      this.toastType = 'showLogout'
    },
    showRankList() {
      this.toastType = 'showRank'
    },
    showloading() {
      this.loading = true
      setInterval(() => {
        this.loadingIndex +=1
        if(this.loadingIndex > 3) this.loadingIndex=1 
        
      }, 500);
    },

    numfix(num, length) {
      return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
    },
    changeScore(score) {
      this.userScore = this.userScore + score
    },
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
        if( width > height ) {
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
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .loading-item {
    width: .1rem;
    height: .1rem;
    background: white;
    margin: 0 .5rem;
    border-radius: 100%;
  }
  .load-on {
    width: .05rem;
    height: .05rem;
  }
}
.warn-toast {
  position: absolute;
  width: 2rem;
  height: 1rem;
  background: white;
  z-index: 300;
  transition: all .1;
  top: 4rem;
  left: 6rem;
  p {
    color: white;
    line-height: 1rem;
    font-size: .3rem;
  }
}
.gameStart-btn {
  width:2rem;
  height: 1rem;
  font-size: .4rem;
  line-height: 1rem;
  background: white;
  color: black;
  position: absolute;
  bottom: 4rem;
  left: 7rem;
  border-radius: .5rem;
  text-align: center;
}
.rank-wrap {
  width:11.4rem;
  height: 6.1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background: url('../assets/icons/rank-back.png') no-repeat;
  background-size: 100% 100%;
}
.rank-list {
  width: 83%;
  overflow: auto;
  height: 75%;
  position: relative;
  right: .2rem;
}
.close-btn {
  position: absolute;
  top: .5rem;
  right: .9rem;
  width: .5rem;
  height: .5rem;
  border-radius: 100%;
  line-height: .5rem;
  font-size: .3rem;
  color: white;
  text-align: center;
}
.log-out {
  width: 5rem;
  height: 3rem;
  background: rgba(255,255,255,1);
  border-radius: .3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 2rem;
  p {
    font-size: .3rem;
    color: red;
    line-height: .6rem;
  }
  .cancel-btn {
    font-size: .2rem;
    width: 2rem;
    height: .5rem;
    border-radius: .2rem;
    background: gray;
    color: black;
    text-align: center;
    line-height: .5rem;
    margin-top: .5rem;
  }
}
.rank-item {
  width: 100%;
  height: .9rem;
  line-height: .9rem;
  display: flex;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);;
  .rank-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .rank-right {
    margin-right: .6rem;
  }
  .crown-img {
    width: .3rem;
    height: .4rem;
  }
  .crown-1 {
    background: url('../assets/icons/crown_1.png') no-repeat;
    background-size: 100% 100%;
  }
    .crown-2 {
    background: url('../assets/icons/crown_2.png') no-repeat;
    background-size: 100% 100%;
  }
    .crown-3 {
    background: url('../assets/icons/crown_3.png') no-repeat;
    background-size: 100% 100%;
  }

  .rank-index {
    width: .3rem;
    text-align: right;
  }
  .rank-avatar {
    width: .5rem;
    height: .5rem;
    background: gray;
    border-radius: 100%;
    margin: 0 .2rem;
  }
  p {
    font-size: .24rem;
    color: #FFFFFF;
    line-height: .9rem;
  }
}


#game {
  width: 100vh;
  height: 100vh;
  background: url('../assets/images/game_bg_2_hd.jpg') no-repeat;
  background-size: auto 100%;
  // background-size: 100% auto;
  background-position: center center;
  overflow: hidden;
}
.game-before-wrap {
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.7);
  position: fixed;
  z-index: 10;
  animation: fade .5s ease-in-out;
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
  transform: translateZ(1000px);
  align-items: flex-end;
  z-index: 1000;
}
.okBtn {
  width: .99rem;
  height: .31rem;
  background: rgb(100, 98, 98);
  margin-bottom: .1rem;
  border-radius: .2rem;
  position: relative;
  right: 1.25rem;
  bottom: .1rem;
  margin: .1rem 0 .3rem 0;
  .ok-text {
    font-size: .3rem;
    height: .7rem;
    line-height: .7rem;
    width: .99rem;
    height: .31rem;
    width: 100%;
    text-align: center;
    color: black;
    margin-bottom: 0;
  }
}
.rankBtn {
  width: .81rem;
  height: .6rem;
  position: fixed;
  bottom: 6rem;
  right: .6rem;
  background: white;
  border-radius: .4rem;
  text-align: center;
  z-index: 200;
  background: url('../assets/icons/rank.png') no-repeat;
  background-size: 100% 100%;
  p {
    font-size: .12rem;
    font-family: Helvetica;
    color: #FFE744;
    line-height: .12rem;
    position: absolute;
    top: -.2rem;
  }
}
.userInfoBtn {
  width: .7rem;
  height: .7rem;
  border-radius: 100%;
  color: black;
  position: fixed;
  line-height: .6rem;
  bottom: .1rem;
  right: .6rem;
  font-size: .2rem;
  text-align: center;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 100% 100% !important;
  img {
    width: .8rem;
    height: .8rem;
    border-radius: 100%;
  }
}
// .login-wrap {
//   width: 7.1rem;
//   height: 4.6rem;
//   background: rgba(255,255,255,1);
//   // border-radius: .4rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   background: url('../assets/icons/login-back.png') no-repeat;
//   background-size: 100% 100%;
//   .login-text {
//     font-size: .3rem;
//     font-family: Helvetica;
//     color: #B6A159;
//     line-height: .36rem;
//     width: 3.6rem;
//     height: .36rem;
//     text-align: left;
//   }
//   .login-bottom {
//     font-size: .12rem;
//     font-family: Helvetica;
//     color: #FFFFFF;
//     line-height: .14rem;
//     position: relative;
//     left: .5rem
//   }
//   p {
//     font-size: .18rem;
//     height: .3rem;
//     line-height: .3rem;
//     margin-bottom: .2rem;
//     text-align: center;
//     font-weight: 500;

//   }
// }
// .email, .password {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
//   width: 3.6rem;
//   height: .43rem;
//   flex-shrink: 0;
//   margin-bottom: .1rem;
//   position: relative;
//   input {
//     width: 100%;
//     height: 100%;
//     margin-bottom: .1rem;
//     padding-left: .4rem !important;
//     // background-color: ;
//     font-size: .32rem;
//     font-family: Helvetica;
//     color: #FFFFFF;
//     line-height: .43rem;
//     background: linear-gradient(270deg, rgba(182, 161, 89, 0) 0%, rgba(182, 161, 89, 0.3) 100%) !important;
//     flex-shrink: 0;
//   }
//   img {
//     position: absolute;
//     flex-shrink: 0;
//     width: .2rem;
//     height: .2rem;
//     bottom: .2rem;
//     left: .1rem;
//   }
// }
.bottom-score {
  font-size: .3rem;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: black;
  line-height: .7rem;
  position: absolute;
  bottom: .06rem;
  width: 2rem;
  height: .5rem;
  left: 0.3rem;
  z-index: 2;
  letter-spacing: .16rem;
}
#platform {
  position: absolute;
  bottom: 0px;
  left: 2rem;
  flex-shrink: 0;
  height: 1rem;
  width: 13rem;
  background: url('../assets/images/bottom-bar.png') no-repeat;
  background-size:auto 100%;
  background-position: left bottom;
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
  position: absolute;
  bottom: 0;
  left: 5.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.add-btn {
  width: .5rem;
  height: .4rem;
  position: absolute;
  bottom: 0;
  left: 6.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background: url('../assets/images/cannon_plus.png') no-repeat;
  background-size: 100% 100%;
}

.sub-btn {
  width: .5rem;
  height: .4rem;
  position: absolute;
  bottom: 0;
  left: 5.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background: url('../assets/images/cannon_minus.png') no-repeat;
  background-size: 100% 100%;
}
.cannon-1 {
  background: url('../assets/icons/cannon1.png') no-repeat;
  background-size: 100% auto;
}
.cannon-2 {
  background: url('../assets/images/cannon2.png') no-repeat;
  background-size: 100% auto;

}
.cannon-3 {
  background: url('../assets/images/cannon3.png') no-repeat;
  background-size: 100% auto;
}
.cannon-4 {
  background: url('../assets/images/cannon4.png') no-repeat;
  background-size: 100% auto;
}
.cannon-5 {
  background: url('../assets/images/cannon5.png') no-repeat;
  background-size: 100% auto;
}
.cannon-6 {
  background: url('../assets/images/cannon6.png') no-repeat;
  background-size: 100% auto;
}
.cannon-7 {
  background: url('../assets/images/cannon7.png') no-repeat;
  background-size: 100% auto;
}

@keyframes fade {
  from {
    transform:translateY(-100px); 
    opacity: 0;
  }
  to {
    transform:translateY(0); 
    opacity: 0.6;
  }
}
// .bullet {
//   width: .3rem;
//   height: .3rem;
//   background: url('../assets/images/bullet1.png') no-repeat;
//   background-size: 100% auto;
//   animation: bulletmove 5s linear;
//   position: absolute;
// }
// @keyframes bulletmove {
//   from {
//     transform: translate(0,0);
//   }
//   to {
//     transform: translateY(-1000px);
//   }
// }
</style>
