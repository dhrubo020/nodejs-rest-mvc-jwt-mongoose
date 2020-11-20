const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        unique: true
        // validate: {
        //     validator: (v) => {
        //         return valid.isEmail(v)
        //     }
        // }
    },
    password:{
        type:String,
        minlength: 4
    }
});
const UserModel = mongoose.model('Coll_Users', userSchema); // coll name in db = Coll_Contact
module.exports = UserModel