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
        <div class="okBtn" @click="login">
          <div class="ok-text" v-if="!loading">Log in</div>
          <div v-else class="loading">
          </div>
        </div>
        <p class="login-bottom">アカウント持っていませんか？新規登録へ</p>
      </div>
      <div class="rank-wrap" v-else-if="toastType === 'showRank'">
        <div class="close-btn" @click="toastType = ''">
          ×
        </div>
        <div class="rank-list">
          <div class="rank-item" v-for="(item,index) in rankList" :key="index">
            <div class="rank-left">
              <div class="crown-img" v-if="index < 3" :class="index < 3 ? 'crown-' + parseInt(index+1) : ''" alt=""></div>
              <p v-else class="rank-index">{{index + 1}}</p>
              <div class="rank-avatar"></div>
              <p>{{item.name}}</p>
            </div>
            <div class="rank-right">
              <p>{{item.score}}point</p>
            </div>
          </div>
        </div>

      </div>
      <div class="log-out" v-else>
        <p @click="toastType = ''">Log out</p>
        <div class="cancel-btn" @click="toastType = ''">Cancel</div>
      </div>
    </div>
    <Fish @changeScore="changeScore" v-if="gameStart" :cannonType="cannonType" />
    <div class="gameStart-btn" v-else-if="!gameStart && !toastType" @click="gameStart = true">Start</div>
    <div class="rankBtn" @click="showRankList">
      <p>排行榜</p>
    </div>
    <div class="userInfoBtn" @click="showLogout">
      <img src="" alt="">
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Fish from './Fish.vue'
export default {
  name: 'HelloWorld',
  components: {
    Fish
  },
  data() {
    return {
      gameStart: false,
      userScore: 200,
      toastType: 'gameStart',
      password: '',
      email: '',
      loading: false,
      cannonType: 7,
      rankList: [
        {name: 11, score: 6324},
        {name: 'sada', score: 2800},
        {name: 'asfwe', score: 2200},
        {name: 22, score: 1234},
        {name: 33, score: 250},
        {name: 'asdad', score: 100},
        {name: 'wqqf', score: 10},
        {name: 'wqqf', score: 10},
        {name: 'wqqf', score: 10},
        {name: 'wqqf', score: 10},
        {name: 'wqqf', score: 10},
        {name: 'wqqf', score: 10},
      ]
    }
  },

  mounted() {
    this.resizeUI()
    this.login()
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
    login() {
      axios.get('/v1/game/rank').then(res=>{
        debugger
      })
      this.toastType = ''
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
  background: rgba(0,0,0,1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.rank-list {
  width: 83%;
  overflow: auto;
  height: 85%;
  position: relative;
  right: .2rem;
}
.close-btn {
  position: absolute;
  top: .2rem;
  right: .3rem;
  width: .5rem;
  height: .5rem;
  border-radius: 100%;
  line-height: .5rem;
  font-size: .3rem;
  color: black;
  text-align: center;
  background: gray;
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
.bottom-score {
  font-size: .35rem;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #AF0187;
  line-height: .67rem;
  position: absolute;
  bottom: .06rem;
  width: 2rem;
  height: .5rem;
  left: 2.75rem;
  z-index: 2;
  letter-spacing: .15rem;
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
  align-items: flex-end;
  z-index: 1000;
}
.okBtn {
  width: 1.5rem;
  height: .7rem;
  background: rgb(100, 98, 98);
  margin: .3rem 0;
  border-radius: .2rem;
  .ok-text {
    font-size: .3rem;
    height: .7rem;
    line-height: .7rem;
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
  width: .6rem;
  height: .6rem;
  border-radius: 100%;
  background: white;
  color: black;
  position: fixed;
  line-height: .6rem;
  bottom: .1rem;
  right: .6rem;
  font-size: .2rem;
  text-align: center;
  z-index: 200;
  background: url('../assets/icons/avatar_border.png') no-repeat;
  background-size: 100% 100%;
}
.login-wrap {
  width: 7.1rem;
  height: 4.6rem;
  background: rgba(255,255,255,1);
  // border-radius: .4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('../assets/icons/login-back.png') no-repeat;
  background-size: 100% 100%;
  .login-text {
    font-size: .3rem;
    font-family: Helvetica;
    color: #B6A159;
    line-height: .36rem;
    width: 3.6rem;
    height: .36rem;
    text-align: left;
  }
  .login-bottom {
    font-size: .12rem;
    font-family: Helvetica;
    color: #FFFFFF;
    line-height: .14rem;
  }
  p {
    font-size: .18rem;
    height: .3rem;
    line-height: .3rem;
    margin-bottom: .2rem;
    text-align: center;
    font-weight: 500;

  }
}
.email, .password {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 3.6rem;
  height: .43rem;
  margin-bottom: .26rem;
  position: relative;
  input {
    width: 100%;
    height: 100%;
    margin-bottom: .2rem;
    padding-left: .4rem !important;
    // background-color: ;
    font-size: .11rem;
    font-family: Helvetica;
    color: #FFFFFF;
    line-height: .43rem;
    background: linear-gradient(270deg, rgba(182, 161, 89, 0) 0%, rgba(182, 161, 89, 0.3) 100%) !important;
  }
  img {
    position: absolute;
    width: .14rem;
    height: .13rem;
    bottom: .25rem;
    left: .1rem;
  }
}
#platform {
  position: absolute;
  bottom: 0px;
  width: 100vh;
  height: 1rem;
  background: url('../assets/images/bottom-bar.png') no-repeat;
  background-size: 70vh auto;
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
  position: absolute;
  bottom: 0;
  left: 52%;
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
  left: 49%;
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
  left: 57%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background: url('../assets/images/cannon_minus.png') no-repeat;
  background-size: 100% 100%;
}
.cannon-1 {
  background: url('../assets/images/cannon1.png') no-repeat;
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
