const messageModel = require('../models/messageModel')

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body
        const data = await messageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        })
        if (data) return res.json({ msg: 'added' })
        return res.json({ msg: 'failed' })
    } catch (ex) {
        next(ex)
    }
}
module.exports.getAllMessage = async (req, res, next) => {}
