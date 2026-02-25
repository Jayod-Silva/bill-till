const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { getDashboardData, updateProfilePic } = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

router.get("/", authMiddleware, getDashboardData);
router.post("/profile-pic", authMiddleware, upload.single("profilePic"), updateProfilePic);

module.exports = router;
