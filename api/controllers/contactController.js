const ContactModel = require('../../schema/contactSchema')

const getAllContactController = (req, res, next) => {
    ContactModel.find()
        .then(data => {
            res.status(200).json({
                message: 'Success',
                contacts: data
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

const postNewContactController = (req, res, next) => {
    console.log(req.body);
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const newContact = new ContactModel({
        name: name,
        phone: phone,
        email: email
    })
    newContact.save()
        .then(data => {
            res.status(200).json({
                message: 'New Contact Added',
                contact: data
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

const getSingleContactController = (req, res, next) => {

    let id = req.params.id
    console.log(id)
    // next();

    ContactModel.findById(id)
        .then(data => {
            res.status(200).json({
                message: 'Success',
                contact: data
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

const deleteSingleContactController = (req, res, next) => {

    let id = req.params.id
    console.log(id)
    // next();

    ContactModel.findByIdAndRemove(id)
        .then(result => {
            res.status(200).json({
                message: 'Contact Deleted',
                result
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


const editSingleContactController = (req, res, next) => {

    let id = req.params.id
    console.log(id)
    // next();

    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const newContact = { name, phone, email }

    ContactModel.findByIdAndUpdate(id, { $set: newContact })
        .then(result => {
            ContactModel.findById(id)
                .then(data => {
                    res.status(200).json({
                        message: 'Update Success',
                        contact: data
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        message: 'Error Occured',
                        error: err
                    })
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
    getAllContactController,
    postNewContactController,
    getSingleContactController,
    editSingleContactController,
    deleteSingleContactController
}