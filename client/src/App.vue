<template>
  <div id="app">
    <span class="app-title">社区群聊</span>
    <div class="wrap">
      <div class="chat-name" v-if="show">
        <div class="name-wrap">
          <input v-model="name" @keydown.enter="sub" placeholder="姓名" />
          <button @click="sub">确定</button>
        </div>
      </div>
      <div class="chat-name" v-if="showFile">
        <div class="file">
          <div class="file-list">
            <div class="chat" v-for="(item,i) in fileList" :key="i">
              <div class="msg" v-html="item"></div>
            </div>
          </div>
          <div class="file-btn">
            <button @click="showFile=false">关闭</button>
          </div>
        </div>
      </div>
      <ChatPanel ref="chatPanel" :list="list" />
      <div class="chat-input">
        <div class="tool">
          <span @click="show=true">修改姓名</span>
          <span @click="reset">清空</span>
          <span @click="getFileList">文件列表</span>
          <vue-upload active="/upload" name="file" @uploaded="upload" @error="error" accept="application/zip,application/x-zip,application/x-zip-compressed,application/x-rar-compressed">
            <span>发送文件</span>
          </vue-upload>
        </div>
        <textarea v-model="msg" @keydown.enter="send($event)" placeholder="输入消息按回车键" />
        </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import ChatPanel from './components/ChatPanel.vue'
export default {
  name: 'App',
  components: {
    ChatPanel
  },
  data () {
    return {
      name: localStorage.getItem('userName'),
      msg: '',
      show: true,
      list: [],
      fileList: [],
      showFile: false
    }
  },
  created () {
  },
  mounted () {
    if (this.name) {
      this.show = false;
    }
    this.$socket.on('connect', () => {
      console.log('connect')
    })
    this.$socket.on('msg', data => {
      this.list.push(data)
      this.scroll()
    })
    this.getRecord()
  },
  methods: {
    sub () {
      if (!this.name) {
        alert('请先输入姓名！')
        return
      }
      localStorage.setItem('userName', this.name)
      this.show = false;
    },
    reset () {
      this.list = []
    },
    send (e) {
      var e = e || window.event;
      e.preventDefault();
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
      res = JSON.parse(res)
      if (res.state === 'ok') {
        this.$socket.emit('send', {
          msg: `<a href="/upload/${res.data}" target="_blank">${res.data}</a>`,
          name: this.name
        })
      }
    },
    error () {
      alert('发送失败！')
    },
    getFileList () {
      this.showFile = true
      this.fileList = []
      axios.get('/files').then(res => {
        if (res.data.state === 'ok') {
          this.fileList = res.data.data.map(item => {
            return `<a href="/upload/${item}" target="_blank">${item}</a>`
          })
        }
      })
    },
    getRecord () {
      axios.get('/record?order=-1').then(res => {
        if (res.data.state === 'ok') {
          this.list = res.data.data.data
          this.scroll()
        }
      })
    },
    scroll () {
      this.$nextTick(() => {
        this.$refs.chatPanel.scroll()
      })
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
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  align-items: center;
}
.app-title {
  margin-top: 20px;
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
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}
.tool > span {
  display: inline-block;
  padding: 10px;
  font-size: 12px;
  color: #09f;
  cursor: pointer;
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
.file {
  position: relative;
  width: 400px;
  height: 500px;
  border: solid 1px #ccc;
  background: #fff;
  border-radius: 4px;
  box-shadow: #333 1px 1px 4px;
  display: flex;
  flex-direction: column;
}
.file-list {
  flex: 1;
  overflow-y: auto;
}
.file-btn {
  padding: 10px;
  text-align: center;
  border-top: 1px #ccc dashed;
}
</style>
