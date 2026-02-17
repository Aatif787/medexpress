import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    prescriptionUrl: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        default: '',
    },
    deliveryTime: {
        type: String,
        enum: ['morning', 'afternoon', 'evening', 'anytime'],
        default: 'anytime',
    },
    status: {
        type: String,
        enum: ['Received', 'Processing', 'Purchased', 'Out for Delivery', 'Delivered'],
        default: 'Received',
    },
    subscription: {
        type: Boolean,
        default: false,
    },
    medicineCost: {
        type: Number,
        default: 0,
    },
    deliveryFee: {
        type: Number,
        default: 99,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'cod'],
        default: 'pending',
    },
    paymentMethod: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});

// Index for fast lookups
OrderSchema.index({ mobile: 1 });
OrderSchema.index({ orderId: 1 });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
