const multer = require("multer");

const path = require("path");

const imageconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "..", "/uploads/company"));
  },
  filename: (req, file, callback) => {
    //!var ext = file.originalname.substring(file.originalname.indexOf(" "));
    callback(null, `image_${Date.now()}.${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only image is allowed"));
  }
};
const companyUpload = multer({
  storage: imageconfig,
  fileFilter: isImage,
});

module.exports = {
  companyUpload,
};