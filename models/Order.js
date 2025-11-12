
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  // Fulfillment status (not payment) — broadened to support new states
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'on_way', 'about_to_deliver', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
