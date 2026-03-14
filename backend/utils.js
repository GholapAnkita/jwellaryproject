const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

// Initial check for files
[USERS_FILE, ORDERS_FILE, PRODUCTS_FILE, ENQUIRIES_FILE].forEach(file => {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, '[]', 'utf-8');
    }
});

// Generic Read Function
const readJSON = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading file ${filePath}:`, err);
        return [];
    }
};

// Generic Write Function
const writeJSON = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error(`Error writing file ${filePath}:`, err);
        return false;
    }
};

// Nodemailer Transporter
// NOTE: For real emails, you need a valid Gmail App Password.
// For now, we will log the OTP to the console if sending fails or as a backup.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ankitagholap100@gamil.com',
        pass: 'YOUR_GMAIL_APP_PASSWORD' // User needs to replace this
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: 'ankitagholap100@gamil.com',
            to: to,
            subject: subject,
            text: text
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        console.log('---------------------------------------------------');
        console.log('MOCK EMAIL (Since sending failed):');
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body: ${text}`);
        console.log('---------------------------------------------------');
        // Return true anyway so the UI flow works for the demo
        return true;
    }
};

module.exports = {
    readJSON,
    writeJSON,
    sendEmail,
    USERS_FILE,
    ORDERS_FILE,
    PRODUCTS_FILE,
    ENQUIRIES_FILE
};
