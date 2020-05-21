<template>
  <div class="chat-box" ref="chatBox">
    <div class="chat" v-for="(item,i) in list" :key="i">
      <div class="title">( {{item.ip.slice(7) || '未知IP'}} ) {{item.time}} - {{item.name}}</div>
      <div class="msg" v-html="item.msg"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ChatPanel',
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    scroll () {
      this.$nextTick(() => {
        this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight
      })
    }
  }
}
</script>
<style lang="less">
.chat-box {
  width: 100%;
  height: 500px;
  overflow-y: scroll;
}
.chat {
  padding: 4px 10px;
}
</style>
