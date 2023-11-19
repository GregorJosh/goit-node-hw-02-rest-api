import multer, { diskStorage } from "multer";

import { publicDir } from "./paths.js";

const storage = diskStorage({
  destination: publicDir,
  filename: (request, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

export const uploadMW = multer({
  storage,
});