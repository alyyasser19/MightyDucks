import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    Email: { 
        type: String,
        unique: true,
        required: true
    },
    Username: { 
        type: String,
        unique: true,
        required: true
    },
    homeAddress: {
        type: String,
        required: true
    },
    countryCode:{
        type:String,
        length: 3,
        required: true
    },
    passportNumber: { 
        type: String,
        unique: true,
        required: true
    },
    Password:{
        type: String, //encrypted
        required: true
    },
    Type:{
        type: String,
        length: 1,
        enum : ['N','A'],
        default: 'N',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },    
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type:Date,
        required: true
    },
    flights: {
        type:Array,
        default: [],
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    phoneNumber: {
        type: Array,
        required: true
    }
});

var user = mongoose.model('user', userSchema);

export default user;