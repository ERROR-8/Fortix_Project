const User = require(`../modules/admin/user`);

exports.createUser = async(req,res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch(err) {
        res.json(err);
    }
};

exports.getuser = async(req,res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch(err) {
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