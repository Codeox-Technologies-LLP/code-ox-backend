const express = require('express');
const router = express.Router();
const multer = require('multer')
const contentController = require('../controllers/webController');

///multer storage configuration 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads'); // Directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Rename file with current timestamp to avoid conflicts
    }
  });

  const upload = multer({ storage: storage });


  router.post('/content', upload.single('image'), contentController.createContent);

router.get('/content', contentController.getAllContent);

router.put('/content/:id', contentController.updateContent);


router.delete('/content/:id', contentController.deleteContent);



module.exports = router;
