const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChildSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    parent_name : {
        type : String,
        required : true,
    },
    target_sale : {
        type : Number,
        required : true,
    },
    total_sale : {
        type : Number,
        required : true,
    },
});

const Child = mongoose.model('child', ChildSchema);
module.exports = Child;