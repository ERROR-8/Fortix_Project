const Inventory = require('../modules/admin/inventory');
const Vendor = require('../modules/admin/vendor');
const User = require('../modules/admin/user');
const bcrypt = require('bcryptjs');

exports.seed = async (req, res) => {
  try {
    // Clear existing (careful in production)
    await Inventory.deleteMany({});
    await Vendor.deleteMany({});

    // Create sample inventory items
    const items = await Inventory.insertMany([
      {
        productName: 'Running Shoes',
        category: 'Footwear',
        purchasePrice: 30,
        sellingPrice: 45.5,
        expDate: '2026-12-31',
        quantity: 125,
      },
      {
        productName: 'Wireless Headphones',
        category: 'Electronics',
        purchasePrice: 60,
        sellingPrice: 120,
        expDate: '2027-06-30',
        quantity: 50,
      },
    ]);

    // Create sample vendors
    const vendors = await Vendor.insertMany([
      {
        Name: 'SportsGear Inc.',
        Phone: 1234567890,
        Email: 'contact@sportsgear.com',
        Address: '123 Sports St',
        Gst_Number: 'GST12345',
      },
      {
        Name: 'TechAudio Ltd.',
        Phone: 9876543210,
        Email: 'orders@techaudio.com',
        Address: '45 Tech Ave',
        Gst_Number: 'GST67890',
      },
    ]);

    // Create a test user (password: testpass)
    await User.deleteMany({});
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('testpass', salt);
    const user = await User.create({ name: 'TestUser', email: 'testuser@example.com', password: hashed });

    res.json({ message: 'Seed data created', itemsCount: items.length, vendorsCount: vendors.length, userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Seed failed', error: err.message });
  }
};
