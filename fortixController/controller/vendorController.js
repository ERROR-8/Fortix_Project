const Vendor = require("../modules/admin/vendor");

exports.createVendor = async(req,res) =>{
   try{
        const vendor = await Vendor.create(req.body);
        res.json(vendor);
   } catch(err){
    res.json(err);
   }
};

exports.getVendor = async(req,res) =>{
    try{
        const vendor = await Vendor.find();
        res.json(vendor);
    }catch(err){
        res.json(err);
    }
};

exports.updateVendor = async(req,res) =>{
    try{
        const vendor = await Vendor.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(vendor);
    }catch(err){
        res.json(err);
    }
};

exports.deleteVendor = async(req,res) =>{
    try{
        const vendor = await Vendor.findByIdAndDelete(req.params.id);
        res.json("Vendor Deleted Successfully");
    }catch(err){
        res.json(err);
    }
};