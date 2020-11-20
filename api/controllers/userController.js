const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const UserModel = require('../../schema/UserSchema')

const registerController = (req, res, next) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.json({
                error: err
            })
        }
        let newUser = new UserModel({
            email: req.body.email,
            password: hash
        })
        newUser.save()
            .then(data => {
                res.status(200).json({
                    message: 'New user created',
                    user: data
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'Error Occured',
                    error: err
                })
            })
    });
}

const loginController = (req, res, next)=>{
    let email = req.body.email
    let password = req.body.password

    UserModel.findOne({email})
    .then(user=>{
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
                if(err){
                    res.json({message:'Error occured'})
                }

                if(result){
                    let token = jwt.sign({email: user.email, id: user._id }, 'secret', { expiresIn: '1h' });
                    res.json({
                        message:'Login Success',
                        success: true,
                        token: token
                    })
                }else{
                    res.json({
                        message:'Login Failed. Password doesn\'t match',
                        success: false
                    })
                }
            });
        }else{
            res.json({
                message:'Login Failed. User not found',
                success: false
            })
        }
    })
}

const getAllUser = (req, res, next) => {
    UserModel.find()
        .then(data => {
            res.status(200).json({
                message: 'New user created',
                user: data
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error Occured',
                error: err
            })
        })
}

module.exports = {
    registerController,
    getAllUser,
    loginController
}