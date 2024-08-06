//related to uploading images
import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

//define storage location
const storage = multer.diskStorage({
  destination(req, file, cb) {
    //goes to uploads folder in root
    cb(null, 'uploads/'); //null pertains to error...null since no error
  },
  filename(req, file, cb) {
    cb(
      null,//for error
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    ); // file.fieldname is 'image' based on call below
  },
});

//check for appropriate filetypes
function fileFilter(req, file, cb) {

  //specify filetypes & mimetypes
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  //test for the name
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  //
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

//actual upload
const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
  //passing uploadSingleImage as a middleware function
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });
});

export default router;
