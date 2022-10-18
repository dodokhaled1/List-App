const express = require('express')
const router = express.Router()
const userControllers =  require('../controllers/userController')

router.get('/', userControllers.view)
router.get('/:listName', userControllers.route)
router.post('/', userControllers.addList)
router.post('/delete', userControllers.remove)

module.exports = router