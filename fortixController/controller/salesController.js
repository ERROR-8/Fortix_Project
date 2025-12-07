const Sale = require('../modules/admin/sales');
const Inventory = require('../modules/admin/inventory');

const createSale = async (req, res) => {
  const { inventoryId, quantitySold } = req.body;

  if (!inventoryId || !quantitySold) {
    return res.status(400).json({ message: 'Inventory ID and quantity sold are required' });
  }

  try {
    const inventoryItem = await Inventory.findById(inventoryId);

    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    if (inventoryItem.quantity < quantitySold) {
      return res.status(400).json({ message: 'Not enough stock' });
    }

    inventoryItem.quantity -= quantitySold;
    await inventoryItem.save();

    const sale = new Sale({
      inventoryItem: inventoryId,
      quantitySold,
    });

    await sale.save();

    res.status(201).json({ sale, updatedInventory: inventoryItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('inventoryItem');
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createSale,
  getSales,
};
