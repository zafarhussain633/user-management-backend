import multer from "multer";
import ErrorResponse from "../util/errorResponse.js";
import path from "path";
import fs from "fs";
const maxFileUploadSize = process.env.MAX_UPLOAD_SIZE;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileDestination = process.env.FILE_UPLOAD_PATH;

    cb(null, fileDestination); // the file will be automatically uploaded in uopload folder
  },
  filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let { ext } = path.parse(file.originalname);
    const fname = `${Date.now()}${ext}`;
    cb(null, fname);
  },
});

function fileFilter(req, file, cb) {
  const fileSize = req.headers["content-length"];

  if (fileSize > maxImageSize()) {
    return cb(
      new ErrorResponse(
        `file size too large max limit is${maxFileUploadSize}MB`,
        400
      )
    );
  }

  // Check file type based on field name
  if (
    file.fieldname === "documents" &&
    !file.mimetype.startsWith("application/pdf")
  ) {
    return cb(
      new ErrorResponse("Please upload only PDF files for documents", 400)
    );
  }

  if (
    file.fieldname === "profile_image" &&
    !file.mimetype.startsWith("image")
  ) {
    return cb(
      new ErrorResponse(
        "Please upload only image files (jpg or png) for 'image'",
        400
      )
    );
  }

  cb(null, true);
}

const maxImageSize = () => {
  let limit = Number(maxFileUploadSize?.replace("MB", ""));
  const max = limit * 1000000;
  return max;
};

export const upload = multer({
  storage: storage,
  limits: {
    //unable it if you dont want coustom message from filFilter fx
    fileSize: maxImageSize(),
  },
  fileFilter: fileFilter,
});


