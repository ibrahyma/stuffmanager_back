const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const controller = require('../controllers/products');

router.get('/', controller.getAll);
router.post('/', auth, controller.add);
router.get('/:id', controller.getOne);
router.put('/:id', auth, controller.set);
router.delete('/:id', auth, controller.delete);

module.exports = router;