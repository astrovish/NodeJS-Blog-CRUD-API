const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const blogSchema = new mongoose.Schema({
    title: {
        desc: "Title of a blog.",
        trim: true,
        type: String,
        required: true
    },
    body: {
        desc: "Description of a blog.",
        trim: true,
        type: String,
        required: true
    },
    userId: {
        desc: "Id of a user who created a blog.",
        type: Number,
        required: true,
        default: 24
    },
    slug: {
        desc: "Pretty url, created with blog title.",
        type: String,
        required: true,
        unique: true
    }
})

blogSchema.pre("validate", function(next) {
    if( this.title ) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        })
    }

    next();
})

module.exports = mongoose.model("Blog", blogSchema);