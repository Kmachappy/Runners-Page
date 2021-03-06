// connect to the MongoDB with mongoose
// const mongoose = require("../config/database")
const mongoose = require('mongoose')

const Schema = mongoose.Schema


const reviewSchema = new Schema({
    review: String,
    rating: Number,
    reviewedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})

//schema
const eventsSchema = new Schema({
    name: {type: String, unique:true, required: true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    date: {type: String, required: true},
    image: {type: String, required: true},
    source: {type: String, required: true},
    signup: {type: String, required: true},
    price: {type: String, required: true},
    latlng: [],
    tags:[],
    reviews: [reviewSchema]
})

// const Event = mongoose.model("Event", eventsSchema)

//export model
module.exports = mongoose.model("Event", eventsSchema)