const { Error } = require("mongoose");
const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cd) => {
  const ext = path.extname(file.originalname).toLowerCase();
  
  const allowed = [".png", ".jpg", ".jpeg", ".webp", ".svg"];
  if (!allowed.includes(ext)) {
    return cd(
      new Error("only images allowed (.png, .jpg, .jpeg, .webp, .svg)"),
      false
    );
  }
  cd(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads");
  },
  filename: (req, file, cd) => {
    
    cd(null, `${Date.now()}_${file.originalname.replace(/\s+/g, "_")}`);
  },
});

const MP = 1024 * 1024;

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * MP },
});

module.exports = { upload };
