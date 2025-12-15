import User from "../Models/User.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "education-community-secret";

/* =========================
   GENERATE TOKEN
========================= */
const generateToken = (user) => {
    return jwt.sign({
            id: user._id,
            role: user.role,
        },
        JWT_SECRET, { expiresIn: "1d" }
    );
};

/* =========================
   REGISTER
========================= */
export const register = async(req, res) => {
    try {
        const { _id, name, email, password, role, institutionId } = req.body;

        if (!_id || !name || !email || !password || !role) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(409).json({ message: "Email already exists" });
        }

        await User.create({
            _id,
            name,
            email,
            passwordHash: password, // ✅ MATCH DB
            role,
            institutionId,
            status: "active",
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =========================
   LOGIN
========================= */
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // 🔍 FIND USER
        const user = await User.findOne({
            email,
            passwordHash: password, // ✅ FIX HERE
            status: "active",
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);

        res.status(200).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                role: user.role,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};