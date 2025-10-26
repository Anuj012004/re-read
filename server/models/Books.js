const mongoose = require('mongoose')

const BooksSchema = new mongoose.Schema({
    //Basic details
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    cloudinaryId: {
        type: String,
        required: true,
    },
        // Classification
    class: {
      type: String,
      trim: true,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    publishedYear: {
      type: Number,
      min: 0,
      max: 3000,
    },
    organization: {
        type: String,
        required: true,
        trim: true,
    },
    //seller
   seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
   },
     // Commerce
    price: {
      type: Number, 
      required: true,
      min: 0,
    },
    condition: {
      type: String,
      enum: ['new', 'like-new', 'very-good', 'good', 'acceptable'],
      default: 'good',
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('Book',BooksSchema)