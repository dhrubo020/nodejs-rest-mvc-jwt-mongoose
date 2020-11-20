const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate')

const contactController = require('../controllers/contactController')
// get
router.get('/' , contactController.getAllContactController)

// post
router.post('/' , authenticate, contactController.postNewContactController)

// get single contact
router.get('/:id' , contactController.getSingleContactController)

// update
router.put('/:id' , authenticate, contactController.editSingleContactController)

// delete
router.delete('/:id' , authenticate, contactController.deleteSingleContactController)

module.exports = router