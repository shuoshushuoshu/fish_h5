<template>
  <div class="login_wrap" v-if="showPage">
    <p>Welcome</p>
    <p class="p_last">Back !</p>
    <div class="email">
      <img src="../assets/icons/user_name.png" alt="">
      <input v-model="email" placeholder="Username or email" />
    </div>
    <div class="password">
      <img src="../assets/icons/user_pass.png" alt="">
      <input v-model="password" placeholder="Password" type="password" />
    </div>
    <div class="warn-line">{{warnText}}</div>
    <div class="text_bottom">アカウント持っていませんか？新規登録へ</div>
    <div class="sign_in" @click="login">
      <p>Sign in</p>
      <img class="right_arrow" src="../assets/icons/right_arrow.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      warnText: '',
      showPage: true,
    }
  },
  created() {
  },
  methods: {
    transformData(data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return [ret]
    },

    login() {
      if(!this.email){
        this.warnText = 'No username'
        return
      }
      if(!this.password) {
        this.warnText = 'No password'
        return
      }
      let url = "/fishing/v1/login"
      let data = {
        username: this.email,
        password: this.password
      }
      this.$axios.post(url, data).then(res=>{
        this.$emit('changeShowLogin',false)
      }).catch(err =>{
        this.$emit('changeShowLogin',false)
        this.warnText = 'userName or password error'
      })
    },
  }
}
</script>

<style lang="scss">
@import "../css/rem";
.right_arrow {
  width: .5rem;
  height: .5rem;
  margin-left: .3rem;
  animation: slip 2s infinite linear;
}
.sign_in {
  width: 100%;
  height: .3rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
  p {
    font-size: .28rem;
    font-family: Helvetica;
    color: #DDDDDD;
    line-height: .34rem;
    width: unset !important;
    margin-left: .3rem;
  }
}
.text_bottom {
  font-size: .14rem;
  font-family: Helvetica;
  color: #FFFFFF;
  line-height: .17rem;
  width: 100%;
  text-align: left;
  text-decoration: underline;
}
.warn-line {
  height: .4rem;
  width: 100%;
  font-size: .24rem;
  color: red;
  text-align: left;
  margin: .01rem 0 .2rem 0;
}
.login_wrap {
  width: 100vw;
  height: 100vh;
  font-size: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 1.31rem;
  background: url('../assets/icons/home_back.png') no-repeat;
  background-size: 100% auto;
  background-color: black;
  p {
    font-size: .45rem;
    font-family: Helvetica;
    color: #DDDDDD;
    line-height:.6rem;
    text-align: left;
    width: 100%;
  }
}
.p_last {
  margin-bottom: .6rem;
}
.email, .password {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 4.88rem;
  height: .69rem;
  flex-shrink: 0;
  margin-bottom: .1rem;
  position: relative;
  input {
    width: 100%;
    height: 100%;
    margin-bottom: .1rem;
    padding-left: .6rem !important;
    // background-color: ;
    font-size: .32rem;
    font-family: Helvetica;
    color: #FFFFFF;
    line-height: .43rem;
    background: none;
    border: .02rem solid #979797;
    flex-shrink: 0;
  }
  img {
    position: absolute;
    flex-shrink: 0;
    width: .15rem;
    height: .15rem;
    bottom: .33rem;
    left: .25rem;
  }
}
.email {
  margin-bottom: .38rem;
}
@keyframes slip {
  0% {
    transform: translateY(0rem);
  }
  25% {
    transform: translateY(.03rem);
  }
  50% {
    transform: translateY(.0rem);
  }
  70% {
    transform: translateY(-.03rem);
  }
  100% {
    transform: translateY(0rem);
  }
}
</style>