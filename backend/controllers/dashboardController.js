const axios = require("axios");
const API_BASE_URL = process.env.EXTERNAL_API_BASE_URL;

// 1️⃣ GET DASHBOARD DATA
const getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch business details from External API
        let business = null;
        try {
            const businessResponse = await axios.get(`${API_BASE_URL}/getwebsitebusiness/${userId}`);
            business = businessResponse.data;
        } catch (bErr) {
            console.warn("No business found for dashboard", bErr.message);
        }

        // Fetch user data to ensure we have latest info
        const usersResponse = await axios.get(`${API_BASE_URL}/getallwebsiteusers`);
        const apiUser = usersResponse.data.find(u => u.id === userId);

        // Formulate a response similar to what the frontend expects
        res.json({
            success: true,
            data: {
                user: apiUser,
                business: business,
                // These are currently placeholders as there's no API for them yet
                subscriptions: [],
                payments: [],
                notifications: []
            }
        });
    } catch (error) {
        console.error("Dashboard error:", error.response?.data || error.message);
        res.status(500).json({ success: false, message: "Error fetching dashboard data" });
    }
};

// 2️⃣ UPDATE PROFILE PICTURE
const updateProfilePic = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        // In a real scenario, we might want to upload to a bucket then send URL to API
        // For now, we'll store locally and update the external user record with the local URL
        const imageUrl = `/uploads/${req.file.filename}`;

        // Fetch user first to get other details required for update
        const usersResponse = await axios.get(`${API_BASE_URL}/getallwebsiteusers`);
        const apiUser = usersResponse.data.find(u => u.id === userId);

        if (!apiUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update External API website user
        const updatePayload = {
            Id: userId,
            FirstName: apiUser.firstName,
            LastName: apiUser.lastName,
            Phone: apiUser.phone,
            Status: apiUser.status,
            ProfilePic: null, // Skipping binary blob for now as we use URLs
            UniqueCode: apiUser.uniqueCode
        };

        // Note: The API might expect profilePic as binary. 
        // If we only have a URL, we might need a different fields or just store the URL in a string field if available.
        // Assuming we keep the local storage for profile pics for now.

        await axios.put(`${API_BASE_URL}/updatewebsiteuser`, updatePayload);

        res.json({ success: true, profilePic: imageUrl });
    } catch (error) {
        console.error("Profile pic update error:", error.response?.data || error.message);
        res.status(500).json({ success: false, message: "Error updating profile picture" });
    }
};

module.exports = {
    getDashboardData,
    updateProfilePic
};
