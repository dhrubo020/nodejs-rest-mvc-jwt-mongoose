const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const valid = require('validator');
mongoose.set('useCreateIndex', true);

const contactSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        minlength: 11
    },
    email: {
        type: String,
        trim: true
        // validate: {
        //     validator: (v) => {
        //         return valid.isEmail(v)
        //     }
        // }
    }
});
const ContactModel = mongoose.model('Coll_Contact', contactSchema); // coll name in db = Coll_Contact
module.exports = ContactModel