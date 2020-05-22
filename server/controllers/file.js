const fs = require('fs')
const path = require('path')
const moment = require('moment')

const response = require('../utils/response')
const config = require('../config')
// 文件上传
module.exports.upload = async ctx => {
  try {
    const file = ctx.request.files.file
    const reader = fs.createReadStream(file.path)
    const fileName = moment().format('YYYYMMDDHHmmss-') + file.name
    const filePath = path.join(process.cwd(), config.uploadPath, fileName)
    const upStream = fs.createWriteStream(filePath)
    reader.pipe(upStream)
    ctx.body = response.succ(fileName)
  } catch (e) {
    ctx.body = response.err()
  }
}
// 文件列表
module.exports.files = async ctx => {
  const uploadPath = path.join(process.cwd(), config.uploadPath)
  try {
    let files = fs.readdirSync(uploadPath)
    ctx.body = response.succ(files.filter(item => !config.ignoreFile.includes(item)))
  } catch (e) {
    ctx.body = response.err()
  }
}