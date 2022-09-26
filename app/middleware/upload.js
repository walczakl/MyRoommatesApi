import { extension } from "mime-types";
import multer, { diskStorage } from "multer";

const storage = diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now() + "." + extension(file.mimetype));
  },
});

const uploadReceipt = multer({ storage: storage }).array("receipt");

export default uploadReceipt;
