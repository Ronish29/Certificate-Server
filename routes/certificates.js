const express = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + Date.now())
    }
  })
  const upload = multer({ storage: storage });
const { getAllCertificates, getSpecifiedCertificate, certificateGenerate } = require('../controllers/certiGeneration');
const router = express.Router();

router.get('/getAllCertificate',getAllCertificates)
router.get('/getCertificate/:id',getSpecifiedCertificate)
router.post('/createCertificate', upload.single('file'), certificateGenerate);


module.exports = router