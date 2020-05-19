<template>
  <div id="app">
    <div class="chat-name">
      <input v-model="name" placeholder="姓名" />
    </div>
    <div class="chat-box">
      <div class="chat" v-for="item in list" :key="item.time">
        <div class="title">{{item.ip}} - {{item.name}}</div>
        <div class="msg">{{item.msg}}</div>
      </div>
    </div>
    <div class="chat-input">
      <input v-model="msg" @keydown.enter="send" placeholder="输入消息按回车键" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
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
    }
  }
}
</script>

<style>
#app {
  position: relative;
  width: 500px;
  height: 600px;
  border: solid 1px #ccc;
  display: flex;
  flex-direction: column;
}
.chat-box {
  flex: 1;
}
.chat-input {
  height: 40px;
}
.chat-name {
  height: 40px;
}
.chat-input > input {
  width: 100%;
  height: 100%;
}
.chat-name > input {
  width: 100%;
  height: 100%;
}
</style>
