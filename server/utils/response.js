const moment = require('moment')

module.exports.succ = data => {
    return {
        state: 'ok',
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
        data 
    }    
}

module.exports.err = (code = 'error',msg = '操作失败！') => {
    return {
        state: code,
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
        data: msg 
    }
}