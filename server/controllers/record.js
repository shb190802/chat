const fs = require('fs')
const path = require('path')
const moment = require('moment')
const db = require('../db/db')
const response = require('../utils/response')
const config = require('../config')

// 按日期保存聊天记录
module.exports.append = async data => {
    let filename = moment().format('YYYY-MM-DD') + '.txt'
    db.insert(filename, data)
}

// 获取聊天记录
module.exports.record = async ctx => {
    let { skip = 0, limit = 10, order = 1, date = '', all = '' } = ctx.request.query
    let filename = `${date || moment().format('YYYY-MM-DD')}.txt`
    let res = db.query(filename, { skip, limit, order, all })
    if (res) {
        ctx.body = response.succ(res)
    } else {
        ctx.body = response.err()
    }
}

// 聊天记录日期列表
module.exports.recordDayList = async ctx => {
    const dbPath = path.join(process.cwd(), config.dbPath)
    try {
        let files = fs.readdirSync(dbPath)
        ctx.body = response.succ(files.filter(item => !config.ignoreFile.includes(item)).map(item => item.replace('.txt', '')))
    } catch (e) {
        ctx.body = response.err()
    }
}