const fs = require('fs')
const path = require('path')

module.exports.insert = (file, data) => {
    const filePath = path.join(__dirname, 'data', file)
    if (typeof data === 'object') data = JSON.stringify(data)
    fs.appendFileSync(filePath, data + '\n', 'utf8')
}
module.exports.query = (file, { skip = 0, limit = 10, order = 1, all = '' }) => {
    const filePath = path.join(__dirname, 'data', file)
    try {
        let data = fs.readFileSync(filePath, 'utf8')
        data = data.split(/\r?\n/)
        let total = data.length
        data = data.filter(item => !!item)
        if (all == 1) {
            // 获取全部
        } else if (order == -1) {
            data = data.slice(-limit - skip).slice(0, limit)
        } else {
            data = data.slice(skip, limit)
        }
        data = data.map(item => {
            return item ? JSON.parse(item) : {}
        })
        return { total, skip, limit, all, data }
    } catch (e) {
        console.log(e)
        return null
    }
}