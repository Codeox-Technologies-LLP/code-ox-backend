const express = require('express');
const router = express.Router();
const contentController = require('../controllers/webController');

router.post('/content', contentController.createContent);

router.get('/content', contentController.getAllContent);

router.put('/content/:id', contentController.updateContent);


router.delete('/content/:id', contentController.deleteContent);



module.exports = router;
