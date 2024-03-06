const express = require('express');
const router = express.Router();
const multer = require('multer')
const contentController = require('../controllers/webController');

///multer storage configuration 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  }
});

// Error handling middleware
function handleMulterErrors(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size exceeds the limit (2MB)' });
    }
  }
  next(err);
}



router.post('/content', upload.single('image'), contentController.createContent);

router.get('/content', contentController.getAllContent);

router.put('/content/:id', upload.single('image'), contentController.updateContent);



router.delete('/content/:id', contentController.deleteContent);


router.use(handleMulterErrors)
module.exports = router;
