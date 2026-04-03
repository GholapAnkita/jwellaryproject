const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { readJSON, writeJSON, sendEmail, USERS_FILE, ORDERS_FILE, PRODUCTS_FILE, ENQUIRIES_FILE } = require('./utils');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

// Temporary storage for OTPs (in memory)
const otpStore = {}; // { email: otp }

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// Login
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    const users = readJSON(USERS_FILE);
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true, user: { username: user.username, email: user.email } });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

// Forgot Password - Send OTP
app.post('/api/auth/forgot-password', async (req, res) => {
    const { email } = req.body;
    const users = readJSON(USERS_FILE);
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    // Send Email
    const sent = await sendEmail(email, "Password Reset OTP", `Your OTP for password reset is: ${otp}`);

    if (sent) {
        res.json({ success: true, message: "OTP sent to your email" });
    } else {
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
});

// Reset Password - Verify OTP and Update Password
app.post('/api/auth/reset-password', (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (otpStore[email] !== otp) {
        return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const users = readJSON(USERS_FILE);
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        writeJSON(USERS_FILE, users);
        delete otpStore[email]; // Clear OTP
        res.json({ success: true, message: "Password updated successfully" });
    } else {
        res.status(404).json({ success: false, message: "User not found" });
    }
});


// ============================================
// ORDER MANAGEMENT ROUTES
// ============================================

// Get All Orders
app.get('/api/orders', (req, res) => {
    const orders = readJSON(ORDERS_FILE);
    res.json(orders);
});

// Place New Order
app.post('/api/orders', (req, res) => {
    const orders = readJSON(ORDERS_FILE);
    const newOrder = {
        id: Date.now(),
        ...req.body,
        status: 'Pending',
        date: new Date().toISOString()
    };
    orders.push(newOrder);
    writeJSON(ORDERS_FILE, orders);
    res.json({ success: true, order: newOrder });
});


// ============================================
// ENQUIRY ROUTES
// ============================================

// Submit Enquiry
app.post('/api/contact', (req, res) => {
    const enquiries = readJSON(ENQUIRIES_FILE);
    const newEnquiry = {
        id: Date.now(),
        ...req.body,
        date: new Date().toISOString()
    };
    enquiries.push(newEnquiry);
    writeJSON(ENQUIRIES_FILE, enquiries);
    res.json({ success: true, message: "Enquiry submitted successfully" });
});

// Get All Enquiries (Admin)
app.get('/api/enquiries', (req, res) => {
    const enquiries = readJSON(ENQUIRIES_FILE);
    res.json(enquiries);
});


// ============================================
// PRODUCT ROUTES
// ============================================

// GET products
app.get('/api/products', (req, res) => {
    const products = readJSON(PRODUCTS_FILE);
    res.json(products);
});

// POST product
app.post('/api/products', upload.single('image'), (req, res) => {
    try {
        const products = readJSON(PRODUCTS_FILE);
        const newProduct = {
            id: Date.now(),
            name: req.body.name,
            price: Number(req.body.price),
            category: req.body.category,
            image: req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : req.body.image
        };
        products.push(newProduct);
        writeJSON(PRODUCTS_FILE, products);
        res.json(newProduct);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
    const products = readJSON(PRODUCTS_FILE);
    const id = Number(req.params.id);
    const filtered = products.filter(p => p.id !== id);
    writeJSON(PRODUCTS_FILE, filtered);
    res.json({ success: true });
});

// UPDATE product
app.put('/api/products/:id', upload.single('image'), (req, res) => {
    try {
        const products = readJSON(PRODUCTS_FILE);
        const id = Number(req.params.id);
        const index = products.findIndex(p => p.id === id);

        if (index !== -1) {
            const updatedProduct = {
                ...products[index],
                name: req.body.name,
                price: Number(req.body.price),
                category: req.body.category,
            };

            if (req.file) {
                updatedProduct.image = `http://localhost:${PORT}/uploads/${req.file.filename}`;
            } else if (req.body.image) {
                updatedProduct.image = req.body.image;
            }

            products[index] = updatedProduct;
            writeJSON(PRODUCTS_FILE, products);
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
