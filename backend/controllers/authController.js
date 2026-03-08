const axios = require("axios");
const jwt = require("jsonwebtoken");
const { sendWelcomeEmail } = require("../services/emailService");

const API_BASE_URL = process.env.EXTERNAL_API_BASE_URL;

// 1️⃣ REGISTER USER
const register = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            password,
            phone,
            business_name,
            business_type,
            business_address,
            city,
            province,
            zip_code,
        } = req.body;

        // Validate inputs
        if (!email || !password || !first_name || !business_name) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // 1. Add User to External API
        const userPayload = {
            FirstName: first_name,
            LastName: last_name,
            Email: email,
            Password: password,
            Phone: phone || "",
            Status: "Active",
            ProfilePic: null,
            UniqueCode: null
        };

        console.log(`[Auth] Adding website user: ${email}`);
        const userResponse = await axios.post(`${API_BASE_URL}/addwebsiteuser`, userPayload);
        console.log(`[Auth] User added, ID: ${userResponse.data.userId}`);
        const userId = userResponse.data.userId;


        // 2. Add Business to External API
        const businessPayload = {
            UserId: userId,
            Name: business_name,
            Type: business_type || "",
            Address: business_address || "",
            City: city || "",
            Province: province || "",
            Contact: phone || "",
            Email: email,
            Website: "",
            Currency: "LKR",
            Vat: ""
        };

        console.log(`[Auth] Adding business for UserID: ${userId}`);
        await axios.post(`${API_BASE_URL}/addwebsitebusiness`, businessPayload);
        console.log(`[Auth] Business added successfully`);


        // Fetch user data for the response (simulating prisma findUnique)
        const user = {
            id: userId,
            firstName: first_name,
            lastName: last_name,
            email: email,
            phone: phone,
            role: "user", // Default role
            business: businessPayload
        };

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Send Welcome Email (non-blocking)
        sendWelcomeEmail({
            to: email,
            firstName: first_name,
            businessName: business_name
        }).catch(err => console.error("Welcome email failed:", err.message));

        res.status(201).json({
            success: true,
            message: "User and business registered successfully",
            token,
            user
        });

    } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || "Server error during registration";
        res.status(status).json({ success: false, message });
    }
};

// 2️⃣ LOGIN USER
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide email and password" });
        }

        console.log(`[Auth] Attempting login for: ${email}`);
        const loginResponse = await axios.post(`${API_BASE_URL}/loginwebsiteuser`, { Email: email, Password: password });
        console.log(`[Auth] Login successful for: ${email}`);
        const { user: apiUser } = loginResponse.data;


        // 2. Fetch Business details
        let business = null;
        try {
            const businessResponse = await axios.get(`${API_BASE_URL}/getwebsitebusiness/${apiUser.id}`);
            business = businessResponse.data;
        } catch (bErr) {
            console.warn("Could not fetch business for user during login", bErr.message);
        }

        const user = {
            ...apiUser,
            business
        };

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role || "user" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            success: true,
            token,
            user
        });

    } catch (error) {
        console.error(`[Auth] Login failed for ${email}:`, error.response?.data || error.message);
        const status = error.response?.status || 401;
        const message = error.response?.data?.message || "Invalid credentials";

        res.status(status).json({ success: false, message });
    }
};

// 3️⃣ GET CURRENT USER (Protected)
const getMe = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch all users and filter by ID (since no getById)
        const usersResponse = await axios.get(`${API_BASE_URL}/getallwebsiteusers`);
        const apiUser = usersResponse.data.find(u => u.id === userId);

        if (!apiUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Fetch business
        let business = null;
        try {
            const businessResponse = await axios.get(`${API_BASE_URL}/getwebsitebusiness/${userId}`);
            business = businessResponse.data;
        } catch (bErr) {
            console.warn("Could not fetch business for user in getMe", bErr.message);
        }

        const user = {
            ...apiUser,
            business
        };

        res.json({ success: true, user });
    } catch (error) {
        console.error("getMe error:", error.response?.data || error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
    register,
    login,
    getMe
};
