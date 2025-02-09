const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+path.extname(file.originalname));
  }
});

const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
  if (allowedFileTypes.includes(file.mimetype))
    cb(null, true);
  else
    cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Invalid file type. Only .jpeg, .jpg, .png are allowed'));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 },
});

module.exports = upload;