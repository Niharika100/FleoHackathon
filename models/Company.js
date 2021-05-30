const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChildrenSchema = new Schema({
    name : {
        type : String,
        required : [true, 'name is required'],
    },
    target_sale : {
        type : Number,
        required : [true, 'name is required'],
    },
    total_sale : {
        type : Number,
        required : [true, 'name is required'],
    },
    children : {
        type : Array,
    },
});

const CompanySchema = new Schema({
    name : {
        type : String,
        required : [true, 'name is required'],
    },
    target_sale : {
        type : Number,
        required : [true, 'name is required'],
    },
    total_sale : {
        type : Number,
        required : [true, 'name is required'],
    },
    children : ChildrenSchema
});

const Company = mongoose.model('company', CompanySchema);
module.exports = Company;