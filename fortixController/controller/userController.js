const User = require(`../modules/admin/user`);
const bcrypt = require('bcryptjs');

exports.registerUser = async(req,res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch(err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.loginUser = async(req,res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                success: true,
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials', success: false });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getuser = async(req,res) => {
    try {
        const user = await User.find();
        res.json(user);
    }
    catch(err) {
        res.json(err);
    }
};

exports.updateUser = async(req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(user);
    } catch(err) {
        res.json(err);
    }
};

exports.deleteUser = async(req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({meassage: "User Deleted Succesfully"});
    } catch(err) {
        res.json(err);
    }
};