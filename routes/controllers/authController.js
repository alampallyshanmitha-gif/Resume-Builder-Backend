let users = []; // temporary storage

// SIGNUP
exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    const userExists = users.find(u => u.email === email);

    if (userExists) {
        return res.json({ success: false, message: "User already exists!" });
    }

    users.push({ name, email, password });

    res.json({
        success: true,
        message: "Signup successful 🎉"
    });
};

// LOGIN
exports.login = (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.json({ success: false, message: "Invalid credentials ❌" });
    }

    res.json({
        success: true,
        message: "Login successful ✅",
        user: { name: user.name, email: user.email }
    });
};