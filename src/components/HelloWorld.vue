<template>
  <div id="game">
  
    <div id="platform">
      <div id="cannon">
      </div>
      <div class="bottom-score">{{userScoreString}}</div>
    </div>
    <div class="game-before-wrap" v-if="!gameStart">
      <div class="login-wrap">
        <p>ログイン</p>
        <div class="email">
          <p>邮箱/用户名</p>
          <input v-model="email"/>
        </div>
        <div class="password">
          <p>password</p>
          <input v-model="password"/>
        </div>
        <div class="okBtn" @click="login">
          <div class="ok-text" v-if="!loading">Log in</div>
          <div v-else class="loading">
          </div>
        </div>
        <p class="login-bottom">アカウント持っていませんか？新規登録へ</p>
      </div>
    </div>
    <Fish @addScore="addScore" v-else />

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
      userScore: 200,
      gameStart: false,
      password: '',
      email: '',
      loading: false
    }
  },
  props: {
  },

  mounted() {
    this.resizeUI()
  },
  computed: {
    userScoreString() {
      return this.numfix(this.userScore, 6)
    }
  },
  methods: {
    login() {
      this.gameStart = true
    },
    numfix(num, length) {
      return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
    },
    addScore(score) {
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
.login-wrap {
  width: 8rem;
  height: 6rem;
  background: rgba(255,255,255,1);
  border-radius: .4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login-bottom {
    color: blue;
    text-decoration: underline;
  }
  p {
    font-size: .2rem;
    height: .3rem;
    line-height: .3rem;
    margin-bottom: .2rem;
    text-align: center;
  }
}
.email, .password {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 80%;
  input {
    width: 100%;
    height: 1rem;
    background: rgb(195, 195, 195);
    border-radius: .2rem;
    margin-bottom: .2rem;
    padding-left: .2rem;
    font-size: .5rem;
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
  background: url('../assets/images/cannon1.png') no-repeat;
  background-size: 100% auto;
  background-position: 0 -2.22rem;
  position: absolute;
  bottom: 0;
  left: 52%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
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
