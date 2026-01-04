const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/plastiwood';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Schemas
const inventorySchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  hsn: String,
  size: String,
  colour: String,
  unit: String,
  quantity: Number,
  minStock: Number,
  price: Number,
  gst: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const billSchema = new mongoose.Schema({
  id: Number,
  customer: {
    name: String,
    phone: String,
    gst: String,
    address: String,
    state: String
  },
  items: Array,
  subtotal: Number,
  gstBreakdown: Object,
  totalGST: Number,
  total: Number,
  paymentStatus: String,
  paymentTracking: {
    totalAmount: Number,
    amountPaid: Number,
    amountPending: Number,
    payments: Array
  },
  createdAt: { type: Date, default: Date.now }
});

const purchaseSchema = new mongoose.Schema({
  id: Number,
  supplier: {
    name: String,
    phone: String,
    gst: String
  },
  invoiceNo: String,
  purchaseDate: Date,
  items: Array,
  subtotal: Number,
  totalGST: Number,
  total: Number,
  paymentStatus: String,
  paymentTracking: {
    totalAmount: Number,
    amountPaid: Number,
    amountPending: Number,
    payments: Array
  },
  createdAt: { type: Date, default: Date.now }
});

const customerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  phone: String,
  gst: String,
  address: String,
  state: String,
  createdAt: { type: Date, default: Date.now },
  lastBillDate: Date
});

const supplierSchema = new mongoose.Schema({
  id: Number,
  name: String,
  phone: String,
  gst: String,
  createdAt: { type: Date, default: Date.now }
});

const counterSchema = new mongoose.Schema({
  name: String,
  value: Number
});

// Models
const Inventory = mongoose.model('Inventory', inventorySchema);
const Bill = mongoose.model('Bill', billSchema);
const Purchase = mongoose.model('Purchase', purchaseSchema);
const Customer = mongoose.model('Customer', customerSchema);
const Supplier = mongoose.model('Supplier', supplierSchema);
const Counter = mongoose.model('Counter', counterSchema);

// Helper function to get next ID
async function getNextId(counterName) {
  const counter = await Counter.findOneAndUpdate(
    { name: counterName },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return counter.value;
}

// API Routes

// Inventory Routes
app.get('/api/inventory', async (req, res) => {
  try {
    const inventory = await Inventory.find().sort({ id: 1 });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/inventory', async (req, res) => {
  try {
    const id = await getNextId('inventory');
    const item = new Inventory({ ...req.body, id });
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/inventory/:id', async (req, res) => {
  try {
    const item = await Inventory.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/inventory/:id', async (req, res) => {
  try {
    await Inventory.findOneAndDelete({ id: parseInt(req.params.id) });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bills Routes
app.get('/api/bills', async (req, res) => {
  try {
    const bills = await Bill.find().sort({ id: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/bills', async (req, res) => {
  try {
    const id = await getNextId('bills');
    const bill = new Bill({ ...req.body, id });
    await bill.save();
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/bills/:id', async (req, res) => {
  try {
    const bill = await Bill.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true }
    );
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/bills/:id', async (req, res) => {
  try {
    await Bill.findOneAndDelete({ id: parseInt(req.params.id) });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Purchases Routes
app.get('/api/purchases', async (req, res) => {
  try {
    const purchases = await Purchase.find().sort({ id: -1 });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/purchases', async (req, res) => {
  try {
    const id = await getNextId('purchases');
    const purchase = new Purchase({ ...req.body, id });
    await purchase.save();
    res.json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/purchases/:id', async (req, res) => {
  try {
    const purchase = await Purchase.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true }
    );
    res.json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/purchases/:id', async (req, res) => {
  try {
    await Purchase.findOneAndDelete({ id: parseInt(req.params.id) });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Customers Routes
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ id: 1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/customers', async (req, res) => {
  try {
    const id = await getNextId('customers');
    const customer = new Customer({ ...req.body, id });
    await customer.save();
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true }
    );
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Suppliers Routes
app.get('/api/suppliers', async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ id: 1 });
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/suppliers', async (req, res) => {
  try {
    const id = await getNextId('suppliers');
    const supplier = new Supplier({ ...req.body, id });
    await supplier.save();
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/suppliers/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true }
    );
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize sample data
app.post('/api/initialize', async (req, res) => {
  try {
    const inventoryCount = await Inventory.countDocuments();
    if (inventoryCount === 0) {
      const sampleInventory = [
        { id: 1, name: 'Steel Rebar', description: 'TMT Steel Rebar', hsn: '72142000', size: '12mm', colour: 'Silver', unit: 'kg', quantity: 1000, minStock: 500, price: 65.00, gst: 18 },
        { id: 2, name: 'Portland Cement', description: 'OPC 53 Grade Cement', hsn: '25232900', size: '50kg', colour: 'Grey', unit: 'bag', quantity: 500, minStock: 200, price: 350.00, gst: 28 },
        { id: 3, name: 'Plywood', description: 'Commercial Plywood', hsn: '44121300', size: '18mm', colour: 'Brown', unit: 'pcs', quantity: 100, minStock: 50, price: 1800.00, gst: 18 },
        { id: 4, name: 'Concrete Mix', description: 'Ready Mix Concrete', hsn: '38244090', size: 'M25', colour: 'Grey', unit: 'm3', quantity: 50, minStock: 20, price: 4500.00, gst: 18 },
        { id: 5, name: 'Plastiwood Deck Board', description: 'Premium composite deck board', hsn: '39259000', size: '6ft', colour: 'Brown', unit: 'pcs', quantity: 150, minStock: 50, price: 2500.00, gst: 18 }
      ];
      await Inventory.insertMany(sampleInventory);
      await Counter.findOneAndUpdate({ name: 'inventory' }, { value: 6 }, { upsert: true });
    }
    res.json({ success: true, message: 'Database initialized' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Plastiwood Inventory System running on http://localhost:${PORT}`);
  console.log(`📊 Database: ${MONGODB_URI.includes('mongodb+srv') ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB'}`);
});
