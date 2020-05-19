<template>
  <div id="app">
    <div class="wrap">
      <div class="chat-name" v-if="show">
        <div class="name-wrap">
          <input v-model="name" placeholder="姓名" />
          <button @click="sub">确定</button>
        </div>

      </div>
      <div class="chat-box">
        <div class="chat" v-for="item in list" :key="item.time">
          <div class="title">{{item.ip}} - {{item.name}}</div>
          <div class="msg">{{item.msg}}</div>
        </div>
      </div>
      <div class="chat-input">
        <div class="tool">
          <span>上传文件</span>
        </div>
        <textarea v-model="msg" @keydown.enter="send" placeholder="输入消息按回车键" />
        </div>
    </div>
    <vue-upload active="/upload" name="file" @uploaded="upload" @error="error">
      <button>upload</button>
    </vue-upload>
  </div>

</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      show: true,
      msg: '',
      name: '',
      list: []
    }
  },
  mounted () {
    this.sockets.listener.subscribe('msg', (data) => {
      this.list.push(data)
    })
  },
  methods: {
    sub () {
      if (!this.name) {
        alert('请先输入姓名！')
        return
      }
      this.show = false;
    },
    send () {
      if (!this.name) {
        alert('请先输入姓名！')
        return
      }
      let msg = this.msg
      this.msg = ''
      this.$socket.emit('send', {
        msg,
        name: this.name
      })
    },
    upload (res) {
      console.log(res)
    },
    error (res) {
      console.log(res)
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  padding: 50px;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
}
.wrap {
  width: 700px;
  height: 600px;
  margin: 20px auto;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.chat-box {
  flex: 1;
}
.chat-input {
  height: 150px;
  border-top: 1px solid #ccc;
  display: flex;
  flex-flow: column;
}
.tool {
  border-bottom: 1px solid #ccc;
}
.chat-name {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #333;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tool > span {
  display: inline-block;
  padding: 10px;
  font-size: 12px;
  color: #09f;
}
.chat-input > textarea {
  padding: 10px;
  flex: 1;
  border: none;
  outline: none;
}
.name-wrap > input {
  border: none;
  border-radius: 4px;
  outline: none;
  width: 100px;
  height: 30px;
  padding: 5px;
  font-size: 18px;
}
.name-wrap > button {
  border: none;
  border-radius: 4px;
  outline: none;
  width: 60px;
  height: 40px;
  background: #09f;
  color: #fff;
  margin-left: 10px;
  font-size: 18px;
}
.name-wrap {
  margin-top: -200px;
  display: flex;
  align-items: center;
}
</style>
