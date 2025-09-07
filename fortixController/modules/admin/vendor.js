const mongoose = require(`mongoose`);

const vendorSchema = new mongoose.Schema({
    Name: {type: String, required: true},
    Phone: {type: Number, required: true},
    Email: {type: String, required: true},
    Address: {type: String, required: true},
    Gst_Number: {type: String, required: true},
});

module.exports = mongoose.model("Vendor",vendorSchema);