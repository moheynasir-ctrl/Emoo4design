const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  customDesignId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomDesign' },
  quantity: { type: Number, default: 1 },
  price: { type: Number }
});

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [OrderItemSchema],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  shippingAddress: { type: String },
  paymentMethod: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);