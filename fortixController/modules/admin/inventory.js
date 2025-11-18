const mongoose = require(`mongoose`);

const inventorySchema = new mongoose.Schema({
    sku: { type: String, required: true, unique: true },
    productName: { type: String, required: true},
    category: { type: String, required: true},
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    purchasePrice: { type: Number, required: true},
    sellingPrice: { type: Number, required: true},
    expDate: { type: Date, required: true},
    quantity: { type: Number, required: true},
    status: { type: String, enum: ['in-stock', 'out-of-stock', 'low-stock'], default: 'in-stock' }
}, {
    timestamps: true
});

module.exports = mongoose.model("Inventory",inventorySchema);