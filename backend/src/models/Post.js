const { mongoose } = require("mongoose")


const PostSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    hashtags: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    }
},
    {
        timestamps: true,
    })


module.exports = mongoose.model('Post', PostSchema)
