import SocketIO from "socket.io-client"
import config from '../config'

export default {
    install(vm) {
        let socket = SocketIO(config.socketServer)
        vm.prototype.$socket = socket
    }
}