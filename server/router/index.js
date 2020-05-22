const KoaRouter = require('koa-router')
const file = require('../controllers/file')
const record = require('../controllers/record')

module.exports = () => {
    const router = new KoaRouter()
    router.get('/', ctx => { ctx.response.redirect('/html') })
    router.post('/upload', file.upload)
    router.post('/uploadImage', file.uploadImage)
    router.get('/files', file.files)
    router.get('/record', record.record)
    router.get('/recordDayList', record.recordDayList)

    return router
}