const Post = require('../models/Post')

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt')
        return res.json(posts)
    },

    async store(req, res) {
        console.log(req.file)

        const { author, place, hashtags, description } = req.body
        const { filename: image } = req.file

        const post = await Post.create({
            author,
            place,
            hashtags,
            description,
            image
        })

        return res.json(post)
    }
}