const mongoose = require(`mongoose`);

const inventorySchema = new mongoose.Schema({
    productName: { type: String, required: true},
    serialNumber: { type: String, required: true, unique: true },
    category: { type: String, required: true},
    purchasePrice: { type: Number, required: true},
    sellingPrice: { type: Number, required: true},
    expDate: { type: String, required: true},
    quantity: { type: Number, required: true},
});

module.exports = mongoose.model("Inventory",inventorySchema);