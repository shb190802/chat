class PasteImage {
  constructor() {
    this.responseType = 'bolb'
    this.data = ''
    this.init()
  }
  init () {
    this.listen()
  }
  config ({ responseType = 'bolb' }) {
    this.responseType = responseType
  }
  listen () {
    window.addEventListener('paste', event => {
      if (event.clipboardData || event.originalEvent) {
        let clipboardData = (event.clipboardData || event.originalEvent.clipboardData)
        if (clipboardData.items) {
          let blob
          for (let i = 0; i < clipboardData.items.length; i++) {
            if (clipboardData.items[i].type.indexOf("image") !== -1) {
              blob = clipboardData.items[i].getAsFile();
            }
          }
          if (blob) {
            if (this.responseType === 'bolb') {
              this.onpaste(blob)
            } else {
              let render = new FileReader()
              render.onload = evt => {
                let base64 = evt.target.result
                this.onpaste(base64)
              }
              render.readAsDataURL(blob)
            }
          }
        }
      }
    })
  }
  onpaste () { }
}

export default {
  install (vm) {
    let paste = new PasteImage()
    vm.prototype.$pasteImage = paste
  }
}