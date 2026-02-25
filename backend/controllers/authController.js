const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Call Stored Procedure for atomic registration
        // Note: Parameter order must match sp_RegisterUserWithBusiness in setup.sql
        try {
            // Use $queryRaw to handle cases where we might need return values or specific execution context
            await prisma.$executeRaw`
        EXEC sp_RegisterUserWithBusiness 
          @FirstName = ${first_name}, 
          @LastName = ${last_name}, 
          @Email = ${email}, 
          @Password = ${hashedPassword}, 
          @Phone = ${phone},
          @BusinessName = ${business_name}, 
          @BusinessType = ${business_type}, 
          @BusinessAddress = ${business_address}, 
          @City = ${city}, 
          @Province = ${province}, 
          @ZipCode = ${zip_code}
      `;

            // Fetch the newly created user for the token payload
            const user = await prisma.user.findUnique({
                where: { email },
                include: { business: true }
            });

            if (!user) {
                throw new Error("User creation failed in stored procedure");
            }

            // Generate JWT (Same logic as login)
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            // Don't send password
            const { password: _, ...userWithoutPassword } = user;

            res.status(201).json({
                success: true,
                message: "User and business registered successfully",
                token,
                user: userWithoutPassword
            });
        } catch (dbError) {
            if (dbError.message.includes("Email already registered")) {
                return res.status(409).json({ success: false, message: "Email already exists" });
            }
            throw dbError;
        }

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: "Server error during registration" });
    }
};

// 2️⃣ LOGIN USER
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide email and password" });
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
            include: { business: true }
        });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Don't send password
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            success: true,
            token,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error during login" });
    }
};

// 3️⃣ GET CURRENT USER (Protected)
const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: { business: true }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { password: _, ...userWithoutPassword } = user;
        res.json({ success: true, user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
    register,
    login,
    getMe
};
