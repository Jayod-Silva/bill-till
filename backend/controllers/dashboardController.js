const prisma = require("../config/prisma");

// 1️⃣ GET DASHBOARD DATA
const getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        // Call stored procedure to get all dashboard segments in one go
        // Note: mssql via Prisma might return an array of arrays for multiple result sets
        const result = await prisma.$queryRaw`EXEC sp_GetDashboardData @UserId = ${userId}`;

        // Formatting the multi-result set response
        // Depending on the DB driver/Prisma version, result might need parsing
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).json({ success: false, message: "Error fetching dashboard data" });
    }
};

// 2️⃣ UPDATE PROFILE PICTURE
const updateProfilePic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const imageUrl = `/uploads/${req.file.filename}`;

        await prisma.user.update({
            where: { id: req.user.id },
            data: { profilePic: imageUrl }
        });

        res.json({ success: true, profilePic: imageUrl });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating profile picture" });
    }
};

module.exports = {
    getDashboardData,
    updateProfilePic
};
