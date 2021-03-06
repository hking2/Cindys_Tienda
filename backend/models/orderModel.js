import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'CT_User'
  },
  orderItems: [{
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    image1: { type: String, required: true },
    price: { type: Number, required: true },
    shipping: { type: Number, required: true },
    selectedOption: { type: String, required: false },
    selectedFrame: { type: String, required: false },
    product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'CT_Product' }
  }],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    required: false,
    default: false
  },
  deliveredAt: {
    type: Date
  }
}, {
  timestamps: true
})

const CT_Order = mongoose.model('CT_Order', orderSchema);

export default CT_Order