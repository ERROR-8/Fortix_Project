const Inventory = require(`../modules/admin/inventory`);

exports.createInventory = async(req,res) => {
    try {
        const inventory = await Inventory.create(req.body);
        res.json(inventory);
    } catch(err) {
        res.json(err);
    }
};

exports.getInventory = async(req,res) => {
    try {
        const inventory = await Inventory.find();
        res.json(inventory);
    } catch(err) {
        res.json(err);
    }
};

exports.updateInventory = async(req,res) => {
    try {
        const inventory = await Inventory.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(inventory);
    } catch(err) {
        res.json(err);
    }
};

exports.deleteInventory = async(req,res) => {
    try {
        await Inventory.findByIdAndDelete(req.params.id);
        res.json({message: "Inventory Deleted Succesfully"});
    } catch(err) {
        res.json(err);
    }
};

exports.getInventoryBySerialNumber = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ serialNumber: req.params.serialNumber });
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    res.json(inventory);
  } catch (err) {
    res.json(err);
  }
};